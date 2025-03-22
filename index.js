const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

const callLogs = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home route
app.get('/', (req, res) => {
    res.send('Medication Reminder System is Running 🚀');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.post('/call', async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        const call = await client.calls.create({
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER,
            url: 'https://medication-reminder-production.up.railway.app/voice',
        });

        console.log(`📞 Call initiated: SID = ${call.sid}`);
        res.status(200).json({ message: 'Call initiated', sid: call.sid });

    } catch (error) {
        console.error('❌ Error making call:', error.message);
        res.status(500).json({ error: 'Failed to make the call' });
    }
});

app.post('/voice', (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();

    twiml.say(
        {
            voice: 'alice', // You can also try 'man' or 'woman'
            language: 'en-US',
        },
        'Hello, this is a reminder from your healthcare provider to confirm your medications for the day. Please confirm if you have taken your Aspirin, Cardivol, and Metformin today.'
    );

    // Record patient's voice after message
    twiml.record({
        timeout: 5,
        transcribe: true, // Optional if not using STT API yourself
        transcribeCallback: '/recording',
        maxLength: 30,
    });

    res.type('text/xml');
    res.send(twiml.toString());
});

app.post('/recording', (req, res) => {
    const callSid = req.body.CallSid;
    const transcriptionText = req.body.TranscriptionText || 'N/A';
    const callStatus = req.body.CallStatus;
    const recordingUrl = req.body.RecordingUrl || 'Not available';

    const logEntry = {
        sid: callSid,
        status: callStatus,
        transcription: transcriptionText,
        recordingUrl,
        timestamp: new Date().toISOString(),
    };

    callLogs.push(logEntry);

    console.log('📝 Patient Interaction Received:');
    console.log(`📞 Call SID: ${callSid}`);
    console.log(`📄 Transcription: ${transcriptionText}`);
    console.log(`📶 Status: ${callStatus}`);
    console.log(`🔗 Recording URL: ${recordingUrl}`);

    res.status(200).send('OK');
});



app.get('/logs', (req, res) => {
    res.json({ logs: callLogs });
});



