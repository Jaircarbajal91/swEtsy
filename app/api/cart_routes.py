from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import db, Product, User, Cart
from app.forms import ListForm, CartItemForm
from datetime import datetime, date, timedelta
from .auth_routes import validation_errors_to_error_messages

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

today = date.today()

@cart_routes.route('/<int:id>',methods=['PUT'])
@login_required
def edit_cart(id):
    item = Cart.query.get(id)
    if item is None:
        return {'errors':['cart item not found']}, 404
    if item.user_id != int(current_user.get_id()):
        return {'errors':['Forbbiden: you are not the user having the cart!']}, 403
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        item.update_at = today
        item.quantity = form.data['quantity']
        db.session.commit()
        return item.to_dict()
    else:
        return {'errors':validation_errors_to_error_messages(form.errors)},400

@cart_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_cart(id):
    item = Cart.query.get(id)
    if item is None:
        return {'errors':['Cart item not found']}, 404
    if item.user_id != int(current_user.get_id()):
        return {'errors':['Forbidden: This is not your cart!']}, 403
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
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
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    for item in cart_prods:
        db.session.delete(item)
    db.session.commit()
    return {'message':"Your cart is now empty"}
