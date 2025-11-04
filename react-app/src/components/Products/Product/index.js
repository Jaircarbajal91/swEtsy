import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Stars from '../../Reviews/Stars'

const Product = ({ product, showStars = true }) => {
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
                    <img 
                        className='product image' 
                        src={product.image} 
                        alt={product.name || 'product'}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Product+Image';
                            e.target.onerror = null; // Prevent infinite loop
                        }}
                    />
                </div>
                <div className='product name'>
                    {product.name}
                </div>
                {showStars && <Stars rating={product.avgScore} />}
                <div className='price'>
                    {formatter.format(product.price)}
                </div>
            </div>
        </div>
    );
}

export default Product;
