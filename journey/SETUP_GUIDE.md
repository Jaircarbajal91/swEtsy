# swEtsy Setup Guide

## Project Overview
**swEtsy** is an Etsy clone built with Flask (Python) backend and React frontend. It's a marketplace where users can list products, browse/search items, add to cart, and leave reviews.

## Tech Stack
- **Backend**: Flask, SQLAlchemy, PostgreSQL/SQLite, Flask-Login, Flask-Migrate
- **Frontend**: React 17, Redux, React Router, Redux-Thunk
- **Deployment**: Docker, Heroku
- **Database**: PostgreSQL (production), SQLite (development)

## Prerequisites
- Python 3.9+
- Node.js 14+
- pipenv (recommended) or pip
- PostgreSQL (for production)

### Ubuntu/Debian Additional Requirements
If you're on Ubuntu/Debian, you may need to install additional packages:
```bash
sudo apt update
sudo apt install python3.12-venv python3-pip python3.12-dev python3-dev build-essential pipx -y
```

## Setup Instructions

### 1. Backend Setup (Flask)

#### Option A: Using pipenv (Recommended)
```bash
# Install pipenv if you don't have it (Ubuntu 23.04+)
sudo apt install pipenv -y
# OR use pipx for isolated installation
pipx install pipenv

# Install Python dependencies
pipenv install

# Activate virtual environment
pipenv shell

# Set up environment variables
export FLASK_APP=app
export FLASK_ENV=development
export SECRET_KEY=your-secret-key-here
export DATABASE_URL=sqlite:///swetsy.db

# Initialize database
flask db upgrade

# Seed the database with sample data
flask seed all

# Run the Flask server
flask run
```

#### Option B: Using pip
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
export FLASK_APP=app
export FLASK_ENV=development
export SECRET_KEY=your-secret-key-here
export DATABASE_URL=sqlite:///swetsy.db

# Initialize database
flask db upgrade

# Seed the database
flask seed all

# Run the Flask server
flask run
```

### 2. Frontend Setup (React)

```bash
# Navigate to React app directory
cd react-app

# Install dependencies
npm install

# Start the React development server
npm start
```

### 3. Access the Application

- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:3000
- **Demo Login**: Username: `Demo`, Password: `password`

## Project Structure

```
swEtsy/
├── app/                    # Flask backend
│   ├── api/               # API routes
│   ├── models/            # Database models
│   ├── forms/             # WTForms
│   ├── seeds/             # Database seeding
│   └── config.py          # Configuration
├── react-app/             # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/         # Redux store
│   │   └── context/       # React context
│   └── package.json
├── migrations/            # Database migrations
└── Dockerfile            # Docker configuration
```

## Key Features

1. **User Authentication**: Login/signup with Flask-Login
2. **Product Management**: CRUD operations for products
3. **Shopping Cart**: Add/remove items, quantity management
4. **Search & Filter**: Product search with price filtering
5. **Reviews System**: Rate and review products
6. **Responsive Design**: Mobile-friendly interface

## Database Models

- **User**: Authentication and user info
- **Product**: Product listings with images and pricing
- **Cart**: Shopping cart items
- **Review**: Product reviews and ratings

## API Endpoints

- `/api/auth/*` - Authentication routes
- `/api/users/*` - User management
- `/api/products/*` - Product CRUD operations
- `/api/cart/*` - Shopping cart operations
- `/api/search/*` - Search functionality
- `/api/reviews/*` - Review management

## Troubleshooting

### Common Issues

1. **Virtual Environment Creation Error (Ubuntu/Debian)**
   ```bash
   # Error: ensurepip is not available
   # Solution: Install python3-venv package
   sudo apt update
   sudo apt install python3.12-venv python3-pip -y
   ```

2. **Package Compilation Error (Ubuntu/Debian)**
   ```bash
   # Error: Python.h: No such file or directory
   # Solution: Install Python development headers
   sudo apt update
   sudo apt install python3.12-dev python3-dev build-essential -y
   ```

3. **Externally Managed Environment Error (Ubuntu 23.04+)**
   ```bash
   # Error: externally-managed-environment
   # Solution: Use pipx or install via apt
   sudo apt install pipenv -y
   # OR
   pipx install pipenv
   ```

4. **Python Version Mismatch with pipenv**
   ```bash
   # Error: Python 3.9 was not found
   # Solution: Specify the correct Python version
   pipenv install --python python3.12
   # OR update Pipfile to use python_version = "3.12"
   ```

5. **Package Compatibility Error (Python 3.12)**
   ```bash
   # Error: greenlet compilation fails with Python 3.12
   # Solution: Update greenlet version in requirements.txt
   # Change: greenlet==1.1.0 → greenlet>=2.0.0
   
   # Error: No module named 'six.moves'
   # Solution: Update six version in requirements.txt
   # Change: six==1.15.0 → six>=1.16.0
   ```

6. **Database Connection Error**
   - Ensure DATABASE_URL is set correctly
   - Run `flask db upgrade` to create tables

7. **CORS Issues**
   - Flask-CORS is configured, but check if frontend proxy is set correctly

8. **Authentication Issues**
   - Check SECRET_KEY is set
   - Ensure Flask-Login is properly configured

9. **React Build Issues**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

### Environment Variables Needed

```bash
FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///swetsy.db  # or PostgreSQL URL for production
```

## Development Tips

1. **Hot Reloading**: Both Flask and React support hot reloading in development
2. **Database Seeding**: Use `flask seed all` to populate with sample data
3. **API Testing**: Use tools like Postman or curl to test API endpoints
4. **Frontend State**: Redux DevTools available for state debugging

## Production Deployment

The project includes Docker configuration for Heroku deployment:
- Frontend is built and served by Flask
- PostgreSQL database for production
- Gunicorn as WSGI server
- HTTPS redirects configured

## Next Steps for Improvement

1. **Code Quality**: Add linting, formatting, and testing
2. **Security**: Implement proper CSRF protection, input validation
3. **Performance**: Add caching, database optimization
4. **Features**: Add categories, image uploads, payment integration
5. **UI/UX**: Modernize design, improve mobile experience
