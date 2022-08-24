from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import db, Product, User, Cart
from app.forms import ListForm, CartItemForm
from datetime import datetime, date, timedelta
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import or_, desc

search_routes = Blueprint('search', __name__)




def get_filter(key, value):
    if key == 'keyword':
        li = value.split(' ')
        keys = [ [Product.name.like(f'%{e}%'), Product.description.like(f'%{e}%')] for e in li if e != '' ]
        flatten = [e for l in keys for e in l]
        return [or_(*flatten)]
        #searching kewords include spaces
    elif key == 'minPrice':
        return [Product.price >= value]
    elif key == 'maxPrice':
        return [Product.price <= value]
    elif key == 'ownerId':
        return [Product.owner_id == value]
    else:
        return False

orders = {
    'ascPrice': Product.price,
    'descPrice': desc(Product.price),
    # 'descReview': desc(Product.score),
    'descCreate': desc(Product.create_at)
}

@search_routes.route('/',methods=['GET'])
def search():
    filters = []
    args = request.args
    args_dict = args.to_dict(flat=False) # query params are lists
    print(args_dict)
    query_order = (args_dict.get('order') and args_dict.get('order')[-1]) or 'id'
    order = orders.get(query_order) if orders.get(query_order) is not None else Product.id
    isize = int((args_dict.get('size') and args_dict.get('size')[-1]) or 0)
    ipage = int((args_dict.get('page') and args_dict.get('page')[-1]) or 0) # sanitize the Nonetype, am I spelling right?
    size = isize if isize and isize > 0 and isize <= 20 else 20
    page = ipage if ipage or isize > 0 else 1
    for k,v in args_dict.items():
        f = get_filter(k,v[-1]) # Using the last filter if duplicated
        if f is not False:
            filters.extend(f)
    if len(filters) > 0:
        filtered_products = Product.query.filter(*filters).order_by(order).offset((page-1)*size).limit(size).all()
    else:
        filtered_products = Product.query.order_by(order).offset((page-1)*size).limit(size).all()
    res = {'products': [product.to_dict() for product in filtered_products], 'page':page, 'size':size, 'order':'id'}
    # size will be the real size if there are no more than 20 products
    # this is good for the feature "showing xxx products in page xxx"
    # if we have it lmao
    res['size'] = size if size < len(res['products']) else len(res['products'])
    res['order'] = query_order if orders.get(query_order) is not None else 'id'
    return res
