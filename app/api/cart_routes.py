from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import db, Product, User,Cart
from app.forms import ListForm
from datetime import datetime, date, timedelta
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/', methods=['GET'])
@login_required
def get_cart():
    uid = int(current_user.get_id())
    cart_prods = db.session.query(Cart) \
                            .filter(Cart.user_id == uid) \
                            .options(db.joinedload(Cart.product)) \
                            .all()
    if cart_prods is not None:
        cart_details = []
        for item in cart_prods:
            prod = item.product.to_dict()
            item = item.to_dict()
            item['product_detail'] = prod
            cart_details.append(item)
        # print(cart_details)
        return {'cart_details':cart_details, 'message':'Cart detail read done!'}
    else:
        return {'message':'Cart is Empty!'}

today = date.today()
