import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Stars from '../../Reviews/Stars'

const Product = ({ product }) => {
    const history = useHistory()
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return (
        <div onClick={() => history.push(`/products/${product.id}`)} style={{
            textDecoration: 'none',
            color: 'black',
            cursor: 'pointer'
        }}>
            <div className='card-container'>
                <div className='product image-container'>
                    <img className='product image' src={product.image} alt='product' />
                </div>
                <div className='product name'>
                    {product.name}
                </div>
                <Stars rating={product.avgScore} />
                <div className='price'>
                    {formatter.format(product.price)}
                </div>
            </div>
        </div>
    );
}

export default Product;
