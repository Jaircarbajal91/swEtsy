import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Product from './Product';

const Products = ({ products }) => {

    return (
        <div>
            { products.map(product => (
                <Product product={product}/>
            ))}
        </div>
    );
}

export default Products;
