@echo off
echo ========================================================
echo Launching TGSRTC Full-Stack Bus Reservation System
echo ========================================================
start "TGSRTC Backend" cmd /k "cd /d %~dp0backend && mvnw.cmd spring-boot:run"
timeout /t 6 /nobreak >nul
start "TGSRTC Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"
echo Backend running on http://localhost:8080
echo Frontend running on http://localhost:5173
