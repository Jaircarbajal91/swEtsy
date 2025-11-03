from app.models import db, User, Product
from datetime import datetime, date, timedelta
import random
import hashlib

def seed_products():
    """Create diverse, realistic products across multiple categories - 1000 products"""
    
    random.seed(42)  # For reproducibility
    today = date.today()
    
    def get_product_image(category_name, item_name, seed_value=None, product_index=0):
        """
        Generate a category-appropriate image URL using multiple free APIs.
        Rotates through different reliable image services for maximum compatibility.
        """
        # Create deterministic seed for consistent image selection
        if seed_value:
            combined_seed = f"{product_index}_{seed_value}"
            seed_hash = int(hashlib.md5(combined_seed.encode()).hexdigest()[:8], 16)
        else:
            seed_hash = product_index
        
        # Rotate between multiple reliable image APIs based on product index
        # This ensures we don't rely on a single service
        api_choice = product_index % 4  # Rotate through 4 different APIs
        
        if api_choice == 0:
            # API 1: Picsum Photos - 100% reliable, deterministic with seed
            seed = seed_hash % 1000
            return f'https://picsum.photos/seed/{seed}/500/500'
        
        elif api_choice == 1:
            # API 2: Placeholder.com - Always works, shows category-based text
            category_colors = {
                'home_decor': '8B7355', 'jewelry': 'D4AF37', 'art_prints': 'FF6B6B',
                'clothing': '4A90E2', 'kitchen': '50C878', 'toys_games': 'FF8C00',
                'garden': '228B22', 'stationery': '9370DB', 'pet_accessories': 'FF69B4',
                'bath_body': '87CEEB', 'tech_accessories': '708090', 'vintage': 'CD853F'
            }
            color = category_colors.get(category_name, '4A90E2')
            item_short = item_name.replace(' ', '%20')[:15]
            return f'https://via.placeholder.com/500x500/{color}/ffffff?text={item_short}'
        
        elif api_choice == 2:
            # API 3: DummyImage - Reliable placeholder with text
            category_colors = {
                'home_decor': '8B7355', 'jewelry': 'D4AF37', 'art_prints': 'FF6B6B',
                'clothing': '4A90E2', 'kitchen': '50C878', 'toys_games': 'FF8C00',
                'garden': '228B22', 'stationery': '9370DB', 'pet_accessories': 'FF69B4',
                'bath_body': '87CEEB', 'tech_accessories': '708090', 'vintage': 'CD853F'
            }
            color = category_colors.get(category_name, '4A90E2')
            item_short = item_name.replace(' ', '%20')[:15]
            return f'https://dummyimage.com/500x500/{color}/ffffff&text={item_short}'
        
        else:
            # API 4: Unsplash Source with category keywords (if it works)
            category_keywords = {
                'home_decor': 'home',
                'jewelry': 'jewelry',
                'art_prints': 'art',
                'clothing': 'fashion',
                'kitchen': 'kitchen',
                'toys_games': 'toys',
                'garden': 'garden',
                'stationery': 'notebook',
                'pet_accessories': 'pet',
                'bath_body': 'soap',
                'tech_accessories': 'technology',
                'vintage': 'vintage'
            }
            keyword = category_keywords.get(category_name, 'product')
            # Add seed for variety
            return f'https://source.unsplash.com/500x500/?{keyword}&sig={seed_hash}'
    
    # Product categories with templates
    categories = {
        'home_decor': {
            'items': ['Vase', 'Wall Hanging', 'Candle Holder', 'Plant Pot', 'Pillow', 'Throw Blanket', 
                     'Wall Art', 'Mirror', 'Lamp', 'Coaster Set', 'Trinket Box', 'Picture Frame', 
                     'Wall Clock', 'Decorative Bowl', 'Wind Chime', 'Dreamcatcher', 'Tapestry', 'Rug'],
            'adjectives': ['Handmade', 'Handcrafted', 'Artisan', 'Vintage', 'Modern', 'Rustic', 
                          'Elegant', 'Bohemian', 'Minimalist', 'Scandinavian', 'Industrial', 'Farmhouse'],
            'materials': ['Ceramic', 'Wooden', 'Metal', 'Glass', 'Textile', 'Rattan', 'Macrame', 
                         'Leather', 'Brass', 'Copper', 'Bamboo', 'Terracotta'],
            'price_range': (15, 150),
            'image_keywords': ['home', 'decor', 'interior', 'vase', 'decoration', 'furniture', 'art', 'design']
        },
        'jewelry': {
            'items': ['Earrings', 'Necklace', 'Bracelet', 'Ring', 'Anklet', 'Brooch', 'Hairpin', 
                     'Choker', 'Pendant', 'Cufflinks', 'Watch', 'Chain', 'Bangle', 'Tie Clip'],
            'adjectives': ['Sterling Silver', 'Gold-Plated', 'Rose Gold', 'Vintage', 'Art Deco', 
                          'Minimalist', 'Statement', 'Delicate', 'Bold', 'Antique', 'Modern', 'Classic'],
            'materials': ['Silver', 'Gold', 'Pearl', 'Gemstone', 'Crystal', 'Beaded', 'Wire-Wrapped', 
                         'Hand-forged', 'Engraved', 'Etched', 'Filigree'],
            'price_range': (12, 200),
            'image_keywords': ['jewelry', 'necklace', 'earrings', 'ring', 'bracelet', 'gold', 'silver', 'accessories']
        },
        'art_prints': {
            'items': ['Watercolor Print', 'Digital Art Print', 'Photography Print', 'Illustration', 
                     'Poster', 'Canvas Print', 'Lithograph', 'Etching', 'Woodcut Print', 'Linocut', 
                     'Screen Print', 'Abstract Print', 'Botanical Print', 'Geometric Art'],
            'adjectives': ['Original', 'Limited Edition', 'Vintage', 'Modern', 'Abstract', 'Realistic', 
                          'Minimalist', 'Colorful', 'Monochrome', 'Botanical', 'Geometric', 'Surreal'],
            'materials': ['Paper', 'Canvas', 'Metal', 'Wood', 'Acrylic'],
            'price_range': (15, 120),
            'image_keywords': ['art', 'painting', 'abstract', 'canvas', 'print', 'illustration', 'design', 'creative']
        },
        'clothing': {
            'items': ['Sweater', 'Jacket', 'Dress', 'Bag', 'Hat', 'Scarf', 'Shawl', 'Socks', 
                     'Gloves', 'Belt', 'Vest', 'Cardigan', 'Blouse', 'Skirt'],
            'adjectives': ['Hand-knitted', 'Hand-sewn', 'Vintage', 'Bohemian', 'Modern', 'Classic', 
                          'Casual', 'Elegant', 'Rustic', 'Artisan', 'Embroidered', 'Patchwork'],
            'materials': ['Wool', 'Cotton', 'Linen', 'Cashmere', 'Silk', 'Denim', 'Leather', 
                         'Handwoven', 'Organic', 'Alpaca', 'Bamboo'],
            'price_range': (25, 200),
            'image_keywords': ['clothing', 'fashion', 'sweater', 'jacket', 'dress', 'apparel', 'style', 'textile']
        },
        'kitchen': {
            'items': ['Cutting Board', 'Dinnerware Set', 'Utensils', 'Mug', 'Apron', 'Pot Holder', 
                     'Tea Set', 'Serving Tray', 'Bowl Set', 'Plate Set', 'Salt Shaker', 'Pepper Mill', 
                     'Knife Set', 'Food Storage', 'Bread Box'],
            'adjectives': ['Handcrafted', 'Artisan', 'Vintage', 'Modern', 'Rustic', 'Farmhouse', 
                          'Minimalist', 'Traditional', 'Japanese', 'Scandinavian'],
            'materials': ['Wood', 'Ceramic', 'Glass', 'Stainless Steel', 'Bamboo', 'Stone', 
                         'Clay', 'Porcelain', 'Cast Iron'],
            'price_range': (18, 180),
            'image_keywords': ['kitchen', 'cooking', 'dining', 'cutting', 'board', 'utensils', 'tableware', 'ceramic']
        },
        'toys_games': {
            'items': ['Puzzle', 'Doll', 'Board Game', 'Stuffed Animal', 'Toy Car', 'Building Blocks', 
                     'Puppet', 'Rattle', 'Marbles', 'Yo-yo', 'Spinning Top', 'Kaleidoscope', 
                     'Music Box', 'Dollhouse', 'Train Set'],
            'adjectives': ['Handmade', 'Vintage', 'Educational', 'Classic', 'Wooden', 'Fabric', 
                          'Eco-friendly', 'Traditional', 'Artisan', 'Unique', 'Custom'],
            'materials': ['Wood', 'Fabric', 'Wool', 'Cotton', 'Plastic', 'Metal'],
            'price_range': (15, 150),
            'image_keywords': ['toys', 'games', 'puzzle', 'doll', 'wooden', 'toy', 'children', 'play']
        },
        'garden': {
            'items': ['Plant Pot', 'Garden Tool', 'Birdhouse', 'Windmill', 'Garden Sign', 
                     'Plant Marker', 'Watering Can', 'Garden Statue', 'Hanging Planter', 
                     'Trellis', 'Plant Stand', 'Seed Starter', 'Garden Bench', 'Solar Light'],
            'adjectives': ['Hand-painted', 'Handcrafted', 'Vintage', 'Rustic', 'Modern', 
                          'Decorative', 'Functional', 'Artisan', 'Ceramic', 'Terracotta'],
            'materials': ['Clay', 'Wood', 'Metal', 'Ceramic', 'Terracotta', 'Stone', 'Resin'],
            'price_range': (12, 120),
            'image_keywords': ['garden', 'plant', 'pot', 'outdoor', 'nature', 'terracotta', 'flower', 'green']
        },
        'stationery': {
            'items': ['Journal', 'Pen Set', 'Notebook', 'Bookmark', 'Sticker Set', 'Greeting Card', 
                     'Pen Holder', 'Desk Organizer', 'Sticky Notes', 'Washi Tape', 'Stamps', 
                     'Ink Set', 'Writing Set', 'Sketchbook'],
            'adjectives': ['Handbound', 'Handmade', 'Vintage', 'Modern', 'Minimalist', 'Artisan', 
                          'Leather', 'Hand-stitched', 'Custom', 'Unique'],
            'materials': ['Leather', 'Paper', 'Wood', 'Metal', 'Fabric', 'Cardboard'],
            'price_range': (8, 95),
            'image_keywords': ['notebook', 'journal', 'paper', 'writing', 'pen', 'stationery', 'office', 'desk']
        },
        'pet_accessories': {
            'items': ['Pet Bandana', 'Pet Toy', 'Pet Bed', 'Pet Collar', 'Pet Leash', 'Pet Bowl', 
                     'Pet Tag', 'Scratching Post', 'Cat Tree', 'Dog Coat', 'Pet Treat Jar', 
                     'Pet Mat', 'Pet Blanket'],
            'adjectives': ['Handmade', 'Custom', 'Personalized', 'Colorful', 'Durable', 'Soft', 
                          'Vintage', 'Modern', 'Cozy'],
            'materials': ['Fabric', 'Leather', 'Wood', 'Cotton', 'Fleece', 'Rope'],
            'price_range': (10, 85),
            'image_keywords': ['pet', 'dog', 'cat', 'animal', 'collar', 'toy', 'bed', 'accessories']
        },
        'bath_body': {
            'items': ['Soap', 'Candle', 'Bath Bomb', 'Lotion', 'Scrub', 'Body Oil', 'Face Mask', 
                     'Lip Balm', 'Hand Cream', 'Shampoo Bar', 'Body Wash', 'Bath Salts', 
                     'Diffuser', 'Aromatherapy'],
            'adjectives': ['Handmade', 'Natural', 'Organic', 'Artisan', 'Luxurious', 'Vegan', 
                          'Eco-friendly', 'Scented', 'Unscented', 'Custom'],
            'materials': ['Natural', 'Organic', 'Essential Oils', 'Shea Butter', 'Coconut Oil'],
            'price_range': (8, 65),
            'image_keywords': ['soap', 'candle', 'bath', 'spa', 'wellness', 'natural', 'organic', 'aromatherapy']
        },
        'tech_accessories': {
            'items': ['Phone Case', 'Laptop Sleeve', 'Cable Organizer', 'Tablet Stand', 'Desk Mat', 
                     'Monitor Stand', 'Headphone Stand', 'Phone Stand', 'USB Hub', 'Wireless Charger', 
                     'Keyboard Wrist Rest', 'Mouse Pad'],
            'adjectives': ['Handcrafted', 'Leather', 'Wooden', 'Minimalist', 'Modern', 'Elegant', 
                          'Custom', 'Artisan', 'Personalized'],
            'materials': ['Leather', 'Wood', 'Fabric', 'Silicone', 'Metal', 'Bamboo'],
            'price_range': (15, 150),
            'image_keywords': ['phone', 'laptop', 'tech', 'accessories', 'electronic', 'gadget', 'device', 'modern']
        },
        'vintage': {
            'items': ['Vintage Clock', 'Antique Mirror', 'Retro Lamp', 'Vintage Camera', 'Old Book', 
                     'Vintage Jewelry Box', 'Antique Vase', 'Retro Radio', 'Vintage Poster', 
                     'Antique Frame', 'Vintage Typewriter', 'Old Map', 'Vintage Record', 
                     'Antique Compass'],
            'adjectives': ['Vintage', 'Antique', 'Retro', 'Classic', 'Collectible', 'Rare', 
                          'Authentic', 'Restored', 'Original'],
            'materials': ['Metal', 'Wood', 'Glass', 'Brass', 'Leather', 'Paper'],
            'price_range': (25, 300),
            'image_keywords': ['vintage', 'antique', 'retro', 'classic', 'old', 'collectible', 'nostalgia', 'timeless']
        }
    }
    
    # Description templates
    description_templates = [
        "Beautiful {adjective} {item} made with {material}. Each piece is unique and handcrafted with attention to detail. Perfect for {use_case}.",
        "{adjective} {item} crafted from premium {material}. This one-of-a-kind piece adds charm to any space. Carefully made by hand.",
        "Stunning {adjective} {item} featuring {material} construction. Meticulously handcrafted for quality and durability. A special piece for your collection.",
        "{adjective} {item} made with care and precision. Each {material} element is thoughtfully designed. Ideal for {use_case}.",
        "Unique {adjective} {item} featuring {material} details. Handcrafted with love and attention to detail. Makes a perfect gift.",
        "Elegant {adjective} {item} crafted from {material}. This artisan piece showcases traditional techniques with modern appeal.",
        "{adjective} {item} made from sustainable {material}. Each piece is carefully finished by hand. Available in multiple {variations}.",
        "Exquisite {adjective} {item} featuring {material} construction. Handmade with traditional methods. Perfect addition to any collection.",
        "Beautifully crafted {adjective} {item} made from premium {material}. Each piece is unique with natural variations. Ideal for {use_case}.",
        "{adjective} {item} handcrafted from {material}. This special piece combines functionality with artistic beauty. Carefully made by skilled artisans."
    ]
    
    use_cases = [
        "your home", "gifting", "everyday use", "special occasions", "your collection",
        "decorating", "daily life", "special moments", "your space", "home styling"
    ]
    
    variations = [
        "colors", "sizes", "styles", "finishes", "designs", "patterns", "shapes"
    ]
    
    products = []
    product_count = 1000
    user_ids = list(range(1, 122))  # 121 users (1 demo + 120 generated)
    
    # Track product index for unique image generation
    product_index_counter = 0
    
    # Distribute products across categories
    category_items = list(categories.items())
    products_per_category = product_count // len(category_items)
    remainder = product_count % len(category_items)
    
    for cat_idx, (cat_name, cat_data) in enumerate(category_items):
        num_items = products_per_category + (1 if cat_idx < remainder else 0)
        
        for _ in range(num_items):
            # Generate unique product name
            adjective = random.choice(cat_data['adjectives'])
            item = random.choice(cat_data['items'])
            name = f"{adjective} {item}"
            
            # Ensure name doesn't exceed 50 characters (database constraint)
            if len(name) > 50:
                name = name[:47] + "..."
            
            # Generate description
            material = random.choice(cat_data['materials'])
            use_case = random.choice(use_cases)
            variation = random.choice(variations)
            template = random.choice(description_templates)
            description = template.format(
                adjective=adjective.lower(),
                item=item.lower(),
                material=material.lower(),
                use_case=use_case,
                variations=variation
            )
            
            # Ensure description doesn't exceed 255 characters
            if len(description) > 255:
                description = description[:252] + "..."
            
            # Generate price
            min_price, max_price = cat_data['price_range']
            # Add some decimal variation
            price = round(random.uniform(min_price, max_price), 2)
            
            # Generate dates (1-365 days ago)
            days_ago = random.randint(1, 365)
            create_date = today - timedelta(days=days_ago)
            # Update date can be same or up to 30 days later
            update_date = create_date + timedelta(days=random.randint(0, 30))
            # Ensure update date doesn't exceed today
            if update_date > today:
                update_date = today
            
            # Generate image URL - use multiple APIs for reliability
            # Create unique seed for this product to ensure variety
            seed_value = f"{name}{days_ago}{price}"
            image = get_product_image(category_name=cat_name, item_name=item, seed_value=seed_value, product_index=product_index_counter)
            product_index_counter += 1
            
            # Assign to random user
            owner_id = random.choice(user_ids)
            
            product = Product(
                name=name,
                description=description,
                image=image,
                price=price,
                create_at=create_date,
                update_at=update_date,
                owner_id=owner_id
            )
            products.append(product)
    
    # Shuffle products for more realistic distribution
    random.shuffle(products)
    
    # Batch insert for better performance
    batch_size = 100
    for i in range(0, len(products), batch_size):
        batch = products[i:i + batch_size]
        for product in batch:
            db.session.add(product)
        db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()