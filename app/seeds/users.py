from app.models import db, User
from datetime import datetime, timedelta
import random

def seed_users():
    """Create diverse, realistic users with proper names and emails"""
    
    users = [
        # Demo user for easy testing
        User(
            username='demo',
            first_name='Demo',
            last_name='User',
            email='demo@swetsy.com',
            password='password'
        ),
        
        # Realistic sellers and buyers
        User(
            username='sarah_crafts',
            first_name='Sarah',
            last_name='Johnson',
            email='sarah.johnson@email.com',
            password='password'
        ),
        User(
            username='mike_woodworker',
            first_name='Michael',
            last_name='Chen',
            email='michael.chen@email.com',
            password='password'
        ),
        User(
            username='emma_artisan',
            first_name='Emma',
            last_name='Rodriguez',
            email='emma.rodriguez@email.com',
            password='password'
        ),
        User(
            username='alex_handmade',
            first_name='Alex',
            last_name='Thompson',
            email='alex.thompson@email.com',
            password='password'
        ),
        User(
            username='jessica_creative',
            first_name='Jessica',
            last_name='Williams',
            email='jessica.williams@email.com',
            password='password'
        ),
        User(
            username='david_maker',
            first_name='David',
            last_name='Brown',
            email='david.brown@email.com',
            password='password'
        ),
        User(
            username='lisa_handcrafted',
            first_name='Lisa',
            last_name='Garcia',
            email='lisa.garcia@email.com',
            password='password'
        ),
        User(
            username='ryan_artisan',
            first_name='Ryan',
            last_name='Davis',
            email='ryan.davis@email.com',
            password='password'
        ),
        User(
            username='amanda_crafts',
            first_name='Amanda',
            last_name='Wilson',
            email='amanda.wilson@email.com',
            password='password'
        )
    ]
    
    for user in users:
        db.session.add(user)
    
    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()