from app.models import db, Cart, Product, User
from datetime import datetime, date, timedelta
import random

def seed_carts():
    """Create realistic shopping cart data with varied quantities and products"""
    
    random.seed(42)  # For reproducibility
    today = datetime.now()
    
    # Get actual product and user counts
    total_products = Product.query.count()
    total_users = User.query.count()
    
    if total_products == 0 or total_users == 0:
        print("No products or users found. Please seed products and users first.")
        return
    
    # Get valid product IDs
    product_ids = [p.id for p in Product.query.all()]
    user_ids = list(range(1, total_users + 1))
    
    cart_items = []
    
    # Generate carts for a subset of users (realistic - not everyone has items in cart)
    # About 30-40% of users have items in their cart
    users_with_carts = random.sample(user_ids, int(total_users * 0.35))
    
    for user_id in users_with_carts:
        # Each user can have 1-5 items in their cart
        num_items = random.randint(1, 5)
        
        # Get products for this user's cart (ensure they're not buying their own products)
        user_products = [p.id for p in Product.query.filter(Product.owner_id != user_id).all()]
        
        if len(user_products) == 0:
            # User owns all products, skip
            continue
        
        # Select random products for cart
        selected_products = random.sample(user_products, min(num_items, len(user_products)))
        
        for product_id in selected_products:
            # Vary quantities (1-4 items, higher chance for lower quantities)
            quantity_rand = random.randint(1, 100)
            if quantity_rand <= 60:
                quantity = 1
            elif quantity_rand <= 85:
                quantity = 2
            elif quantity_rand <= 95:
                quantity = 3
            else:
                quantity = 4
            
            # Vary cart creation dates (carts created within last 7 days, some today)
            days_ago = random.randint(0, 7)
            cart_date = today - timedelta(days=days_ago)
            
            # Update date is usually same or 1-2 days later (items added over time)
            update_days_ago = random.randint(0, max(0, days_ago - 1))
            update_date = today - timedelta(days=update_days_ago)
            
            cart_item = Cart(
                user_id=user_id,
                product_id=product_id,
                quantity=quantity,
                create_at=cart_date,
                update_at=update_date
            )
            cart_items.append(cart_item)
    
    # Batch insert for better performance
    batch_size = 50
    for i in range(0, len(cart_items), batch_size):
        batch = cart_items[i:i + batch_size]
        for cart_item in batch:
            db.session.add(cart_item)
        db.session.commit()
    
    print(f"Created {len(cart_items)} cart items for {len(users_with_carts)} users")

def undo_carts():
    db.session.execute('TRUNCATE carts RESTART IDENTITY CASCADE;')
    db.session.commit()
