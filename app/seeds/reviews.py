from app.models import db, Review
from random import randint

def seed_reviews():
    r1 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=1,
        user_id=2
    )
    r2 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=1,
        user_id=3
    )
    r3 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=2,
        user_id=2
    )
    r4 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=2,
        user_id=3
    )
    r5 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=3,
        user_id=2
    )
    r6 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=3,
        user_id=3
    )
    r7 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=4,
        user_id=2
    )
    r8 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=4,
        user_id=3
    )
    r9 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=5,
        user_id=2
    )
    r10 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=5,
        user_id=3
    )
    r11 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=6,
        user_id=2
    )
    r12 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=6,
        user_id=3
    )
    r13 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=7,
        user_id=2
    )
    r14 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=7,
        user_id=3
    )
    r15 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=8,
        user_id=2
    )
    r16 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=8,
        user_id=3
    )
    r17 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=9,
        user_id=2
    )
    r18 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=9,
        user_id=3
    )
    r19 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=10,
        user_id=2
    )
    r20 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=10,
        user_id=3
    )

    r21 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=11,
        user_id=1
    )
    r22 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=11,
        user_id=3
    )
    r23 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=12,
        user_id=1
    )
    r24 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=12,
        user_id=3
    )
    r25 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=13,
        user_id=1
    )
    r26 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=13,
        user_id=3
    )
    r27 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=14,
        user_id=1
    )
    r28 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=14,
        user_id=3
    )
    r29 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=15,
        user_id=1
    )
    r30 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=15,
        user_id=3
    )
    r31 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=16,
        user_id=1
    )
    r32 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=16,
        user_id=3
    )
    r33 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=17,
        user_id=1
    )
    r34 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=17,
        user_id=3
    )
    r35 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=18,
        user_id=1
    )
    r36 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=18,
        user_id=3
    )
    r37 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=19,
        user_id=1
    )
    r38 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=19,
        user_id=3
    )
    r39 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=20,
        user_id=1
    )
    r40 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=20,
        user_id=3
    )
    r41 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=21,
        user_id=1
    )
    r42 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=21,
        user_id=2
    )
    r43 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=22,
        user_id=1
    )
    r44 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=22,
        user_id=2
    )
    r45 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=23,
        user_id=1
    )
    r46 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=23,
        user_id=2
    )
    r47 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=24,
        user_id=1
    )
    r48 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=24,
        user_id=2
    )
    r49 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=25,
        user_id=1
    )
    r50 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=25,
        user_id=2
    )
    r51 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=26,
        user_id=1
    )
    r52 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=26,
        user_id=2
    )
    r53 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=27,
        user_id=1
    )
    r54 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=27,
        user_id=2
    )
    r55 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=28,
        user_id=1
    )
    r56 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=28,
        user_id=2
    )
    r57 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=29,
        user_id=1
    )
    r58 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=29,
        user_id=2
    )
    r59 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=30,
        user_id=1
    )
    r60 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Semper risus in hendrerit gravida.',
        product_id=30,
        user_id=2
    )

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)
    db.session.add(r6)
    db.session.add(r7)
    db.session.add(r8)
    db.session.add(r9)
    db.session.add(r10)
    db.session.add(r11)
    db.session.add(r12)
    db.session.add(r13)
    db.session.add(r14)
    db.session.add(r15)
    db.session.add(r16)
    db.session.add(r17)
    db.session.add(r18)
    db.session.add(r19)
    db.session.add(r20)
    db.session.add(r21)
    db.session.add(r22)
    db.session.add(r23)
    db.session.add(r24)
    db.session.add(r25)
    db.session.add(r26)
    db.session.add(r27)
    db.session.add(r28)
    db.session.add(r29)
    db.session.add(r30)
    db.session.add(r31)
    db.session.add(r32)
    db.session.add(r33)
    db.session.add(r34)
    db.session.add(r35)
    db.session.add(r36)
    db.session.add(r37)
    db.session.add(r38)
    db.session.add(r39)
    db.session.add(r40)
    db.session.add(r41)
    db.session.add(r42)
    db.session.add(r43)
    db.session.add(r44)
    db.session.add(r45)
    db.session.add(r46)
    db.session.add(r47)
    db.session.add(r48)
    db.session.add(r49)
    db.session.add(r50)
    db.session.add(r51)
    db.session.add(r52)
    db.session.add(r53)
    db.session.add(r54)
    db.session.add(r55)
    db.session.add(r56)
    db.session.add(r57)
    db.session.add(r58)
    db.session.add(r59)
    db.session.add(r60)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
