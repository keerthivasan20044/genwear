@echo off
title GENWEAR - Full Stack Startup
color 0A

echo.
echo  ██████╗ ███████╗███╗   ██╗██╗    ██╗███████╗ █████╗ ██████╗ 
echo ██╔════╝ ██╔════╝████╗  ██║██║    ██║██╔════╝██╔══██╗██╔══██╗
echo ██║  ███╗█████╗  ██╔██╗ ██║██║ █╗ ██║█████╗  ███████║██████╔╝
echo ██║   ██║██╔══╝  ██║╚██╗██║██║███╗██║██╔══╝  ██╔══██║██╔══██╗
echo ╚██████╔╝███████╗██║ ╚████║╚███╔███╔╝███████╗██║  ██║██║  ██║
echo  ╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
echo.
echo                    Next Generation E-Commerce Platform
echo                           Full Stack Startup Script
echo.
echo ============================================================================
echo.

echo [1/6] Checking MongoDB Status...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MongoDB is already running
) else (
    echo 🚀 Starting MongoDB...
    start "MongoDB" mongod --dbpath "C:\data\db"
    echo ⏳ Waiting for MongoDB to initialize...
    timeout /t 5 >nul
)

echo.
echo [2/6] Installing Backend Dependencies...
cd server
if not exist node_modules (
    echo 📦 Installing server dependencies...
    npm install
) else (
    echo ✅ Backend dependencies already installed
)

echo.
echo [3/6] Seeding Database...
echo 🌱 Seeding database with products and users...
npm run seed

echo.
echo [4/6] Installing Frontend Dependencies...
cd ../client
if not exist node_modules (
    echo 📦 Installing client dependencies...
    npm install
) else (
    echo ✅ Frontend dependencies already installed
)

echo.
echo [5/6] Starting Backend Server...
cd ../server
start "GENWEAR Backend" cmd /k "echo GENWEAR Backend Server && npm run dev"

echo ⏳ Waiting for backend to start...
timeout /t 3 >nul

echo.
echo [6/6] Starting Frontend Development Server...
cd ../client
start "GENWEAR Frontend" cmd /k "echo GENWEAR Frontend Server && npm run dev"

echo.
echo ============================================================================
echo 🎉 GENWEAR Application Started Successfully!
echo.
echo 📍 Frontend: http://localhost:5173
echo 📍 Backend:  http://localhost:5001
echo.
echo 👤 Test Credentials:
echo    Admin:    admin@genwear.com / Admin@123
echo    Customer: john@example.com / User@123
echo.
echo 📚 Documentation: README.md
echo 🐛 Issues: Check console logs in the opened windows
echo.
echo Press any key to run authentication tests...
pause >nul

echo.
echo 🧪 Running Authentication Tests...
node ../test-auth.js

echo.
echo ============================================================================
echo 🚀 GENWEAR is ready for development!
echo.
pause