from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Product, User, Cart, Review
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/', methods=['GET'])
@review_routes.route('', methods=['GET'])
def function():
    pass
