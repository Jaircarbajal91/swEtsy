from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Product

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/myproducts')
@login_required
def my_products():
    my_products = Product.query.filter(Product.owner_id == int(current_user.get_id()))
    return {'myproducts':[product.to_dict() for product in my_products]}
