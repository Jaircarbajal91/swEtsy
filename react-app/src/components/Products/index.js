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
            <div className='middle-products-display-container products'>
                <div className='col-1'>
                    <Product key={eightProductsMiddleDisplay[0].id} product={eightProductsMiddleDisplay[0]} />
                    <Product key={eightProductsMiddleDisplay[1].id} product={eightProductsMiddleDisplay[1]} />
                </div>
                <div className='col-2'>
                    <Product key={eightProductsMiddleDisplay[2].id} product={eightProductsMiddleDisplay[2]} />
                    <Product key={eightProductsMiddleDisplay[3].id} product={eightProductsMiddleDisplay[3]} />
                </div>
                <div className='col-3'>
                    <Product key={eightProductsMiddleDisplay[4].id} product={eightProductsMiddleDisplay[4]} />
                    <Product key={eightProductsMiddleDisplay[5].id} product={eightProductsMiddleDisplay[5]} />
                </div>
                <div className='col-4'>
                    <Product key={eightProductsMiddleDisplay[6].id} product={eightProductsMiddleDisplay[6]} />
                    <Product key={eightProductsMiddleDisplay[7].id} product={eightProductsMiddleDisplay[7]} />
                </div>
            </div>
            <div className='remainder-products-container'>
            <h2 className='more-products-text'>More products sold by Sellers</h2>
                    {remainingProducts.map(product => (
                        <Product key={product.id} product={product}/>
                    ))}
            </div>
        </div>
    );
}

export default Products;
