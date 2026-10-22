@echo off
echo ========================================================
echo Starting TGSRTC React Frontend on http://localhost:5173
echo ========================================================
cd /d "%~dp0frontend"
call npm run dev
pause
