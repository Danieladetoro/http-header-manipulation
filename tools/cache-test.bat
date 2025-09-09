@echo off
echo 1) Poisoning cache with X-Demo-Inject...
curl -i -H "Origin: http://localhost:4000" -H "X-Demo-Inject: MALICIOUS" "http://localhost:3000/data"

echo.
echo 2) Normal request (no special header) -> still shows poisoned cached content:
curl -i -H "Origin: http://localhost:4000" "http://localhost:3000/data"

pause
