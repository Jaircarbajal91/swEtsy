from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired
# from app.models import Review


def validate_str(form, field):
    if field.data is None or field.data != str(field.data):
        raise StopValidation('This input must be a string')


def validate_int(form, field):
    if field.data is None or field.data != int(field.data):
        raise StopValidation('This input must be a integer')


class ReviewForm(FlaskForm):
    stars = IntegerField('stars', validators=[DataRequired()])
    review_body = TextAreaField('review', validators=[validate_str])
    
