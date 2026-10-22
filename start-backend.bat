@echo off
echo ========================================================
echo Starting TGSRTC Spring Boot Backend on http://localhost:8080
echo ========================================================
cd /d "%~dp0backend"
call mvnw.cmd spring-boot:run
pause
