from itertools import product
from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired
# from app.models import Cart
# from datetime import datetime, date, timedelta

class CartItemForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    product_id = IntegerField('product_id', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
