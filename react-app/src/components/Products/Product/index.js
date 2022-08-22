import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Product = ({ product }) => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        });

    return (
        <NavLink to={`/products/${product.id}`}>
            <div className='card-container'>
                <div className='product image-container'>
                    <img src={product.image} alt='product image' />
                </div>
                <div className='product name'>
                    {product.name}
                </div>
                <div className='price'>
                    {formatter.format(product.price)}
                </div>
            </div>
        </NavLink>
    );
}

export default Product;
