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

    // const shuffledProducts = shuffle(products)
    const sixCircleDisplayProducts = products.slice(0, 6);
    const eightProductsMiddleDisplay = products.slice(6, 14);
    const remainingProducts = products.slice(14, products.length)
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
