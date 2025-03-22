const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Mocking the actual app setup
const app = express();
app.use(bodyParser.json());

app.post('/call', (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }
    res.status(200).json({ message: 'Call initiated', sid: 'dummy-sid' });
});

app.get('/logs', (req, res) => {
    res.status(200).json({ logs: [] });
});

describe('Medication Reminder API', () => {
    test('POST /call without phoneNumber should return 400', async () => {
        const res = await request(app).post('/call').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('POST /call with phoneNumber should return 200', async () => {
        const res = await request(app).post('/call').send({ phoneNumber: '+1234567890' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Call initiated');
    });

    test('GET /logs should return 200 and an array', async () => {
        const res = await request(app).get('/logs');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('logs');
        expect(Array.isArray(res.body.logs)).toBe(true);
    });
});
