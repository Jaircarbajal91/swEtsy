from app.models import db, Review, Product
from random import choice, randint
from datetime import datetime, timedelta
import random

def seed_reviews():
    """Create realistic, high-quality reviews with varied star ratings and dates"""
    
    random.seed(42)  # For reproducibility
    
    # Expanded review templates with 50+ variations per rating
    review_templates = {
        5: [
            "Absolutely love this! The quality exceeded my expectations and shipping was super fast.",
            "Perfect! Exactly as described and beautifully crafted. Will definitely order again.",
            "Amazing product! The attention to detail is incredible. Highly recommend!",
            "Outstanding quality and craftsmanship. This is exactly what I was looking for.",
            "Beautiful work! The seller was very responsive and the product arrived quickly.",
            "Exceptional quality! This is a true work of art. Worth every penny.",
            "Love it! The quality is fantastic and it looks even better in person.",
            "Perfect! Fast shipping and excellent communication. Highly satisfied.",
            "Amazing! The craftsmanship is top-notch and the product is exactly as pictured.",
            "Outstanding! Great quality, fast shipping, and excellent customer service.",
            "Incredible product! I'm so impressed with the quality and attention to detail. Five stars!",
            "Absolutely perfect! This item exceeded all my expectations. Beautifully made.",
            "Stunning work! The seller clearly takes pride in their craft. Highly recommended!",
            "Best purchase I've made! Quality is exceptional and it arrived perfectly packaged.",
            "Wonderful product! Exactly what I needed and so well-made. Will buy again!",
            "Gorgeous item! The craftsmanship is outstanding. Worth every single penny.",
            "Perfect quality! I'm so happy with this purchase. Fast shipping too!",
            "Beautiful and well-crafted! This exceeded my expectations completely. Love it!",
            "Excellent product! High quality materials and beautiful design. Very satisfied.",
            "Amazing craftsmanship! This is exactly as described and even better in person.",
            "Outstanding work! The seller is clearly talented. This is a special piece.",
            "Perfect in every way! Quality, shipping, communication - all excellent. Highly recommend!",
            "Absolutely beautiful! I can't believe how well-made this is. Exceeded expectations.",
            "Incredible quality for the price! This is a true artisan piece. Love it!",
            "Stunning craftsmanship! The attention to detail is remarkable. Five stars!",
            "Perfect purchase! Quality is top-notch and it arrived quickly. Very happy!",
            "Beautiful work! This item is even better than I imagined. Highly satisfied.",
            "Excellent quality! Well-made and exactly as described. Would definitely order again.",
            "Outstanding product! Fast shipping, great communication, perfect item. Five stars!",
            "Amazing quality! This is a true work of art. Worth every penny and more.",
            "Gorgeous item! The craftsmanship is exceptional. This is a keeper!",
            "Perfect! High quality, beautiful design, fast shipping. Everything was great!",
            "Incredible piece! The quality far exceeds what I expected. Very impressed!",
            "Absolutely stunning! Beautiful craftsmanship and excellent seller communication.",
            "Wonderful product! Quality materials and perfect execution. Highly recommend!",
            "Excellent work! This item is beautifully made and exceeded my expectations.",
            "Perfect quality! Fast shipping and the item is exactly as described. Love it!",
            "Amazing craftsmanship! This is a special piece that I'll treasure. Five stars!",
            "Outstanding product! Well-made, beautiful, and arrived quickly. Very satisfied!",
            "Beautiful item! The quality is exceptional and it looks perfect. Highly recommend!",
            "Perfect purchase! This exceeded all my expectations. Quality is top-notch!",
            "Gorgeous work! The seller clearly cares about quality. This is a special piece.",
            "Excellent quality! Beautiful design and fast shipping. Would buy again!",
            "Incredible craftsmanship! This item is even better in person. Worth every penny!",
            "Stunning product! Quality materials and beautiful design. Highly satisfied!",
            "Perfect item! Well-made, exactly as described, and arrived quickly. Five stars!",
            "Amazing quality! This is exactly what I was looking for. Exceeded expectations!",
            "Beautiful work! The craftsmanship is outstanding. This is a keeper!",
            "Outstanding product! Fast shipping, great communication, perfect quality. Love it!",
            "Excellent craftsmanship! This item is beautifully made and exceeds expectations.",
            "Perfect purchase! Quality, design, shipping - everything was excellent. Highly recommend!"
        ],
        4: [
            "Very nice product! Good quality and arrived on time. Would recommend.",
            "Great item! Minor issue with packaging but the product itself is lovely.",
            "Good quality overall. Shipping took a bit longer than expected but worth the wait.",
            "Nice product! Quality is good, though slightly different from the photo.",
            "Solid purchase! Good value for money and arrived in good condition.",
            "Pretty good! The quality is decent and it serves its purpose well.",
            "Good product overall. Minor imperfections but still very usable.",
            "Nice item! Good craftsmanship, though the color is slightly different than expected.",
            "Decent quality! Arrived on time and looks good. Happy with the purchase.",
            "Good buy! The product is well-made and functional. Would consider buying again.",
            "Nice product overall! Quality is good with minor variations. Still happy with it.",
            "Good item! Works as expected though shipping was a bit slow. Would recommend.",
            "Solid quality! Minor issue but overall a good purchase. Good value for money.",
            "Pretty good product! Quality is decent and it looks nice. Happy with purchase.",
            "Nice craftsmanship! Good quality overall, though there was a small delay in shipping.",
            "Good product! Quality is acceptable and it arrived in good condition. Satisfied.",
            "Decent purchase! The item works well though it's slightly different than pictured.",
            "Nice work! Quality is good overall. Minor imperfections but still usable.",
            "Good value! Quality is decent and shipping was reasonable. Would consider again.",
            "Pretty solid product! Quality is good though it could be slightly better.",
            "Nice item overall! Good craftsmanship with minor variations. Still satisfied.",
            "Good purchase! Quality is acceptable and it serves its purpose well.",
            "Decent quality! The product works as expected though there are minor issues.",
            "Good product! Quality is decent overall. Arrived on time and looks nice.",
            "Nice work! Good craftsmanship though the finish could be slightly better.",
            "Solid item! Quality is acceptable and it arrived in good condition. Satisfied.",
            "Good buy overall! Quality is decent though shipping took longer than expected.",
            "Nice product! Good quality with minor imperfections. Still happy with it.",
            "Decent purchase! Quality is acceptable though it's slightly different than described.",
            "Good item! Quality is decent and functional. Would consider buying again.",
            "Pretty good product! Quality is acceptable and it looks nice. Satisfied.",
            "Nice craftsmanship! Good quality overall though there were minor delays.",
            "Good product! Quality is decent though it could be slightly improved.",
            "Solid purchase! Quality is acceptable and it arrived on time. Happy with it.",
            "Nice work! Quality is good though there are minor imperfections. Still usable.",
            "Good value! Quality is decent and functional. Would recommend with minor reservations.",
            "Decent product! Quality is acceptable though shipping was slower than expected.",
            "Nice item! Good craftsmanship with minor variations. Still satisfied overall.",
            "Good purchase! Quality is decent though it's slightly different than pictured.",
            "Pretty solid! Quality is acceptable and it works as expected. Happy with it.",
            "Nice product overall! Good quality with minor issues. Still would recommend.",
            "Good item! Quality is decent though there were minor shipping delays.",
            "Decent quality! The product works well though it could be slightly better.",
            "Good buy! Quality is acceptable and it arrived in good condition. Satisfied.",
            "Nice work! Good craftsmanship though the finish has minor imperfections.",
            "Good product! Quality is decent overall. Would consider buying again.",
            "Solid purchase! Quality is acceptable though shipping took a bit longer.",
            "Nice item! Good quality with minor variations. Still happy with purchase.",
            "Good value! Quality is decent and functional. Would recommend with reservations.",
            "Decent product! Quality is acceptable though it's slightly different than expected.",
            "Nice craftsmanship! Good quality overall. Minor issues but still satisfied."
        ],
        3: [
            "Okay product. Quality is average but it works as expected.",
            "Decent item. Nothing spectacular but it does what it's supposed to do.",
            "Average quality. The product works but could be better for the price.",
            "It's okay. Not amazing but not terrible either. Gets the job done.",
            "Fair quality. The product is functional but has some minor issues.",
            "Average purchase. The item works but doesn't exceed expectations.",
            "Okay for the price. Quality is acceptable but not outstanding.",
            "Decent product. It works fine but could use some improvements.",
            "Average quality. The item serves its purpose but nothing special.",
            "Fair product. It works as described but quality could be better.",
            "Mediocre quality. The product works but feels a bit cheap.",
            "Average item. Nothing wrong with it but nothing exceptional either.",
            "Okay purchase. Quality is acceptable though it could be improved.",
            "Decent for the price. Quality is average and it works as expected.",
            "Average product. It serves its purpose but could be better quality.",
            "Fair quality overall. The item works though it has minor issues.",
            "Okay item. Quality is acceptable but not impressive. Does the job.",
            "Average purchase. Nothing special but it works as described.",
            "Decent quality. The product is functional though it could be better.",
            "Mediocre work. Quality is average and shipping was slower than expected.",
            "Okay product. Quality is acceptable though it doesn't stand out.",
            "Average item. It works but the quality is just average.",
            "Fair purchase. Quality is acceptable though it could be improved.",
            "Decent for what it is. Quality is average and it serves its purpose.",
            "Okay quality. The product works though it has some minor imperfections.",
            "Average product. Nothing exceptional but it does what it's supposed to do.",
            "Mediocre quality. The item works but feels average at best.",
            "Okay purchase. Quality is acceptable though shipping was a bit slow.",
            "Decent item. Quality is average and it works as expected.",
            "Fair product. It works though the quality could be better.",
            "Average quality. The item serves its purpose but nothing special.",
            "Okay for the price. Quality is acceptable but not outstanding.",
            "Decent purchase. Quality is average though it could be improved.",
            "Mediocre quality. The product works but doesn't exceed expectations.",
            "Average item. Quality is acceptable though it has minor issues.",
            "Okay product. It works as described but quality is just average.",
            "Fair quality. The item is functional though it could be better.",
            "Decent purchase. Quality is acceptable but nothing exceptional.",
            "Average product. It works though the quality is just average.",
            "Okay item. Quality is acceptable though it doesn't stand out.",
            "Mediocre quality. The product works but feels average.",
            "Decent for the price. Quality is acceptable though it could be better.",
            "Average purchase. It works as expected but quality is just average.",
            "Okay quality. The item serves its purpose though it's nothing special.",
            "Fair product. Quality is acceptable but could be improved.",
            "Mediocre work. The product works though quality is average.",
            "Okay purchase. Quality is acceptable but doesn't exceed expectations.",
            "Average item. It works though the quality is just average.",
            "Decent product. Quality is acceptable though it could be better.",
            "Mediocre quality. The item works but feels average at best."
        ],
        2: [
            "Disappointed with the quality. The product doesn't match the description.",
            "Not great. The quality is poor and it arrived damaged.",
            "Below expectations. The product is not as described and feels cheap.",
            "Poor quality. The item arrived with defects and doesn't work properly.",
            "Not satisfied. The product is overpriced for what you get.",
            "Disappointing purchase. The quality is much lower than expected.",
            "Not good. The product arrived damaged and the seller was unresponsive.",
            "Poor experience. The item doesn't match the photos and feels flimsy.",
            "Disappointed. The quality is subpar and not worth the money.",
            "Not recommended. The product is cheaply made and doesn't last.",
            "Poor quality overall. The item doesn't meet expectations and arrived damaged.",
            "Disappointing product. Quality is much lower than described and feels cheap.",
            "Not satisfied at all. The item arrived damaged and quality is poor.",
            "Below expectations. The product is not as advertised and quality is low.",
            "Poor purchase. The item doesn't work properly and quality is subpar.",
            "Disappointed with this. Quality is poor and it doesn't match the description.",
            "Not good quality. The product arrived damaged and feels cheaply made.",
            "Poor experience overall. Item doesn't match photos and quality is low.",
            "Disappointing quality. The product is not worth the price and arrived damaged.",
            "Not recommended. Quality is poor and the item doesn't work as expected.",
            "Poor quality item. Doesn't meet expectations and arrived with defects.",
            "Disappointed. The product is overpriced and quality is much lower than expected.",
            "Not satisfied. Quality is poor and the item doesn't match the description.",
            "Poor purchase. The product arrived damaged and quality is subpar.",
            "Below expectations. Item doesn't work properly and quality is low.",
            "Disappointing quality. The product is not as described and feels cheap.",
            "Not good purchase. Quality is poor and the item arrived damaged.",
            "Poor experience. The product doesn't match photos and quality is low.",
            "Disappointed with quality. Item is overpriced and doesn't work properly.",
            "Not recommended at all. Quality is poor and product doesn't meet expectations.",
            "Poor quality overall. The item arrived damaged and doesn't work as expected.",
            "Disappointing purchase. Quality is much lower than described and feels cheap.",
            "Not satisfied. The product doesn't match the description and quality is poor.",
            "Poor product. Item arrived damaged and quality is subpar.",
            "Below expectations. Quality is low and the product doesn't work properly.",
            "Disappointing quality. The item is not worth the price and arrived damaged.",
            "Not good quality. Product doesn't match description and feels cheaply made.",
            "Poor experience. The item doesn't work properly and quality is low.",
            "Disappointed. The product is overpriced and quality is much lower than expected.",
            "Not recommended. Quality is poor and the item doesn't meet expectations.",
            "Poor quality item. Doesn't work properly and arrived with defects.",
            "Disappointing purchase. Quality is low and product doesn't match description.",
            "Not satisfied at all. The item arrived damaged and quality is subpar.",
            "Poor product. Quality is much lower than expected and doesn't work properly.",
            "Below expectations. Item doesn't match photos and quality is poor.",
            "Disappointing quality. The product is not as described and arrived damaged.",
            "Not good purchase. Quality is poor and item doesn't work as expected.",
            "Poor experience overall. Product doesn't meet expectations and quality is low.",
            "Disappointed with this. Quality is subpar and item doesn't match description.",
            "Not recommended. The product is cheaply made and quality is poor."
        ],
        1: [
            "Terrible quality. The product arrived broken and unusable.",
            "Waste of money. The item is completely different from the description.",
            "Awful experience. The product is defective and the seller won't respond.",
            "Horrible quality. The item fell apart immediately after use.",
            "Complete disappointment. The product is not as advertised at all.",
            "Terrible purchase. The item is broken and the seller is unhelpful.",
            "Worst purchase ever. The product is unusable and overpriced.",
            "Awful quality. The item arrived damaged and is completely useless.",
            "Terrible experience. The product doesn't work and customer service is poor.",
            "Complete waste. The item is broken and the seller refuses to help.",
            "Absolutely terrible! The product arrived completely broken and unusable. Waste of money.",
            "Worst purchase I've ever made. Item is defective and seller won't respond.",
            "Horrible quality! The product fell apart immediately and doesn't work at all.",
            "Complete waste of money. The item is broken and completely different from description.",
            "Terrible experience! Product is unusable and seller is completely unhelpful.",
            "Awful quality. The item arrived damaged beyond repair and is completely useless.",
            "Worst product ever! Broken on arrival and seller refuses to help or refund.",
            "Terrible purchase. Item is completely defective and doesn't work at all.",
            "Horrible experience. Product is not as advertised and arrived completely broken.",
            "Complete disappointment. Item is unusable and seller won't respond to messages.",
            "Absolutely terrible quality! The product broke immediately and is worthless.",
            "Worst purchase I've made. Item is completely defective and seller is unresponsive.",
            "Horrible quality! Product arrived broken and doesn't work at all. Waste of money.",
            "Complete waste. Item is unusable and completely different from what was described.",
            "Terrible experience! Product is broken and seller refuses to help or replace.",
            "Awful purchase. Item arrived damaged beyond repair and is completely useless.",
            "Worst quality ever! Product fell apart immediately and doesn't function.",
            "Terrible product. Item is completely broken and seller won't respond.",
            "Horrible purchase! Product is defective and arrived in unusable condition.",
            "Complete disaster. Item is broken and seller is completely unhelpful.",
            "Absolutely terrible! Product arrived broken and is completely unusable.",
            "Worst experience ever. Item is defective and seller refuses to help.",
            "Horrible quality! Product doesn't work at all and arrived completely broken.",
            "Complete waste of money. Item is unusable and seller won't respond.",
            "Terrible purchase! Product fell apart immediately and is worthless.",
            "Awful quality. Item is completely broken and seller is unresponsive.",
            "Worst product! Item arrived damaged and doesn't work at all. Complete waste.",
            "Terrible experience. Product is completely defective and seller won't help.",
            "Horrible purchase! Item is broken and completely different from description.",
            "Complete disappointment. Product is unusable and seller refuses to respond.",
            "Absolutely terrible quality! Item broke immediately and doesn't function.",
            "Worst purchase ever made. Product is completely defective and unusable.",
            "Horrible experience! Item arrived broken and seller is completely unhelpful.",
            "Complete waste. Product doesn't work at all and is completely broken.",
            "Terrible quality! Item is defective and seller refuses to help or refund.",
            "Awful purchase. Product fell apart immediately and is completely useless.",
            "Worst product I've ever received. Item is broken and seller won't respond.",
            "Terrible experience! Product is unusable and completely different from description.",
            "Horrible quality. Item arrived broken and seller is completely unresponsive.",
            "Complete disaster! Product doesn't work and seller refuses to help.",
            "Absolutely terrible! Item is completely broken and a complete waste of money."
        ]
    }
    
    # Get all products to access their creation dates
    products = Product.query.all()
    total_products = len(products)
    
    if total_products == 0:
        print("No products found. Please seed products first.")
        return
    
    # Get total users for review distribution
    from app.models import User
    total_users = User.query.count()
    
    if total_users == 0:
        print("No users found. Please seed users first.")
        return
    
    reviews = []
    today = datetime.utcnow().date()
    
    # Generate reviews for each product (0-15 reviews per product, average ~5-6)
    for product in products:
        # Realistic review count distribution: some products have many reviews, some have few
        # Use weighted random: 30% chance of 0-2, 40% chance of 3-7, 20% chance of 8-12, 10% chance of 13-15
        rand = random.randint(1, 100)
        if rand <= 15:
            num_reviews = 0
        elif rand <= 35:
            num_reviews = random.randint(1, 2)
        elif rand <= 75:
            num_reviews = random.randint(3, 7)
        elif rand <= 95:
            num_reviews = random.randint(8, 12)
        else:
            num_reviews = random.randint(13, 15)
        
        reviewed_users = set()
        
        for _ in range(num_reviews):
            # Ensure each user only reviews each product once
            # Also ensure user doesn't review their own product
            attempts = 0
            while attempts < 100:
                user_id = random.randint(1, total_users)
                # Make sure user doesn't review their own product
                if user_id != product.owner_id and user_id not in reviewed_users:
                    reviewed_users.add(user_id)
                    break
                attempts += 1
            
            if attempts >= 100:
                # Couldn't find a valid user, skip this review
                continue
            
            # Determine star rating based on realistic distribution
            # 65% 5-star, 20% 4-star, 10% 3-star, 3% 2-star, 2% 1-star
            rand_star = random.randint(1, 100)
            if rand_star <= 65:
                stars = 5
            elif rand_star <= 85:
                stars = 4
            elif rand_star <= 95:
                stars = 3
            elif rand_star <= 98:
                stars = 2
            else:
                stars = 1
            
            review_body = random.choice(review_templates[stars])
            
            # Generate review date between product creation and today
            product_create_date = product.create_at
            if isinstance(product_create_date, datetime):
                product_create_date = product_create_date.date()
            
            # Calculate days between product creation and today
            days_since_creation = (today - product_create_date).days
            
            if days_since_creation > 0:
                # Review date can be anywhere from product creation to today
                review_days_ago = random.randint(0, days_since_creation)
                review_date = today - timedelta(days=review_days_ago)
                created_at = datetime.combine(review_date, datetime.min.time())
            else:
                # Product was created today, use current time
                created_at = datetime.utcnow()
            
            review = Review(
                stars=stars,
                review_body=review_body,
                product_id=product.id,
                user_id=user_id,
                created_at=created_at
            )
            reviews.append(review)
    
    # Batch insert for better performance
    batch_size = 100
    for i in range(0, len(reviews), batch_size):
        batch = reviews[i:i + batch_size]
        for review in batch:
            db.session.add(review)
        db.session.commit()
    
    print(f"Created {len(reviews)} reviews for {total_products} products")

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
