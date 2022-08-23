from itertools import product
from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, StopValidation, NumberRange
# from app.models import Cart
# from datetime import datetime, date, timedelta

def validate_int(form, field):
    if field.data != int(field.data):
        raise StopValidation('This input must be a integer')

class CartItemForm(FlaskForm):
    quantity = IntegerField('quantity', validators=[DataRequired(), validate_int, NumberRange(min=0, max=200)])
