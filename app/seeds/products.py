from app.models import db, User, Product
from datetime import datetime, date, timedelta
import random

def seed_products():
    """Create diverse, realistic products across multiple categories"""
    
    # Get current date and create some variation
    today = date.today()
    base_date = today - timedelta(days=random.randint(1, 90))
    
    products = [
        # Home & Decor
        Product(
            name='Handmade Ceramic Vase',
            description='Beautiful hand-thrown ceramic vase perfect for flowers or as a decorative piece. Each piece is unique with natural glazing variations.',
            image='https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
            price=45.99,
            create_at=base_date,
            update_at=base_date,
            owner_id=2
        ),
        Product(
            name='Macrame Wall Hanging',
            description='Elegant macrame wall hanging made with premium cotton cord. Adds bohemian charm to any room. Dimensions: 24" x 36".',
            image='https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
            price=38.50,
            create_at=base_date,
            update_at=base_date,
            owner_id=3
        ),
        Product(
            name='Wooden Cutting Board Set',
            description='Handcrafted bamboo cutting board set with juice groove. Includes 3 different sizes. Food-safe finish.',
            image='https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
            price=65.00,
            create_at=base_date,
            update_at=base_date,
            owner_id=4
        ),
        
        # Jewelry & Accessories
        Product(
            name='Sterling Silver Earrings',
            description='Delicate sterling silver earrings with freshwater pearls. Handcrafted with attention to detail. Hypoallergenic.',
            image='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
            price=28.99,
            create_at=base_date,
            update_at=base_date,
            owner_id=5
        ),
        Product(
            name='Leather Wallet',
            description='Genuine leather bifold wallet with RFID blocking technology. Hand-stitched for durability. Available in brown or black.',
            image='https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
            price=42.00,
            create_at=base_date,
            update_at=base_date,
            owner_id=6
        ),
        Product(
            name='Handwoven Scarf',
            description='Soft cashmere blend scarf handwoven in traditional patterns. Perfect for cold weather. 60" x 12".',
            image='https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
            price=55.75,
            create_at=base_date,
            update_at=base_date,
            owner_id=7
        ),
        
        # Art & Prints
        Product(
            name='Watercolor Landscape Print',
            description='Original watercolor painting of mountain landscape. Professionally printed on high-quality paper. Frame not included.',
            image='https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500',
            price=25.00,
            create_at=base_date,
            update_at=base_date,
            owner_id=8
        ),
        Product(
            name='Digital Art Print',
            description='Modern abstract digital art print. Available in multiple sizes. Printed on premium matte paper.',
            image='https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500',
            price=18.50,
            create_at=base_date,
            update_at=base_date,
            owner_id=9
        ),
        
        # Clothing & Fashion
        Product(
            name='Hand-knitted Sweater',
            description='Cozy hand-knitted wool sweater in neutral colors. Made with premium merino wool. Available in sizes S-XL.',
            image='https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500',
            price=89.99,
            create_at=base_date,
            update_at=base_date,
            owner_id=10
        ),
        Product(
            name='Embroidered Denim Jacket',
            description='Vintage denim jacket with hand-embroidered floral designs. One-of-a-kind piece. Size M.',
            image='https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
            price=75.00,
            create_at=base_date,
            update_at=base_date,
            owner_id=2
        ),
        
        # Toys & Games
        Product(
            name='Wooden Puzzle Set',
            description='Educational wooden puzzle set for children ages 3-8. Includes 4 different puzzles with animal themes.',
            image='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
            price=32.99,
            create_at=base_date,
            update_at=base_date,
            owner_id=3
        ),
        Product(
            name='Handmade Doll',
            description='Soft handmade rag doll with embroidered features. Safe for children. Includes matching outfit.',
            image='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
            price=45.00,
            create_at=base_date,
            update_at=base_date,
            owner_id=4
        ),
        
        # Kitchen & Dining
        Product(
            name='Ceramic Dinnerware Set',
            description='Complete dinnerware set for 4 people. Hand-glazed ceramic plates, bowls, and mugs. Dishwasher safe.',
            image='https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
            price=120.00,
            create_at=base_date,
            update_at=base_date,
            owner_id=5
        ),
        Product(
            name='Hand-carved Wooden Spoons',
            description='Set of 6 hand-carved wooden spoons made from sustainable wood. Perfect for cooking and serving.',
            image='https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
            price=35.50,
            create_at=base_date,
            update_at=base_date,
            owner_id=6
        ),
        
        # Garden & Outdoor
        Product(
            name='Hand-painted Plant Pot',
            description='Terracotta plant pot with hand-painted botanical designs. Perfect for herbs or small plants. Includes drainage hole.',
            image='https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
            price=22.99,
            create_at=base_date,
            update_at=base_date,
            owner_id=7
        ),
        Product(
            name='Garden Tool Set',
            description='Handcrafted wooden garden tool set with metal heads. Includes trowel, fork, and cultivator. Natural wood finish.',
            image='https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
            price=48.00,
            create_at=base_date,
            update_at=base_date,
            owner_id=8
        ),
        
        # Books & Stationery
        Product(
            name='Handbound Journal',
            description='Handbound leather journal with handmade paper. Perfect for writing, sketching, or planning. 200 pages.',
            image='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
            price=38.99,
            create_at=base_date,
            update_at=base_date,
            owner_id=9
        ),
        Product(
            name='Calligraphy Pen Set',
            description='Professional calligraphy pen set with various nib sizes. Includes ink and practice sheets. Perfect for beginners.',
            image='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
            price=29.50,
            create_at=base_date,
            update_at=base_date,
            owner_id=10
        ),
        
        # Pet Accessories
        Product(
            name='Handmade Pet Bandana',
            description='Adorable pet bandana made from cotton fabric. Available in multiple patterns. Fits small to medium dogs.',
            image='https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500',
            price=12.99,
            create_at=base_date,
            update_at=base_date,
            owner_id=2
        ),
        Product(
            name='Cat Scratching Post',
            description='Handmade cat scratching post with sisal rope and wooden base. Helps protect furniture from scratching.',
            image='https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500',
            price=55.00,
            create_at=base_date,
            update_at=base_date,
            owner_id=3
        )
    ]
    
    for product in products:
        db.session.add(product)

    db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()