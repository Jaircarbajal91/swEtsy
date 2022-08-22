from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, IntegerField,SelectField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange,Length, URL, StopValidation
from app.models import Product
from datetime import datetime, date, timedelta

# def listing_validates(form, field):
#     image = form.data['image']
#     price = form.data['price']
#     description = form.data['description']
#     name = form.data['name']
#     # stock = form.data['stock']
#     if image:
#         raise ValidationError('please use a valid image URL')
#     if price:
#         raise ValidationError('price should range between $0 and $1,000,000.')
#     # if stock:
#     #     raise ValidationError('stock should range between 0 and 999,999.')

# today = date.today()

def validate_str(form, field):
    # print("Im here")
    # print(field.data)
    # print(str(field.data))
    # print(field.data != str(field.data))
    if field.data != str(field.data):
        raise StopValidation('This input must be a string')
    # StopValidation = True


def validate_int(form, field):
    if field.data != int(field.data):
        raise StopValidation('This input must be a integer')

def validate_float(form, field):
    if field.data != float(field.data):
        raise StopValidation('This input must be a float')

class ListForm(FlaskForm):
    name= StringField('name',validators=[DataRequired(),validate_str, Length(min=3,max=80)])
    description= TextAreaField('description',validators=[DataRequired(), validate_str, Length(min=1,max=300)])
    image= StringField('image',validators=[DataRequired(), validate_str, URL(message='invalid image url ~')])
    price= DecimalField('price',validators=[DataRequired(), validate_float, NumberRange(min=0,max=1000000)],places=2)

    # submit=SubmitField('submit')
    # create_at= DateField('create_at',default='2022-08-01',validators=[DataRequired()],format='%Y-%m-%d')
    # update_at= DateField('update_at',default='2022-08-01',validators=[DataRequired()],format='%Y-%m-%d')
    # stock= IntegerField('stock', validators=[DataRequired(),NumberRange(min=0,max=999999)])
    # category=SelectField('category',choices=['Apparel','Accessories','Equipment','Outdoor'])
    # owner_id= StringField('owner_id')
