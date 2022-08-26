from app.models import db, User, Product
from datetime import datetime, date, timedelta

today = date.today()

def seed_products():
    p1 = Product(name='Leggings', description='Black bell bottom leggings',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661494849/swEtsy/2570505_Black_eu2hfa.jpg',price=29.99,create_at=today,update_at=today,owner_id=1)
    p2 = Product(name='Leggings', description="Women's Tek Gear Shapewear Workout Pants",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661494916/yweprfx1pruqgdqvvwwv.jpg',price=35,create_at=today,update_at=today,owner_id=1)
    p3 = Product(name='Leggings', description='Black leggings',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661495204/t6mqpfhnlibpuh9ce8r1.jpg',price=15,create_at=today,update_at=today,owner_id=1)
    p4 = Product(name='Joggers', description='Training Woven Joggers',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661495517/TRAININGWOVENPANTSB1A1D-BBBB-XS-BY1BLACK20.C_ZH_ZH_4d6dd56a-ffe0-4acb-b06d-6cdad669ec40_855x_v4cjs3.jpg',price=45,create_at=today,update_at=today,owner_id=1)
    p5 = Product(name='Medicine ball', description='ProsourceFit Slam Medicine Balls 5Lbs Smooth Textured Grip Dead Weight Balls for Crossfit, Strength & Conditioning Exercises',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661495627/TRAININGWOVENPANTSB1A1D-BBBB-XS-BY1BLACK6.D1_ZH_ZH_d469b371-4d0d-4cbb-bcc5-d51f61643a5f_855x_dhoem2.jpg',price=45,create_at=today,update_at=today,owner_id=1)
    p6 = Product(name='T-Shirt', description='Deadlift Skeleton Shirt, Skeleton Workout Shirt, Crossfit Tee, Bodybuilding Shirt, Gym Shirt, Funny Skull Shirt, Fitness Shirt, Barbell Tee',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661495983/il_794xN.3676949036_bx54_npbnxj.jpg',price=15.99,create_at=today,update_at=today,owner_id=1)
    p7 = Product(name='Mens Workout Shorts', description='Mens Workout Shorts',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661498491/il_794xN.3248707857_u28w_qkor1c.jpg',price=25.49,create_at=today,update_at=today,owner_id=1)
    p8 = Product(name='Yoga Mat', description='Core Yoga Mat',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661498633/kurma_yoga_mat_grip_twilight_swirl_pqyuyh.jpg',price=89.99,create_at=today,update_at=today,owner_id=1)
    p9 = Product(name='Yoga Mat', description='Stretchy Yoga Mat',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661498844/sub-buzz-270-1582138215-2_av4qvo.jpg',price=50,create_at=today,update_at=today,owner_id=1)
    p10 = Product(name='Kettle Ball', description='Kettle Ball Set, 35lbs each',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661498927/pegilak4aw38ymmlgqkl.jpg',price=150.89,create_at=today,update_at=today,owner_id=1)
    p11 = Product(name='Gorilla Kettle Ball', description='Gorilla Kettle Ball, 50lbs',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661499061/1973_ntrqe8.png',price=70.89,create_at=today,update_at=today,owner_id=2)
    p12 = Product(name='Dumbbell Set', description='Dumbbell Set + Rack. 5lbs & 10lbs & 15lbs, ',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661499252/GUEST_3c3e39b1-7388-4366-941a-955fa3d51d70_izf7sw.jpg',price=89.89,create_at=today,update_at=today,owner_id=2)
    p13 = Product(name='Dumbbell Set', description='Adjustable Dumbbells Set-25 lb Dumbbells with Anti-Slip Metal Handle for Exercise & Fitness Fast Adjust Weight for Full Body Workout Fitness, ',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661499549/gxy3ttn2a200j4pohqp7.jpg',price=200.00,create_at=today,update_at=today,owner_id=2)
    p14 = Product(name='Womens Hoodie', description='Womens Workout Hoodie - Womens Gym Fitness Hoodie',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661499839/il_794xN.3666243460_8a4r_hlqdac.jpg',price=29.99,create_at=today,update_at=today,owner_id=2)
    p15 = Product(name='Hoodie', description='Pump Addict Hoodie, Gym Hoodie, Workout Apparel, Workout Hoodies, Gift for her, Gift for him, Sport Hoodie, Body Builder Hoodie',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661499949/il_794xN.3333142641_9ggu_odt5j4.jpg',price=21.79,create_at=today,update_at=today,owner_id=2)
    p16 = Product(name='Womens 2 Piece Yoga Set', description="Women's 2 Pieces Yoga Set, High Waist Leggings with Side Pocket, Criss Cross Yoga Bra",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661500396/il_1140xN.2898692256_e7hg_gxh1tq.jpg',price=39.99,create_at=today,update_at=today,owner_id=2)
    p17 = Product(name='Womens 2 Piece Yoga Set', description="Women's 2 piece yoga set, high waisted seamless gym shorts or leggings w/ padded sports bra Fitness Set Workout Pants Gym Sport Wear lounge",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661500463/il_794xN.3317186219_r517_qwjevf.jpg',price=39.99,create_at=today,update_at=today,owner_id=2)
    p18 = Product(name='Full Track Suit', description="Iron Gods Signature Series Sweatsuit Gym Clothing Tracksuit Workout Apparel Jogger Set",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661500608/il_794xN.3678426768_o5xp_pwb0xn.jpg',price=89.99,create_at=today,update_at=today,owner_id=2)
    p19 = Product(name='Mens Fitness Shorts', description="Men's Fitness Shorts | Workout Shorts | Gym Shorts | 3in inseam - 4in inseam",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661500728/il_794xN.2922505792_nsgm_fy1qhp.jpg',price=28.00,create_at=today,update_at=today,owner_id=2)
    p20 = Product(name='Mens Compression Shirt', description="Men's Compression Shirt | Fitness Shirt | Workout Shirt | Gym Shirt | Muscle Shirt",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661501101/il_794xN.2922608774_lh07_hzky6g.jpg',price=22.00,create_at=today,update_at=today,owner_id=2)
    p21 = Product(name='Womens 3 Piece Tracksuit', description="Women 3 Piece Tracksuit SweatSuit Sets/ Black White High Waist SweatPants& Long Sleeve Crop Top, Set Outfits for Women, Loungewear Sets",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661501640/il_794xN.3509570469_58so_cubddt.jpg',price=77.66,create_at=today,update_at=today,owner_id=3)
    p22 = Product(name='Running Shoes', description="FUJEAK Men Running Shoes Men Casual Breathable Walking Shoes Sport Athletic Sneakers Gym Tennis Slip On Comfortable Lightweight Shoes",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661501843/7186ctiXOFL._AC_UY395__jhgsaf.jpg',price=35.99,create_at=today,update_at=today,owner_id=3)
    p23 = Product(name='Running Shoes', description="BRONAX Men's Tennis Lightweight Athletics Gym Jogging Sneakers",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661502032/91GoWwfgFBL._AC_UX575__ewq219.jpg',price=11.99,create_at=today,update_at=today,owner_id=3)
    p24 = Product(name='Womens Headband', description="Joyfree Workout Headbands for Women Men Sweatband Yoga Sweat Bands Elastic Wide Headbands for Sports Fitness Exercise Tennis Running Gym Dance Athletic",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661502244/61kDDb2YQ_L._AC_SL1000__nreurc.jpg',price=11.99,create_at=today,update_at=today,owner_id=3)
    p25 = Product(name='Mens Headband', description="Joyfree Workout Headbands for Men Sweatband Sweat Bands Elastic Wide Headbands for Sports Fitness Exercise",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661502277/71con9xOkSL._AC_SL1500__jg3cce.jpg',price=11.99,create_at=today,update_at=today,owner_id=3)
    p26 = Product(name='Sports Bra', description="Bamboo Sport Bra, Yoga Sport Bra, White Crop Top, Nude Back Top, Comfy Sport Bra, Handmade, Made in Italy",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661502377/il_794xN.2354626090_4qcb_knirpb.jpg',price=56.44,create_at=today,update_at=today,owner_id=3)
    p27 = Product(name='Yoga Sports Bra', description="Buck&Doey Women's Barrier Yoga Gym Sports Bra Black",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661502567/il_794xN.3606566443_209v_bpnkva.jpg',price=39.99,create_at=today,update_at=today,owner_id=3)
    p28 = Product(name='Men Sweat Suit', description="FASHIONWT Men's Sweatsuits 2 Piece Zipper Hoodie Tracksuit Sets Casual Comfy Camo Jogging Suits",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661502710/97adf1b7-2fbd-40ea-b9f4-7f870a486ff6.477f4ca255aa71a58ab89f23c8fcccd8_kfadkg.jpg',price=54.29,create_at=today,update_at=today,owner_id=3)
    p29 = Product(name='Bench Press', description="LIFE FITNESS SIGNATURE SERIES OLYMPIC FLAT BENCH",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661502853/SOFB-2T_2000x_xek9ck.jpg',price=1499.00,create_at=today,update_at=today,owner_id=3)
    p30 = Product(name='Rubber Loop Fitness', description="Rubber Loop Fitness Pull-Up Heavy Duty Exercise Assist Power Long Custom Logo Resistance Band Pullup Set Workout Pull Up Bands",image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661502998/Had86a43e573145c293a7b44b8df288dfl.jpg_960x960_fijaav.jpg',price=20.00,create_at=today,update_at=today,owner_id=3)
    p31 = Product(name='Sweatshirt', description='Catch Me At The Bars, Workout Sweatshirt, Lifting Sweatshirt, Barbell Shirt, Unisex Gym Shirt, Fitness Apparel, Pump Cover',image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661500059/il_794xN.3654612871_jdmq_j8nrgw.jpg',price=44.95,create_at=today,update_at=today,owner_id=2)



    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)
    db.session.add(p6)
    db.session.add(p7)
    db.session.add(p8)
    db.session.add(p9)
    db.session.add(p10)
    db.session.add(p11)
    db.session.add(p12)
    db.session.add(p13)
    db.session.add(p14)
    db.session.add(p15)
    db.session.add(p16)
    db.session.add(p17)
    db.session.add(p18)
    db.session.add(p19)
    db.session.add(p20)
    db.session.add(p21)
    db.session.add(p22)
    db.session.add(p23)
    db.session.add(p24)
    db.session.add(p25)
    db.session.add(p26)
    db.session.add(p27)
    db.session.add(p28)
    db.session.add(p29)
    db.session.add(p30)
    db.session.add(p31)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()

#search?minA=12&maxB=15
