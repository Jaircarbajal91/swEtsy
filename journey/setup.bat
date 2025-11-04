@echo off
REM swEtsy Quick Start Script for Windows
REM This script helps you get the swEtsy project running quickly

echo 🚀 Starting swEtsy Setup...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.9+ first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 14+ first.
    pause
    exit /b 1
)

echo ✅ Python and Node.js are installed

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    (
        echo FLASK_APP=app
        echo FLASK_ENV=development
        echo SECRET_KEY=your-secret-key-change-this-in-production
        echo DATABASE_URL=sqlite:///swetsy.db
    ) > .env
    echo ✅ Created .env file
) else (
    echo ✅ .env file already exists
)

REM Backend setup
echo 🐍 Setting up Python backend...

REM Check if pipenv is installed
pipenv --version >nul 2>&1
if errorlevel 1 (
    echo 📦 Using pip for Python dependencies...
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
) else (
    echo 📦 Using pipenv for Python dependencies...
    pipenv install
    echo 🔧 Activating pipenv shell...
    pipenv shell
)

echo 🗄️ Setting up database...
set FLASK_APP=app
set FLASK_ENV=development
set SECRET_KEY=your-secret-key-change-this-in-production
set DATABASE_URL=sqlite:///swetsy.db

flask db upgrade
flask seed all

echo ✅ Backend setup complete!

REM Frontend setup
echo ⚛️ Setting up React frontend...
cd react-app

if not exist node_modules (
    echo 📦 Installing Node.js dependencies...
    npm install
) else (
    echo ✅ Node.js dependencies already installed
)

echo ✅ Frontend setup complete!

echo.
echo 🎉 Setup complete! To run the application:
echo.
echo Backend (Command Prompt 1):
echo   cd /path/to/swEtsy
echo   venv\Scripts\activate.bat
echo   set FLASK_APP=app
echo   set FLASK_ENV=development
echo   set SECRET_KEY=your-secret-key-change-this-in-production
echo   set DATABASE_URL=sqlite:///swetsy.db
echo   flask run
echo.
echo Frontend (Command Prompt 2):
echo   cd /path/to/swEtsy/react-app
echo   npm start
echo.
echo 🌐 Access the application at:
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:5000
echo.
echo 👤 Demo Login:
echo   Username: Demo
echo   Password: password
echo.
echo 📚 For more details, see journey/SETUP_GUIDE.md and journey/CODEBASE_JOURNEY.md
pause
