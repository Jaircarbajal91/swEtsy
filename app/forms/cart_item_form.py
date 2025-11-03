from itertools import product
from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, NumberRange
# from app.models import Cart
# from datetime import datetime, date, timedelta

class CartItemForm(FlaskForm):
    quantity = IntegerField('quantity', validators=[DataRequired(), NumberRange(min=1, max=200)])
