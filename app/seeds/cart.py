from app.models import db, Cart
from datetime import datetime, date, timedelta
import random

def seed_carts():
    """Create realistic shopping cart data with varied quantities and products"""
    
    today = datetime.now()
    
    # Create diverse cart items with realistic quantities
    cart_items = [
        # User 1 (demo) has a varied cart
        Cart(user_id=1, product_id=1, quantity=1, create_at=today, update_at=today),  # Ceramic vase
        Cart(user_id=1, product_id=4, quantity=2, create_at=today, update_at=today),  # Earrings (gift)
        Cart(user_id=1, product_id=7, quantity=1, create_at=today, update_at=today),  # Art print
        
        # User 2 has home decor items
        Cart(user_id=2, product_id=2, quantity=1, create_at=today, update_at=today),  # Macrame
        Cart(user_id=2, product_id=13, quantity=1, create_at=today, update_at=today), # Dinnerware set
        Cart(user_id=2, product_id=15, quantity=2, create_at=today, update_at=today), # Plant pots
        
        # User 3 has jewelry and accessories
        Cart(user_id=3, product_id=5, quantity=1, create_at=today, update_at=today),  # Leather wallet
        Cart(user_id=3, product_id=6, quantity=3, create_at=today, update_at=today),  # Scarves (gifts)
        Cart(user_id=3, product_id=9, quantity=1, create_at=today, update_at=today),  # Sweater
        
        # User 4 has kitchen items
        Cart(user_id=4, product_id=3, quantity=1, create_at=today, update_at=today),  # Cutting boards
        Cart(user_id=4, product_id=14, quantity=2, create_at=today, update_at=today), # Wooden spoons
        Cart(user_id=4, product_id=18, quantity=1, create_at=today, update_at=today), # Journal
        
        # User 5 has art and stationery
        Cart(user_id=5, product_id=8, quantity=1, create_at=today, update_at=today),  # Digital print
        Cart(user_id=5, product_id=19, quantity=1, create_at=today, update_at=today), # Calligraphy set
        Cart(user_id=5, product_id=20, quantity=2, create_at=today, update_at=today), # Pet bandanas
        
        # User 6 has mixed items
        Cart(user_id=6, product_id=10, quantity=1, create_at=today, update_at=today),  # Denim jacket
        Cart(user_id=6, product_id=11, quantity=1, create_at=today, update_at=today),  # Puzzle set
        Cart(user_id=6, product_id=16, quantity=1, create_at=today, update_at=today), # Garden tools
        
        # User 7 has toys and pet items
        Cart(user_id=7, product_id=12, quantity=1, create_at=today, update_at=today),  # Handmade doll
        Cart(user_id=7, product_id=21, quantity=1, create_at=today, update_at=today), # Cat scratching post
        Cart(user_id=7, product_id=17, quantity=1, create_at=today, update_at=today), # Plant pot
        
        # User 8 has garden and outdoor items
        Cart(user_id=8, product_id=16, quantity=1, create_at=today, update_at=today), # Garden tools
        Cart(user_id=8, product_id=17, quantity=3, create_at=today, update_at=today), # Plant pots
        Cart(user_id=8, product_id=18, quantity=1, create_at=today, update_at=today), # Journal
        
        # User 9 has books and stationery
        Cart(user_id=9, product_id=18, quantity=2, create_at=today, update_at=today), # Journals (gifts)
        Cart(user_id=9, product_id=19, quantity=1, create_at=today, update_at=today), # Calligraphy set
        Cart(user_id=9, product_id=8, quantity=1, create_at=today, update_at=today),   # Art print
        
        # User 10 has clothing and accessories
        Cart(user_id=10, product_id=9, quantity=1, create_at=today, update_at=today),  # Sweater
        Cart(user_id=10, product_id=6, quantity=1, create_at=today, update_at=today),  # Scarf
        Cart(user_id=10, product_id=4, quantity=1, create_at=today, update_at=today),   # Earrings
    ]
    
    for cart_item in cart_items:
        db.session.add(cart_item)
    
    db.session.commit()

def undo_carts():
    db.session.execute('TRUNCATE carts RESTART IDENTITY CASCADE;')
    db.session.commit()