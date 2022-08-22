import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import Stars from "../Reviews/Stars";

const ProductDetail = () => {
  const { id } = useParams()
  const product = useSelector(state => state.products[id])
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    });
  return (
    <div className="product detail container">
      <div className="product detail image">
        <img src={product.image} alt="" />
      </div>
      <div className="product detail name">
        <p>{product.name}</p>
      </div>
      <div className="product detail stars">
        <Stars rating={2.4}/>
      </div>
      <div className="product detail description">
        <p>{product.description}</p>
      </div>
      <div className="product detail price">
        <p>{formatter.format(product.price)}</p>
      </div>
      <div className="product detail stars">
        <Stars rating={2.4}/>
      </div>
    </div>
  )
}

export default ProductDetail;
