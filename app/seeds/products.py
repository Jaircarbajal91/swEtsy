from app.models import db, User, Product
from datetime import datetime, date, timedelta

today = date.today()

def seed_products():
    p1 = Product(
        name='product-1', 
        description='product-test',
        image='https://picsum.photos/200',
        price=7,
        stock=100, 
        category ='equipment',
        create_at='2020-08-01',
        update_at='2020-08-01',
        owner_id=1
        )
    p2 = Product(
        name='product-2', 
        description='product-test',
        image='https://picsum.photos/200',
        price=8,
        stock=100, 
        category ='equipment',
        create_at='2020-08-02',
        update_at='2020-08-02',
        owner_id=2
        )
    p3 = Product(
        name='product-3', 
        description='product-test',
        image='https://picsum.photos/200',
        price=9,
        stock=100, 
        category ='equipment',
        create_at='2020-08-03',
        update_at='2020-08-03',
        owner_id=3
        )

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_products():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
