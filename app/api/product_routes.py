from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import db, Product, User, Cart, Review
from app.forms import ListForm, CartItemForm, ReviewForm
from datetime import datetime, date, timedelta
from .auth_routes import validation_errors_to_error_messages
import statistics

product_routes = Blueprint('products', __name__)

@product_routes.route('/',methods=['GET'])
@product_routes.route('',methods=['GET'])
def all_products():
    # products = Product.query.all()
    products = db.session.query(Product) \
                .options(db.joinedload(Product.reviews)).all()
    if products is not None and len(products)>0:
        product_details = []
        for item in products:
            reviews = [r.to_dict() for r in item.reviews]
            stars = [int(r.stars) for r in item.reviews]
            avg = statistics.mean(stars) if len(stars) else 0
            item = item.to_dict()
            item['reviews'] = reviews
            item['avgScore'] = round(float(avg),2)
            product_details.append(item)

    return {'products': product_details}

@product_routes.route('/<int:id>',methods=['GET'])
def product_details(id):
    product = Product.query.options(db.joinedload(Product.reviews)).get(id)
    # product = db.session.query(Product).filter(Product.id == id) \
    #             .options(db.joinedload(Product.reviews)).first()
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

@product_routes.route('/<int:id>/', methods=["PUT"])
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
        if form.validate_on_submit():
            for k in form.data:
                if k != 'csrf_token':
                    # product[k] = form.data[k] -> this doesn't work, it's not a dict, only dict uses []
                    setattr(product, k, form.data[k])
            product.update_at = today
            db.session.commit()
            return product_dict
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
    uid = int(current_user.get_id())
    product = Product.query.get(id)
    if product is None:
        return {'errors':['product not found']}, 404
    # if product.owner_id == uid:
    #     return {'errors':['You cannot purchase your own product!']}, 400
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
        # return {"new_cartitem":[res]}
        return res

@product_routes.route('/<int:id>/reviews', methods=['GET'])
@product_routes.route('/<int:id>/reviews/', methods=['GET'])
def get_product_reviews(id):
    product_reviews = db.session.query(Review) \
                        .filter(Review.product_id == id) \
                        .all()
    review_details = []
    if product_reviews is not None and len(product_reviews) > 0:
        for review in product_reviews:
            review = review.to_dict()
            review_details.append(review)
    return { "review_details": review_details }

@product_routes.route('/<int:id>', methods=['POST'])
@product_routes.route('/<int:id>/', methods=['POST'])
@login_required
def create_product_review(id):
    uid = current_user.get_id()
    # reviews = Review.query.filter(Review.user_id == uid).all()
    product_reviews = Review.query.filter(Review.product_id == id).all()
    for product_review in product_reviews:
        if product_review.to_dict()['user_id'] == int(uid):
            return {'errors': ['You may not review this item again']},403
    product = Product.query.get(id)
    if product.to_dict()["owner_id"] == int(current_user.get_id()):
        return {'errors': ['You cannot review your own product']}, 403
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        review = Review(
            stars = data['stars'],
            review_body = data['review_body'],
            product_id = id,
            user_id = int(uid)
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@product_routes.route('/<int:prod_id>/reviews/<int:review_id>/', methods=['PUT'])
@product_routes.route('/<int:prod_id>/reviews/<int:review_id>', methods=['PUT'])
@login_required
def edit_product_review(prod_id, review_id):
    review = Review.query.get(review_id)
    if not review:
        return {'errors':['This review does not exist']},404
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     revised_review = Review(
    #         stars = data['stars'],
    #         review_body = data['review_body'],
    #         product_id = prod_id,
    #         user_id = int(current_user.get_id())
    #     )
    for k in form.data:
        if not form.data[k]:
            form[k].data = review.to_dict()[k]
    if form.validate_on_submit():
        for k in form.data:
            if k != 'csrf_token':
                setattr(review, k, form.data[k])
        db.session.commit()
        return review.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)},400
