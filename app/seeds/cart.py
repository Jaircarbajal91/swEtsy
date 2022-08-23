from app.models import db, Cart

from datetime import date

today = date.today()

def seed_carts():
    c1 = Cart(user_id=1, product_id=2, quantity=2, create_at=today, update_at=today)
    c2 = Cart(user_id=2, product_id=3, quantity=2, create_at=today, update_at=today)
    c3 = Cart(user_id=3, product_id=1, quantity=2, create_at=today, update_at=today)
    c4 = Cart(user_id=1, product_id=3, quantity=2, create_at=today, update_at=today)

    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)

    db.session.commit()

def undo_carts():
    db.session.execute('TRUNCATE carts RESTART IDENTITY CASCADE;')
    db.session.commit()
