import React from 'react';
import { NavLink } from 'react-router-dom';
import Stars from '../../Reviews/Stars'

const Product = ({ product }) => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    console.log(product)
    return (
        <NavLink to={`/products/${product.id}`}>
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
        </NavLink>
    );
}

export default Product;
