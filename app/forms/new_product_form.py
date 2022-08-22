from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, IntegerField,SelectField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import Product
from datetime import datetime, date, timedelta

# def listing_validates(form, field):
#     image = form.data['image']
#     price = form.data['price']
#     stock = form.data['stock']
#     if image:
#         raise ValidationError('please use a valid image URL')
#     if price:
#         raise ValidationError('price should range between $0 and $1,000,000.')
#     if stock:
#         raise ValidationError('stock should range between 0 and 999,999.')

today = date.today()


class ListForm(FlaskForm):
    name= StringField('name',validators=[DataRequired(),Length(min=3,max=80)])
    description= TextAreaField('description',validators=[DataRequired(),Length(min=1,max=300)])
    image= StringField('image',validators=[URL(message='invalid image url ~')])
    price= DecimalField('price',validators=[DataRequired(), NumberRange(min=0,max=1000000)],places=2, rounding=ROUND_UP,)
    stock= IntegerField('stock', validators=[DataRequired(),NumberRange(min=0,max=999999)])
    category=SelectField('category',choices=['Apparel','Accessories','Equipment','Outdoor'])
    create_at= DateTimeField('create_at',default=today,validators=[DataRequired()],format='%Y-%m-%d')
    update_at= DateTimeField('update_at',default=today,validators=[DataRequired()],format='%Y-%m-%d')
    owner_id= StringField('owner_id')
