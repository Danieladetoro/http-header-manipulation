console.log(">>> Starting server script...");
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const naiveCache = new Map();

app.get('/', (req, res) => {
  res.send('VULNERABLE DEMO running. Try /data and the attacker page.');
});

app.get('/login', (req, res) => {
  res.cookie('session', 'user-session-123', { httpOnly: true });
  res.send('Logged in (demo cookie set).');
});

app.options('/data', (req, res) => {
  const origin = req.get('Origin') || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Demo-Inject');
  res.status(204).end();
});

app.get('/data', (req, res) => {
  const origin = req.get('Origin') || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  const reflected = req.get('X-Demo-Inject') || 'normal-content';
  const body = `SENSITIVE DATA for demo | REFLECTED: ${reflected}`;

  const key = req.path;
  if (naiveCache.has(key)) {
    const cached = naiveCache.get(key);
    Object.entries(cached.headers).forEach(([k, v]) => res.setHeader(k, v));
    return res.send(cached.body + ' (from cache)');
  } else {
    const headers = { 'Cache-Control': 'public, max-age=3600' };
    naiveCache.set(key, { body, headers });
    Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
    return res.send(body + ' (fresh, cached)');
  }
});

app.get('/_clear_cache', (req, res) => {
  naiveCache.clear();
  res.send('Naive cache cleared.');
});

app.listen(3000, () =>
  console.log('VULNERABLE server running on http://localhost:3000')
);
