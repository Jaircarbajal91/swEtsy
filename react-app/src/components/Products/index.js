import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([])
    const productComponents = products.map((product) => {
        return (
            <li key={product.id}>
                <NavLink tpo={`/products/${products.id}`}>
                    {product.name} {product.price}
                </NavLink>
            </li>
        )
    })
    return (
        <nav className='products'>
            <h1>homepage for products</h1>
            <h2>-------------------------------</h2>
            <ul>{productComponents}</ul>
        </nav>
    );
}

export default Products;
