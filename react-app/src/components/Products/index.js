import React from 'react';
import Product from './Product';
import Header from '../Header';
import './Products.css'

const Products = ({ products, sessionUser }) => {
    // Remove unused shuffle function
    const sixCircleDisplayProducts = products.slice(0, 6);
    const eightProductsMiddleDisplay = products.slice(6, 14);
    // Limit to 15 products max (3 rows × 5 columns on large screens)
    const remainingProducts = products.slice(14, 29)
    
    return (
        <div className='products-page-container'>
            <div className='back-splash'></div>
            <Header sessionUser={sessionUser} />
            
            {/* Featured Products Section */}
            <section className='featured-products'>
                <h2 className='section-title'>Featured Products</h2>
                <div className='circle-display-container products'>
                    {sixCircleDisplayProducts.map(product => (
                        <Product key={product.id} product={product} showStars={true} />
                    ))}
                </div>
            </section>

            {/* Middle Products Grid */}
            <section className='middle-products-section'>
                <h2 className='section-title'>Popular Items</h2>
                <div className='middle-products-display-container products'>
                    <div className='col-1'>
                        {eightProductsMiddleDisplay[0] && <Product key={eightProductsMiddleDisplay[0].id} product={eightProductsMiddleDisplay[0]} />}
                        {eightProductsMiddleDisplay[1] && <Product key={eightProductsMiddleDisplay[1].id} product={eightProductsMiddleDisplay[1]} />}
                    </div>
                    <div className='col-2'>
                        {eightProductsMiddleDisplay[2] && <Product key={eightProductsMiddleDisplay[2].id} product={eightProductsMiddleDisplay[2]} />}
                        {eightProductsMiddleDisplay[3] && <Product key={eightProductsMiddleDisplay[3].id} product={eightProductsMiddleDisplay[3]} />}
                    </div>
                    <div className='col-3'>
                        {eightProductsMiddleDisplay[4] && <Product key={eightProductsMiddleDisplay[4].id} product={eightProductsMiddleDisplay[4]} />}
                        {eightProductsMiddleDisplay[5] && <Product key={eightProductsMiddleDisplay[5].id} product={eightProductsMiddleDisplay[5]} />}
                    </div>
                    <div className='col-4'>
                        {eightProductsMiddleDisplay[6] && <Product key={eightProductsMiddleDisplay[6].id} product={eightProductsMiddleDisplay[6]} />}
                        {eightProductsMiddleDisplay[7] && <Product key={eightProductsMiddleDisplay[7].id} product={eightProductsMiddleDisplay[7]} />}
                    </div>
                </div>
            </section>

            {/* More Products Section */}
            <section className='more-products-section'>
                <h2 className='more-products-text'>More Products from Our Sellers</h2>
                <div className='remainder-products-container'>
                    {remainingProducts.map(product => (
                        <Product key={product.id} product={product} showStars={false}/>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Products;