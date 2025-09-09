const fetch = require('node-fetch');

(async () => {
  try {
    const res = await fetch('http://localhost:3000/data', {
      headers: { Origin: 'http://localhost:4000' }
    });
    console.log('Status:', res.status);
    console.log('Headers:', res.headers.get('access-control-allow-origin'));
    const text = await res.text();
    console.log('Body:', text);
  } catch (err) {
    console.error('Fetch failed:', err);
  }
})();
