import React from 'react';
import Product from './Product';
import Header from '../Header';
import './Products.css'

const Products = ({ products, sessionUser }) => {

    return (
        <div className='products-page-container'>
            <div className='back-splash'></div>
            <Header sessionUser={sessionUser}/>
            <div className='products container'>
                {products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;
