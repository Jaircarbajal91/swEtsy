from app.models import db, Review
from random import randint

def seed_reviews():
    r1 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body='I love the way that this athletic wear looks and feels. The fabric is soft, lightweight, and its really comfortable.',
        product_id=1,
        user_id=2
    )
    r2 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I bought these and four other pairs of leggings at a recent sporting goods store. The only thing I didn't like about these leggings is that they feel a little more thick in the thighs.",
        product_id=1,
        user_id=3
    )
    r3 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I love sportswear and I have a huge collection of leggings. But most of them are just too short and tight. I was really looking forward to getting these leggings. They are the best leggings I've ever owned.",
        product_id=2,
        user_id=2
    )
    r4 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="They fit perfectly, the material is soft, and they are really comfortable.",
        product_id=2,
        user_id=3
    )
    r5 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I bought them in a size smaller than I usually wear because the sizing was a bit off. I wish they had more colors. ",
        product_id=3,
        user_id=2
    )
    r6 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="If you are looking for a pair of leggings that are comfortable and soft, you should give these a try. I hope they work for you as well.",
        product_id=3,
        user_id=3
    )
    r7 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I was looking for a new training wrap to replace my favorite one that I used when I trained for my first ultramarathon. The jogger woven training wraps are comfortable, durable, and easy to wash.",
        product_id=4,
        user_id=2
    )
    r8 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I live on the West coast and it's hard to find good quality, affordable training gear for the winter months.  I started running ultras in January and bought this wrap for my first race, and it does the job! ",
        product_id=4,
        user_id=3
    )
    r9 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I love the medicine balls because they give you a perfect workout. I use them for yoga, cross fit and also strength training. ",
        product_id=5,
        user_id=2
    )
    r10 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="The medicine ball is a great exercise tool for anyone who want to tone up their core and hips.",
        product_id=5,
        user_id=3
    )
    r11 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="The quality is good, and it's soft, but I wouldn't recommend it for weightlifting.  ",
        product_id=6,
        user_id=2
    )
    r12 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I love this! They're the perfect combination of comfort and style.",
        product_id=6,
        user_id=3
    )
    r13 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I ordered a sport t-shirt a few months ago, and it was great.",
        product_id=7,
        user_id=2
    )
    r14 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I've always had a hard time finding workout clothes that fit me well. I don't have an extremely tall body (I'm only 5' 9), but I have a bigger than average build. I was excited to try out the new men workout shorts.",
        product_id=7,
        user_id=3
    )
    r15 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I bought this mat because I wanted the best, most comfortable yoga mat for my back. I was looking for something that would last; something that I could use all the time.",
        product_id=8,
        user_id=2
    )
    r16 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I do yoga at least 3 times a week. While I'm doing it, I always think about how much I love being able to create a comfortable and most of all, safe environment for myself. This mat is one of my favorites.",
        product_id=8,
        user_id=3
    )
    r17 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I've had a few of these mats for years, and I like them. They're the most comfortable mats you can find, and because they're a bit thicker than most, they don't slip on the floor.",
        product_id=9,
        user_id=2
    )
    r18 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="They're also extremely durable and easy to clean. I've had this one for a couple years, and it's held up well.",
        product_id=9,
        user_id=3
    )
    r19 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="This was a gift for my grandson and we have not stopped playing it since he got it home.",
        product_id=10,
        user_id=2
    )
    r20 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="The ball has a high amount of bounce and is very easy to control. My 10-months baby loves it and me too.",
        product_id=10,
        user_id=3
    )

    r21 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="nah I don't like this product, color is off and size is inaccurate!",
        product_id=11,
        user_id=1
    )
    r22 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="The gorilla kettle ball is ideal for both adults and children. It is a fun way to stay hydrated and it has some health benefits.",
        product_id=11,
        user_id=3
    )
    r23 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I've been on a quest to get into shape and have found the dumbbell set to be a great way to get fit.",
        product_id=12,
        user_id=1
    )
    r24 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I've tried to make my own dumbbell set before, but I always ended up with a set that was too heavy or bulky. ",
        product_id=12,
        user_id=3
    )
    r25 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="This set from Amazon is the perfect mix of quality and affordability.",
        product_id=13,
        user_id=1
    )
    r26 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="It's sturdy, flexible and lightweight. I can get in a few sets",
        product_id=13,
        user_id=3
    )
    r27 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I've been looking for a good one for awhile and i must say i'm amazingly satisfied with this one.",
        product_id=14,
        user_id=1
    )
    r28 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body=" It's a very comfortable and stylish item, it's also a little bit unique.",
        product_id=14,
        user_id=3
    )
    r29 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body=" It's a very comfortable and stylish item, it's also a little bit unique.",
        product_id=15,
        user_id=1
    )
    r30 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I've been looking for a good one for awhile and i must say i'm amazingly satisfied with this one.",
        product_id=15,
        user_id=3
    )
    r31 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I was pleasantly surprised when I first unwrapped the package. It's a good quality set of yoga clothes that are comfortable, stylish and fit perfectly.",
        product_id=16,
        user_id=1
    )
    r32 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body=" I am hoping that I will continue to use this set of clothes as my yoga outfit.",
        product_id=16,
        user_id=3
    )
    r33 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body=" I am hoping that I will continue to use this set of clothes as my yoga outfit.",
        product_id=17,
        user_id=1
    )
    r34 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="From one yoga lover to another, I recommend this set of yoga clothes to you!",
        product_id=17,
        user_id=3
    )
    r35 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I love this item. I always go out of my way to buy it for myself when I go shopping. ",
        product_id=18,
        user_id=1
    )
    r36 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I purchased this full track suit on a whim, and I am so glad that I did! This is such a nice item",
        product_id=18,
        user_id=3
    )
    r37 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I usually wear a size 10 in clothing, but I bought a size 12, and it fits great. I love the material, quality and color.",
        product_id=19,
        user_id=1
    )
    r38 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I just got these workout clothes and I really like them. They are pretty basic workout clothes and they are comfortable.",
        product_id=19,
        user_id=3
    )
    r39 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I like it because it provides a great amount of compression, but it's not so tight that it restricts my breathing. I'm usually a size medium, I wear a medium in this and it's perfect.",
        product_id=20,
        user_id=1
    )
    r40 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I bought them for a workout I did at the gym and now I'm wearing them around the house. They are super cute and if you're looking for a subtle workout outfit, this is it.",
        product_id=20,
        user_id=3
    )
    r41 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I bought is a synthetic material and does not get sweaty. It's stretchable and comfortable.",
        product_id=21,
        user_id=1
    )
    r42 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I like the fact that it's got pockets for money, keys, mobile phone, and other small things.",
        product_id=21,
        user_id=2
    )
    r43 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body=" I decided to order a pair online and get them while they are on sale. I received my new shoes in a timely manner and I was very impressed with the quality. ",
        product_id=22,
        user_id=1
    )
    r44 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="They're the best running shoes I've ever had!",
        product_id=22,
        user_id=2
    )
    r45 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I am a runner and I recomment this!",
        product_id=23,
        user_id=1
    )
    r46 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="They're the best running shoes I've ever had",
        product_id=23,
        user_id=2
    )
    r47 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="It really is the best singing headband for women.  ",
        product_id=24,
        user_id=1
    )
    r48 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I love the fact that it is adjustable. It is super comfortable and fits my head perfectly. ",
        product_id=24,
        user_id=2
    )
    r49 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="This is my new obsession for the summer months.",
        product_id=25,
        user_id=1
    )
    r50 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I purchased it for my husband, as he is the one who would be wearing it and it has a lot of cool features.",
        product_id=25,
        user_id=2
    )
    r51 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I don't like this, I mean it literally, I love wearing bras. They are the most comfortable things I wear. ",
        product_id=26,
        user_id=1
    )
    r52 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="My friends don't get it. They think I'm a bra-wearing zombie. This is a backless bra, it looks great on and it's comfortable.",
        product_id=26,
        user_id=2
    )
    r53 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body=" I love all the support that a bra gives me, especially when I do yoga or just go for a run. My sports bra is the best-fitting, most comfortable bra I've ever worn.",
        product_id=27,
        user_id=1
    )
    r54 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="The bra boasts a very high compression level which provides support while doing yoga.",
        product_id=27,
        user_id=2
    )
    r55 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="Yeah, I was going to say that it's a little big, but it's not as bad as I thought. I guess I'll have to get used to it.",
        product_id=28,
        user_id=1
    )
    r56 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="Looking back at the pictures, I can't believe how fat I was. I mean, I know that I'm over weight, but I really thought that I was way heavier than that.",
        product_id=28,
        user_id=2
    )
    r57 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="You may have heard of bench press exercises before, but if you haven't, you need to start now. The bench press is one of the best exercises to develop and strengthen your chest.",
        product_id=29,
        user_id=1
    )
    r58 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I have been lifting weights for many years and have taken various forms and types of weight training classes, and I recommend this.",
        product_id=29,
        user_id=2
    )
    r59 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="I've been using this workout ball to do some cardio and weight training for about 3 months now. I notice that my blood pressure has dropped so I'm much more healthy and a lot happier.",
        product_id=30,
        user_id=1
    )
    r60 = Review(
        stars=randint(1, 5), # assign pseudorandom int between 1 and 5
        review_body="This fitness tracker is easy to use, it attaches to my waistband and tracks my steps, distance, heart rate, and calories burned. I've lost about 15 pounds and noticed a big increase in my energy.",
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
