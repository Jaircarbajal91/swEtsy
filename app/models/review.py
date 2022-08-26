from itertools import product
from .db import db
from flask_login import UserMixin

class Review(db.Model, UserMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    stars = db.Column(db.Integer, nullable=False)
    review_body = db.Column(db.String(1000))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='user_reviews', foreign_keys=[user_id])
    product = db.relationship('Product', back_populates='reviews', foreign_keys=[product_id])

    
    @property
    def review_details(self):
        return self.to_dict()

    def to_dict(self):
        return {
            'id': self.id,
            'stars': self.stars,
            'review_body': self.review_body,
            'product_id': self.product_id,
            'user_id': self.user_id
        }
