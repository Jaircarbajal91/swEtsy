from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import db, Product, User, Cart
from app.forms import ListForm, CartItemForm
from datetime import datetime, date, timedelta
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)

@product_routes.route('/',methods=['GET'])
@product_routes.route('',methods=['GET'])
def all_products():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

@product_routes.route('/<int:id>',methods=['GET'])
def product_details(id):
    product = Product.query.get(id)
    if product is not None:
        return product.to_dict()
    else:
        return {'errors':['product not found']}, 404

today = date.today()

@product_routes.route('/',methods=['POST'])
@product_routes.route('',methods=['POST'])
@login_required
def new_product():
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            name=form.data['name'],
            description=form.data['description'],
            image=form.data['image'],
            price=form.data['price'],
            create_at=today,
            update_at=today,
            owner_id = int(current_user.get_id())
        )
        db.session.add(product)
        db.session.commit()
        return product.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)},400
        # {
        # "name":"create01",
        # "description":"des-01",
        # "image":"https://picsum.photos/200",
        # "price":99
        # }

@product_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_product(id):
    product = Product.query.get(id)
    if product is not None:
        product_dict = product.to_dict()
        if product_dict["owner_id"] != int(current_user.get_id()):
            return {'errors':['Forbbiden: you are not the owner!']}, 403
        form = ListForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        for k in form.data:
            if not form.data[k]:
                form[k].data = product_dict[k]
        print(form.data)
        if form.validate_on_submit():
            for k in form.data:
                if k != 'csrf_token':
                    # product[k] = form.data[k] -> this doesn't work, it's not a dict, only dict uses []
                    setattr(product, k, form.data[k])
            product.update_at = today
            db.session.commit()
            return {'updated_product':[product.to_dict()]}
        return {'errors':validation_errors_to_error_messages(form.errors)}
    else:
        return {'errors':['product not found']}, 404


@product_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    if product is not None:
        product_dict = product.to_dict()
        if product_dict["owner_id"] != int(current_user.get_id()):
            return {'errors':['Forbbiden: you are not the owner!']}, 403
        form = ListForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        db.session.delete(product)
        db.session.commit()
        return product_dict
    else:
        return {'errors':['product not found']}, 404

@product_routes.route('/<int:id>/cart', methods=['POST'])
@login_required
def add_product_to_cart(id):
    # get cart has a problem, length
    uid = int(current_user.get_id())
    product = Product.query.get(id)
    if product is None:
        return {'errors':['product not found']}, 404
    if product.owner_id == uid:
        return {'errors':['You cannot purchase your own product!']}, 400
    cart_prod = db.session.query(Cart) \
                .filter(Cart.user_id == uid) \
                .filter(Cart.product_id == id) \
                .first()
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if cart_prod is None:
            item = Cart(
                user_id=uid,
                product_id=id,
                quantity=form.data["quantity"],
                create_at=today,
                update_at=today
            )
            db.session.add(item)
            db.session.commit()
            res = item.to_dict()
        else:
            if form.validate_on_submit():
                cart_prod.quantity = form.data["quantity"]
                cart_prod.update_at = today
                db.session.commit()
                res = cart_prod.to_dict()
        res['product_detail'] = product.to_dict()
        return {"new_cartitem":[res]}
