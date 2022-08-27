import React from 'react';
import Product from './Product';
import Header from '../Header';
import './Products.css'

const Products = ({ products, sessionUser }) => {

    const shuffle = (array) => {
        var m = array.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    const shuffledProducts = shuffle(products)
    const sixCircleDisplayProducts = shuffledProducts.slice(0, 6);
    const eightProductsMiddleDisplay = shuffledProducts.slice(6, 14);
    const remainingProducts = shuffledProducts.slice(14, shuffledProducts.length)
    return (
        <div className='products-page-container'>
            <div className='back-splash'></div>
            <Header sessionUser={sessionUser} />
            <div className='circle-display-container products'>
                {sixCircleDisplayProducts.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>

            {/* <div className='products container'>
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div> */}
        </div>
    );
}

export default Products;
