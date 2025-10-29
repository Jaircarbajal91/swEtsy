from app.models import db, Review
from random import choice, randint

def seed_reviews():
    """Create realistic, high-quality reviews with consistent star ratings"""
    
    # Define review templates with appropriate star ratings
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
            "Outstanding! Great quality, fast shipping, and excellent customer service."
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
            "Good buy! The product is well-made and functional. Would consider buying again."
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
            "Fair product. It works as described but quality could be better."
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
            "Not recommended. The product is cheaply made and doesn't last."
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
            "Complete waste. The item is broken and the seller refuses to help."
        ]
    }
    
    # Create reviews with realistic patterns
    reviews = []
    
    # Generate reviews for each product (2-4 reviews per product)
    for product_id in range(1, 21):  # 20 products
        num_reviews = randint(2, 4)
        reviewed_users = set()
        
        for _ in range(num_reviews):
            # Ensure each user only reviews each product once
            while True:
                user_id = randint(1, 10)
                if user_id not in reviewed_users:
                    reviewed_users.add(user_id)
                    break
            
            # Determine star rating based on realistic distribution
            # 60% 5-star, 25% 4-star, 10% 3-star, 3% 2-star, 2% 1-star
            rand = randint(1, 100)
            if rand <= 60:
                stars = 5
            elif rand <= 85:
                stars = 4
            elif rand <= 95:
                stars = 3
            elif rand <= 98:
                stars = 2
            else:
                stars = 1
            
            review_body = choice(review_templates[stars])
            
            review = Review(
                stars=stars,
                review_body=review_body,
                product_id=product_id,
                user_id=user_id
            )
            reviews.append(review)
    
    # Add some additional detailed reviews for popular products
    detailed_reviews = [
        Review(
            stars=5,
            review_body="This ceramic vase is absolutely stunning! The craftsmanship is incredible and it looks perfect in my living room. The seller was very professional and the packaging was excellent. Highly recommend this artist!",
        product_id=1,
        user_id=3
        ),
        Review(
            stars=4,
            review_body="Beautiful macrame piece! The quality is good and it arrived quickly. The only minor issue was that it was slightly smaller than I expected, but it still looks great on my wall.",
        product_id=2,
            user_id=4
        ),
        Review(
            stars=5,
            review_body="These cutting boards are fantastic! They're well-made, food-safe, and look beautiful in my kitchen. The different sizes are perfect for various cooking tasks. Worth every penny!",
        product_id=3,
            user_id=5
        ),
        Review(
            stars=5,
            review_body="Gorgeous earrings! The silver is high quality and the pearls are beautiful. I've received many compliments when wearing them. The seller's attention to detail is amazing.",
        product_id=4,
            user_id=6
        ),
        Review(
            stars=4,
            review_body="Nice leather wallet! The quality is good and it has plenty of card slots. The RFID blocking feature is a nice bonus. Would recommend for the price.",
        product_id=5,
            user_id=7
        )
    ]
    
    reviews.extend(detailed_reviews)
    
    for review in reviews:
        db.session.add(review)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()