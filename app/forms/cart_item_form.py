from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, IntegerField,SelectField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange,Length, URL, StopValidation
from app.models import Cart
from datetime import datetime, date, timedelta

class CartItemForm(FlaskForm):
    name = StringField()
