import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"


export default function CartItem({ item }) {
    const dispatch = useDispatch();
    const product = item.product_detail;
    const options = []
    for (let i = 1; i <= 100; i++) {
        options.push(i);
    }
    // console.log(options)

    // Calculate gross revenue for this item
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    const revenue = formatter.format(item.quantity * product.price);
    return (
        <div>
            <div>
                <img src={product.image} alt='product' />
            </div>
            <div>
                <h4>{product.name}</h4>
                <button>Remove</button>
            </div>
            <div>
                <div>
                    <select>
                        {options.map(option => (
                            <option value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>{revenue}</p>
                    <p>({formatter.format(product.price)} each)</p>
                </div>
            </div>
        </div>
    );
}
