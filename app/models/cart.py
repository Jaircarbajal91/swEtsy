from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, DateTime,Date
from flask_login import UserMixin
from app.models import User

class Cart(db.Model, UserMixin):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id', nullable=False, unique=True))
    quantity = db.Column(db.Integer, nullable=False)
