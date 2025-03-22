# Medication Reminder System – Node.js + Twilio

This is a simple voice-based medication reminder system built as part of a take-home assignment for DTxPlus. It uses Twilio to call patients, play a medication reminder, record their response, and log the interaction.

---

## Features

- Trigger voice calls using a REST API
- Remind patients via Text-to-Speech
- Record and transcribe their responses
- Log call SID, status, transcription, timestamp, and recording URL
- View logs using a GET API
- Live deployed using Railway

---

## How It Works

1. You send a `POST /call` request with the patient’s phone number.
2. The app uses Twilio to make a voice call.
3. Twilio plays a reminder message.
4. It records the patient’s spoken response.
5. The response is transcribed and logged.
6. You can view logs at `GET /logs`.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/mohdadnan-raza/medication-reminder.git
cd medication-reminder


### 2. Install Dependencies

npm install


### 3. Create a .env File

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1your_twilio_number


### 3. Start the App
node index.js


API Endpoints
POST /call
Trigger a voice call.

Request Body:
{
  "phoneNumber": "+1XXXXXXXXXX"
}


GET /logs
Returns a list of all calls with:

SID
Status
Transcription
Recording URL
Timestamp


Live Demo
Deployed here using Railway:
🔗 https://medication-reminder-production.up.railway.app


Notes
Transcription and recording handled by Twilio
Call logs stored in-memory (no DB)
Twilio trial accounts only support calling verified numbers


About
Built as part of a coding assignment for the Node.js Engineer position at DTxPlus to demonstrate skills with backend APIs, Twilio, and real-time communication.

Contact: Mohammad Adnan Raza for more info
---