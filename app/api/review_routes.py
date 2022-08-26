from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, User, Cart, Review
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:review_id>', methods=['DELETE'])
@review_routes.route('/<int:review_id>/', methods=['DELETE'])
@login_required
def delete_product_review(review_id):
    uid = int(current_user.get_id())
    review = Review.query.get(review_id)
    if not review:
        return {'errors': ['This review does not exist']},404
    review_dict  = review.to_dict()
    if review_dict['user_id'] != uid:
        return {'errors': ['This review is not yours to delete']},403
    else:
        db.session.delete(review)
        db.session.commit()
        return {"message": f'review {review_dict["id"]} successfully deleted'}
