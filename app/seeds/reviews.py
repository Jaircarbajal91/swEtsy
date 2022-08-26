from app.models import db, Review

def seed_reviews():
    r1 = Review(
        stars=5,
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=1,
        user_id=1
    )
    r2 = Review(
        stars=5,
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=2,
        user_id=2
    )
    r3 = Review(
        stars=1,
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=3,
        user_id=3
    )
    r4 = Review(
        stars=4,
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=1,
        user_id=2
    )
    r5 = Review(
        stars=4,
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=1,
        user_id=3
    )

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
