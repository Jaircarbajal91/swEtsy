from app.models import db, User
from datetime import datetime, timedelta
import random

def seed_users():
    """Create diverse, realistic users with proper names and emails"""
    
    # First names pool
    first_names = [
        'Alex', 'Alexis', 'Amanda', 'Amy', 'Andrea', 'Angela', 'Anna', 'Ashley', 'Barbara', 'Betty',
        'Brandon', 'Brian', 'Carol', 'Charles', 'Chris', 'Christina', 'Christopher', 'Daniel', 'David', 'Deborah',
        'Donald', 'Donna', 'Dorothy', 'Edward', 'Elizabeth', 'Emily', 'Emma', 'Eric', 'Frank', 'George',
        'Gregory', 'Heather', 'Helen', 'James', 'Jason', 'Jeffrey', 'Jennifer', 'Jessica', 'John', 'Joseph',
        'Joshua', 'Karen', 'Kathleen', 'Kevin', 'Kimberly', 'Laura', 'Linda', 'Lisa', 'Margaret', 'Maria',
        'Mark', 'Mary', 'Matthew', 'Melissa', 'Michael', 'Michelle', 'Nancy', 'Patricia', 'Paul', 'Rachel',
        'Rebecca', 'Richard', 'Robert', 'Ronald', 'Ryan', 'Sandra', 'Sarah', 'Scott', 'Sharon', 'Shirley',
        'Stephanie', 'Stephen', 'Steven', 'Susan', 'Thomas', 'Timothy', 'Tyler', 'William', 'Zoe', 'Aaron',
        'Adam', 'Alan', 'Alice', 'Allison', 'Amber', 'Andrew', 'Benjamin', 'Beth', 'Blake', 'Brittany',
        'Caleb', 'Catherine', 'Chelsea', 'Cynthia', 'Danielle', 'Diana', 'Ethan', 'Gabriel', 'Grace', 'Hannah',
        'Isabella', 'Jacqueline', 'Jamie', 'Janet', 'Jasmine', 'Jeremy', 'Joan', 'Jordan', 'Joyce', 'Julia',
        'Julie', 'Justin', 'Katherine', 'Kelly', 'Kenneth', 'Kyle', 'Lauren', 'Lawrence', 'Lucas', 'Madison',
        'Megan', 'Melissa', 'Nicole', 'Olivia', 'Patrick', 'Peter', 'Raymond', 'Ruth', 'Samantha', 'Samuel',
        'Sean', 'Sophia', 'Tiffany', 'Tracy', 'Victoria', 'Wayne', 'Wendy'
    ]
    
    # Last names pool
    last_names = [
        'Adams', 'Alexander', 'Allen', 'Anderson', 'Bailey', 'Baker', 'Barnes', 'Bell', 'Bennett', 'Brooks',
        'Brown', 'Bryant', 'Butler', 'Campbell', 'Carter', 'Chapman', 'Chen', 'Clark', 'Coleman', 'Collins',
        'Cook', 'Cooper', 'Cox', 'Davis', 'Diaz', 'Edwards', 'Evans', 'Flores', 'Ford', 'Foster',
        'Garcia', 'Gonzalez', 'Gray', 'Green', 'Griffin', 'Hall', 'Harris', 'Hayes', 'Henderson', 'Hernandez',
        'Hill', 'Howard', 'Hughes', 'Jackson', 'James', 'Jenkins', 'Johnson', 'Jones', 'Kelly', 'King',
        'Lee', 'Lewis', 'Long', 'Lopez', 'Martin', 'Martinez', 'Miller', 'Mitchell', 'Moore', 'Morgan',
        'Morris', 'Murphy', 'Myers', 'Nelson', 'Nguyen', 'Parker', 'Patterson', 'Perez', 'Perry', 'Peterson',
        'Phillips', 'Powell', 'Price', 'Ramirez', 'Reed', 'Richardson', 'Rivera', 'Roberts', 'Robinson', 'Rodriguez',
        'Rogers', 'Ross', 'Russell', 'Sanchez', 'Sanders', 'Scott', 'Simmons', 'Smith', 'Stewart', 'Taylor',
        'Thomas', 'Thompson', 'Torres', 'Turner', 'Walker', 'Ward', 'Washington', 'Watson', 'White', 'Williams',
        'Wilson', 'Wood', 'Wright', 'Young', 'Zhang', 'Zhao', 'Zhou', 'Anderson', 'Blake', 'Carter',
        'Cruz', 'Duncan', 'Elliott', 'Ferguson', 'Fisher', 'Fletcher', 'Fox', 'Gardner', 'Gibson', 'Grant',
        'Hamilton', 'Harrison', 'Harvey', 'Hayward', 'Holland', 'Holmes', 'Hunt', 'Hunter', 'Jordan', 'Knight',
        'Lane', 'Lawrence', 'Lawson', 'Marshall', 'Mason', 'Matthews', 'Maxwell', 'McDonald', 'Meyer', 'Miller',
        'Mills', 'Montgomery', 'Morrison', 'Murray', 'Norton', 'Olson', 'Palmer', 'Porter', 'Reid', 'Reynolds',
        'Richards', 'Robertson', 'Rose', 'Schmidt', 'Schultz', 'Schwartz', 'Simpson', 'Snyder', 'Spencer', 'Stephens',
        'Stone', 'Sullivan', 'Sutton', 'Vargas', 'Vasquez', 'Wagner', 'Wallace', 'Walsh', 'Warren', 'Weaver',
        'Webb', 'Welch', 'Wells', 'West', 'Wheeler', 'Wiley', 'Willis', 'Wolfe', 'Woods', 'Yates'
    ]
    
    # Username suffixes for variety
    username_suffixes = [
        'crafts', 'artisan', 'maker', 'creative', 'handmade', 'handcrafted', 'designs', 'studio', 'works',
        'shop', 'boutique', 'collective', 'workshop', 'studio', 'atelier', 'goods', 'wares', 'finds', 'treasures',
        'creations', 'originals', 'unique', 'vintage', 'modern', 'classic', 'elegant', 'rustic', 'minimal', 'bold'
    ]
    
    users = []
    emails_used = set()
    usernames_used = set()
    
    # Add demo user
    users.append(User(
        username='demo',
        first_name='Demo',
        last_name='User',
        email='demo@swetsy.com',
        password='password'
    ))
    emails_used.add('demo@swetsy.com')
    usernames_used.add('demo')
    
    # Generate 120 users
    user_count = 120
    random.seed(42)  # For reproducibility
    
    for i in range(user_count):
        attempts = 0
        while attempts < 50:
            first_name = random.choice(first_names)
            last_name = random.choice(last_names)
            
            # Create email variants
            email_variants = [
                f'{first_name.lower()}.{last_name.lower()}@email.com',
                f'{first_name.lower()}{last_name.lower()}@email.com',
                f'{first_name.lower()}{random.randint(1, 999)}@email.com',
                f'{last_name.lower()}.{first_name.lower()}@email.com'
            ]
            
            # Create username variants
            username_variants = [
                f'{first_name.lower()}_{last_name.lower()}',
                f'{first_name.lower()}{last_name.lower()}',
                f'{first_name.lower()}_{random.choice(username_suffixes)}',
                f'{last_name.lower()}_{random.choice(username_suffixes)}',
                f'{first_name.lower()}{random.randint(1, 999)}'
            ]
            
            email = random.choice(email_variants)
            username = random.choice(username_variants)
            
            if email not in emails_used and username not in usernames_used:
                emails_used.add(email)
                usernames_used.add(username)
                users.append(User(
                    username=username,
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    password='password'
                ))
                break
            attempts += 1
        
        if attempts >= 50:
            # Fallback: use index-based naming
            unique_id = random.randint(10000, 99999)
            email = f'user{unique_id}@email.com'
            username = f'user{unique_id}'
            if email not in emails_used and username not in usernames_used:
                emails_used.add(email)
                usernames_used.add(username)
                users.append(User(
                    username=username,
                    first_name=random.choice(first_names),
                    last_name=random.choice(last_names),
                    email=email,
                    password='password'
                ))
    
    for user in users:
        db.session.add(user)
    
    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()