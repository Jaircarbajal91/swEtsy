from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import db, Product, User, Cart
from app.forms import ListForm, CartItemForm
from datetime import datetime, date, timedelta
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import or_, desc
import re
import statistics

search_routes = Blueprint('search', __name__)




def get_filter(key, value):
    if key == 'keyword':
        value = re.sub(r'[^A-Za-z0-9\- ]+', '',value)
        li = value.split(' ')
        keys = [ [Product.name.ilike(f'%{e}%'), Product.description.ilike(f'%{e}%')] for e in li if e != '' ]
        flatten = [e for l in keys for e in l]
        return [or_(*flatten)]
        #searching kewords include spaces
    elif key == 'minPrice':
        return [Product.price >= value] if value.isdecimal() and len(value) <= 7 else False
    elif key == 'maxPrice':
        return [Product.price <= value]  if value.isdecimal() and len(value) <= 7 else False
    elif key == 'ownerId':
        return [Product.owner_id == value]  if value.isdecimal() and len(value) <= 10 else False
    else:
        return False

orders = {
    'ascPrice': Product.price,
    'descPrice': desc(Product.price),
    # 'descReview': desc(Product.score),
    'descCreate': desc(Product.create_at)
}

@search_routes.route('/',methods=['GET'])
@search_routes.route('',methods=['GET'])
def search():
    filters = []
    filter_obj = {}
    args = request.args
    args_dict = args.to_dict(flat=False) # query params are lists

    query_order = (args_dict.get('order') and args_dict.get('order')[-1]) or 'id'
    order = orders.get(query_order) if orders.get(query_order) is not None else Product.id
    try: #sanitize value errors that the query premeter is something strange
        isize = int((args_dict.get('size') and args_dict.get('size')[-1]) or 0)
        ipage = int((args_dict.get('page') and args_dict.get('page')[-1]) or 0) # sanitize the Nonetype, am I spelling right?
    except ValueError:
        isize = 0
        ipage = 0
    size = isize if isize and isize > 0 and isize <= 60 else 60
    page = ipage if ipage and ipage > 0 and ipage < 100000000 else 1
    for k,v in args_dict.items():
        f = get_filter(k,v[-1]) # Using the last filter if duplicated
        if f is not False:
            filters.extend(f)
            filter_obj[k] = v[-1]
    if len(filters) > 0:
        filtered_products = Product.query.filter(*filters).options(db.joinedload(Product.reviews)).order_by(order).offset((page-1)*size).limit(size).all()
    else:
        filtered_products = Product.query.options(db.joinedload(Product.reviews)).order_by(order).offset((page-1)*size).limit(size).all()
    product_details = []
    if(filtered_products is not None and len(filtered_products)>0):
        for item in filtered_products:
            reviews = [r.to_dict() for r in item.reviews]
            stars = [int(r.stars) for r in item.reviews]
            avg = statistics.mean(stars) if len(stars) else 0
            item = item.to_dict()
            item['reviews'] = reviews
            item['avgScore'] = round(float(avg),2)
            product_details.append(item)
    res = {'products': product_details, 'page':page, 'size':size, 'order':'id', **filter_obj}
    # size will be the real size if there are no more than 20 products
    # this is good for the feature "showing xxx products in page xxx"
    # if we have it lmao
    res['size'] = size if size < len(res['products']) else len(res['products'])
    res['order'] = query_order if orders.get(query_order) is not None else 'id'
    return res
