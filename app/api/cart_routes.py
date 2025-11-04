from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import db, Product, User, Cart
from datetime import datetime, date, timedelta

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/', methods=['GET'])
@cart_routes.route('', methods=['GET'])
@login_required
def get_cart():
    uid = int(current_user.get_id())
    cart_prods = db.session.query(Cart) \
                            .filter(Cart.user_id == uid) \
                            .options(db.joinedload(Cart.product)) \
                            .all()
    if cart_prods is not None and len(cart_prods)>0:
        cart_details = []
        for item in cart_prods:
            prod = item.product.to_dict()
            item = item.to_dict()
            item['product_detail'] = prod
            cart_details.append(item)
        return {'cart_details':cart_details, 'message':'Cart detail read done!'}
    else:
        return {'message':'Cart is Empty!', 'cart_details':[]}

today = datetime.now()

@cart_routes.route('/<int:id>',methods=['PUT'])
@login_required
def edit_cart(id):
    item = Cart.query.get(id)
    if item is None:
        return {'errors':['cart item not found']}, 404
    if item.user_id != int(current_user.get_id()):
        return {'errors':['Forbbiden: you are not the user having the cart!']}, 403
    
    # Handle JSON data from frontend
    if request.is_json:
        json_data = request.get_json()
        if json_data and 'quantity' in json_data:
            quantity = json_data['quantity']
        else:
            return {'errors': ['Quantity is required']}, 400
    else:
        return {'errors': ['Request must be JSON']}, 400
    
    # Validate quantity
    if quantity is None or quantity < 1 or quantity > 200:
        return {'errors': ['Quantity must be between 1 and 200']}, 400
    
    item.update_at = today
    item.quantity = quantity
    db.session.commit()
    result = item.to_dict()
    result['product_detail'] = item.product.to_dict()
    return result

@cart_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_cart(id):
    item = Cart.query.get(id)
    if item is None:
        return {'errors':['Cart item not found']}, 404
    if item.user_id != int(current_user.get_id()):
        return {'errors':['Forbidden: This is not your cart!']}, 403
    db.session.delete(item)
    db.session.commit()
    # return item.to_dict()
    return {'message':'Item successfully removed from cart!'}

@cart_routes.route('/',methods=['DELETE'])
@cart_routes.route('',methods=['DELETE'])
@login_required
def delete_all_cart():
    uid = int(current_user.get_id())
    cart_prods = db.session.query(Cart).filter(Cart.user_id == uid).all()
    if len(cart_prods) == 0:
        return {'errors':['Your cart is already empty!']}, 404
    for item in cart_prods:
        db.session.delete(item)
    db.session.commit()
    return {'message':"Your cart is now empty"}
