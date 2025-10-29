#!/bin/bash

# swEtsy Quick Start Script
# This script helps you get the swEtsy project running quickly

echo "🚀 Starting swEtsy Setup..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ first."
    exit 1
fi

echo "✅ Python and Node.js are installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=your-secret-key-change-this-in-production
DATABASE_URL=sqlite:///swetsy.db
EOF
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

# Backend setup
echo "🐍 Setting up Python backend..."

# Check if pipenv is installed
if command -v pipenv &> /dev/null; then
    echo "📦 Using pipenv for Python dependencies..."
    pipenv install
    echo "🔧 Activating pipenv shell..."
    pipenv shell
else
    echo "📦 Using pip for Python dependencies..."
    python3 -m venv venv
    source venv/bin/activate
    
    # Check if we're on Ubuntu/Debian and install dev packages if needed
    if command -v apt &> /dev/null; then
        echo "🔧 Installing Python development packages for Ubuntu/Debian..."
        sudo apt update
        sudo apt install python3.12-dev python3-dev build-essential -y
    fi
    
    pip install -r requirements.txt
fi

echo "🗄️ Setting up database..."
export FLASK_APP=app
export FLASK_ENV=development
export SECRET_KEY=your-secret-key-change-this-in-production
export DATABASE_URL=sqlite:///swetsy.db

flask db upgrade
flask seed all

echo "✅ Backend setup complete!"

# Frontend setup
echo "⚛️ Setting up React frontend..."
cd react-app

if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
else
    echo "✅ Node.js dependencies already installed"
fi

echo "✅ Frontend setup complete!"

echo ""
echo "🎉 Setup complete! To run the application:"
echo ""
echo "Backend (Terminal 1):"
echo "  cd /path/to/swEtsy"
echo "  source venv/bin/activate  # or 'pipenv shell' if using pipenv"
echo "  export FLASK_APP=app"
echo "  export FLASK_ENV=development"
echo "  export SECRET_KEY=your-secret-key-change-this-in-production"
echo "  export DATABASE_URL=sqlite:///swetsy.db"
echo "  flask run"
echo ""
echo "Frontend (Terminal 2):"
echo "  cd /path/to/swEtsy/react-app"
echo "  npm start"
echo ""
echo "🌐 Access the application at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:5000"
echo ""
echo "👤 Demo Login:"
echo "  Username: Demo"
echo "  Password: password"
echo ""
echo "📚 For more details, see journey/SETUP_GUIDE.md and journey/CODEBASE_JOURNEY.md"
