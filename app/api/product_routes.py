from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product

product_routes = Blueprint('products',__name__)

@product_routes.route('/')
def all_products():
    
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

@product_routes.route('/<int:id>')
def product_details(id):
    product = Product.query.get(id)
    return product.to_dict()
