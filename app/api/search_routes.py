from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import db, Product, User, Cart
from app.forms import ListForm, CartItemForm
from datetime import datetime, date, timedelta
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)

def get_filter(key, value):
    if key == 'keyword':
        return [or_(Product.name.like(f'%{value}%'), Product.description.like(f'%{value}%'))]
    elif key == 'minPrice':
        return [Product.price >= value]
    elif key == 'maxPrice':
        return [Product.price <= value]
    elif key == 'ownerId':
        return [Product.owner_id == value]
    else:
        return False

@search_routes.route('/',methods=['GET'])
def search():
    filters = []
    args = request.args
    args_dict = args.to_dict()
    print(args_dict)
    for k,v in args_dict.items():
        f = get_filter(k,v)
        if f is not False:
            filters.extend(f)
    if len(filters) > 0:
        filtered_products = Product.query.filter(*filters).all()
    else: 
        filtered_products = Product.query.all()
    return {'products': [product.to_dict() for product in filtered_products]}
