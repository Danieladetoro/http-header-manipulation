const express = require('express');
const cookieParser = require('cookie-parser');

const ALLOWED_ORIGINS = []; // strict allowlist

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('FIXED DEMO running. Try /data.');
});

app.get('/login', (req, res) => {
  res.cookie('session', 'user-session-123', { httpOnly: true, sameSite: 'Lax' });
  res.send('Logged in (secure cookie set).');
});

app.options('/data', (req, res) => {
  const origin = req.get('Origin') || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'false');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  res.status(204).end();
});

app.get('/data', (req, res) => {
  const origin = req.get('Origin') || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'false');
  }

  const body = `SENSITIVE DATA for demo | REFLECTED: normal-content`;

  res.setHeader('Cache-Control', 'private, no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.send(body);
});

app.listen(3001, () =>
  console.log('FIXED server running on http://localhost:3001')
);
