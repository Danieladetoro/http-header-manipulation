 Project Notes – HTTP Header Manipulation

 Project Goal
To demonstrate how HTTP headers can be abused by attackers, and how to secure them.

---

Vulnerabilities Shown

 1 Header Injection
Endpoint: `/data`
Header used: `X-Demo-Inject: hacked-by-attacker`
Effect: Server reflects the injected value in the response.
Impact: Attackers can inject malicious scripts or payloads.

---

2 CORS Misconfiguration
Endpoint: `/data`
Header used: `Origin: http://evil.com`
Effect: Server responds with `Access-Control-Allow-Origin: http://evil.com`
Impact: Any attacker site can steal data from logged-in users.

---

3 Cache Poisoning
Endpoint: `/data`
Header used: `X-Demo-Inject: poisoned-cache`
Effect: Response gets cached. Even without the header, users see the poisoned data.
Impact: One attacker can poison the response for everyone.

---

 Fixes Applied (in `fixed/`)
1 CORS – Restrict to trusted domains only.
2 Cache – Disable caching for sensitive endpoints.
3 Header Injection – Validate and sanitize headers before reflecting them.

---

 Key Takeaways
 HTTP headers are powerful but dangerous if not properly validated.
 Small mistakes (like reflecting headers or caching without validation) can lead to major attacks.
 Always apply least privilege and secure defaults in server configuration.

---

 How to Run
1 Navigate to `vulnerable/`
2 Run `npm install`
3 Start with `node index.js`
4 Use ModHeader or Postman to test headers.

---

 Author
Adetoro Daniel Adeoluwa  
Final Year Project – SQI College of ICT  
