from itertools import product
from .db import db
from flask_login import UserMixin

class Review(db.Model, UserMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    stars = db.Column(db.Integer, nullable=False)
    review_body = db.Column(db.String(1000))
    product_id = db.Column
