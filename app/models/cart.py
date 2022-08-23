from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, DateTime,Date
from flask_login import UserMixin
from app.models import User, Product

class Cart(db.Model, UserMixin):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    create_at = db.Column(db.DateTime, nullable=False)
    update_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User",back_populates="carts",foreign_keys=[user_id])
    product = db.relationship("Product", back_populates="carts", foreign_keys=[product_id])

    @property
    def cart_details(self):
        return self.to_dict()

    # @product_details.setter
    # def update_product(self,)

    def to_dict(self):
        return {
            'id': self.id ,
            'user_id': self.user_id ,
            'product_id': self.product_id ,
            'quantity': self.quantity ,
            'create_at': self.create_at,
            'update_at': self.update_at ,
        }
