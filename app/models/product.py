from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, DateTime,Date
from flask_login import UserMixin
from app.models import User

class Product(db.Model, UserMixin):
    __tablename__='products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50),nullable=False)
    description = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(300),nullable=False)
    price = db.Column(db.Float, nullable=False)
    create_at = db.Column(db.DateTime, nullable=False)
    update_at = db.Column(db.DateTime, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    # stock = db.Column(db.Integer, nullable=False)
    # category = db.Column(db.String, nullable=False)

    user = db.relationship("User",back_populates="products",foreign_keys=[owner_id])
    carts = db.relationship("Cart", back_populates="product", cascade="all, delete")
    # images = db.relationship('Image',back_populates='products')
    reviews = db.relationship('Review', back_populates='product',cascade='all,delete')

    @property
    def product_details(self):
        return self.to_dict()

    # @product_details.setter
    # def update_product(self,)

    def to_dict(self):
        return {
            'id': self.id ,
            'name': self.name ,
            'description': self.description ,
            'image': self.image ,
            'price': self.price ,
            'create_at': self.create_at,
            'update_at': self.update_at ,
            'owner_id': self.owner_id ,
            # 'stock': self.stock,
            # 'category': self.category,
        }
