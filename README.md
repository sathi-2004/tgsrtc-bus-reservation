# TGSRTC Online Bus Reservation & Fleet Management System

A production-grade, full-stack bus reservation and fleet management system inspired by the **TGSRTC (Telangana State Road Transport Corporation)** booking portal.

This project implements customer booking workflows, real-time seat layouts, payment processing, PNR/e-ticket generation with QR codes, bus tracking telemetry, and an administrative control center.

---

## 1. Technology Stack

* **Frontend:**
  * React 18 + Vite
  * Bootstrap 5 & Bootstrap Icons
  * React Router DOM v6
  * Axios with JWT Request/Response Interceptors
  * QRCode.react & jsPDF for ticket generation and printing
* **Backend:**
  * Java 21 / 26
  * Spring Boot 3.3.4
  * Spring Security 6 with stateless JWT authentication
  * Spring Data JPA & Hibernate ORM
  * Maven 3.9
* **Database:**
  * MySQL 8.0 on `localhost:3306`
  * Database name: `bus_reservation_db`

---

## 2. Environment Configuration

All sensitive configuration parameters are externalized into environment variables with safe defaults for local development.

### Configuration Template
Refer to the included [`.env.example`](.env.example) file for all available environment variables:

| Variable | Description | Default (Local Dev) |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `8080` |
| `DB_URL` | MySQL JDBC Connection URL | `jdbc:mysql://localhost:3306/bus_reservation_db...` |
| `DB_USERNAME` | MySQL database username | `root` |
| `DB_PASSWORD` | MySQL database password | `root` |
| `JWT_SECRET` | Secret key for JWT signing (>= 256 bits) | Auto-generated dev key |
| `JWT_EXPIRATION_MS` | JWT expiration time in milliseconds | `86400000` (24h) |
| `RAZORPAY_KEY_ID` | Razorpay public key ID | `rzp_test_demo123456789` |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key (Backend only) | `rzp_secret_demo987654321` |
| `MAIL_HOST` | SMTP server host | `smtp.gmail.com` |
| `MAIL_PORT` | SMTP port | `587` |
| `MAIL_USERNAME` | SMTP email username | *(empty)* |
| `MAIL_PASSWORD` | SMTP app password | *(empty)* |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins (comma-separated) | `http://localhost:5173,http://localhost:3000...` |
| `VITE_API_BASE_URL` | Frontend API base URL | `http://localhost:8080/api` |

### Setting Environment Variables on Windows

**In Windows PowerShell (Current Session):**
```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_actual_password"
$env:JWT_SECRET="your_custom_production_secret_key_minimum_32_characters"
$env:RAZORPAY_KEY_ID="rzp_test_your_key_id"
$env:RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
```

**Persistent User Environment Variables:**
```powershell
[System.Environment]::SetEnvironmentVariable('DB_PASSWORD', 'your_actual_password', 'User')
[System.Environment]::SetEnvironmentVariable('JWT_SECRET', 'your_custom_secret', 'User')
```

---

## 3. Database Initialization

1. Ensure MySQL 8 is running on port `3306`.
2. Run the initialization scripts using MySQL client:
```powershell
# Create Database
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -e "CREATE DATABASE IF NOT EXISTS bus_reservation_db;"

# Apply Schema (17 Tables)
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p bus_reservation_db < database\schema.sql

# Seed Telangana Routes, Buses, Schedules & Users
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p bus_reservation_db < database\sample-data.sql
```

---

## 4. Running the Application

### Option A: 1-Click Launch Scripts (Windows)
* Double-click `start-all.bat` to launch both Backend and Frontend in separate windows.
* Or use `start-backend.bat` and `start-frontend.bat` individually.

### Option B: Terminal Execution

**Terminal 1 — Spring Boot Backend:**
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
*Backend runs on `http://localhost:8080` (API base: `http://localhost:8080/api`).*

**Terminal 2 — React + Vite Frontend:**
```powershell
cd frontend
npm install   # If not already installed
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 5. Default Demo Credentials

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Chief Administrator** | `admin@tgsrtc.gov.in` | `Admin@123` | Full Admin Control Center (`/admin`), fleet, routes, schedules, bookings, revenue analytics |
| **Passenger** | `passenger@example.com` | `Pass@123` | Search, seat booking, e-ticket view, cancellation, live GPS bus tracking |

---

## 6. Payment Integration & Test Mode

The payment system features a dual-mode architecture:
* **Built-in Test Simulator:** Works offline out-of-the-box without requiring live third-party keys.
* **Razorpay Test Sandbox:** To test live Razorpay checkout, supply your test keys via `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. The secret key remains exclusively on the backend.

---

## 7. Build & Verification Commands

* **Backend Unit & Integration Tests (12/12 passing):**
  ```powershell
  cd backend
  .\mvnw.cmd test
  ```
* **Backend Production JAR Packaging:**
  ```powershell
  cd backend
  .\mvnw.cmd package
  ```
  *Produces `backend/target/bus-reservation-system-1.0.0.jar`.*
* **Frontend Production Build:**
  ```powershell
  cd frontend
  npm run build
  ```
  *Produces optimized bundle in `frontend/dist/`.*

---

## 8. Safe GitHub Publishing Steps

Follow these steps to safely push to your public GitHub repository:

```powershell
# 1. Verify git status (Ensure NO .env, target, node_modules, or dist appear)
git status

# 2. Stage all project files (Protected by root .gitignore)
git add .

# 3. Review staged files before committing
git status

# 4. Commit the verified project
git commit -m "feat: initial commit of TGSRTC bus reservation system with security hardening"

# 5. Connect your GitHub repository (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# 6. Push to main branch
git branch -M main
git push -u origin main
```
