import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { deleteCartThunk } from '../../../store/cart';

export default function CartTotalCard({ cartItems }) {
    const dispatch = useDispatch();
    const history = useHistory();
    let initialSubtotal = 0;
    for (let item of cartItems) {
        initialSubtotal += item.quantity * item.product_detail.price
    };

    const [subtotal, setSubtotal] = useState(initialSubtotal);
    const [discount, setDiscount] = useState(initialSubtotal * 0.2);
    const [total, setTotal] = useState(initialSubtotal - discount);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    // console.log(subtotal)
    // console.log(cartItems)
    const deleteCart = async e => {
        e.preventDefault();
        await dispatch(deleteCartThunk());
        history.push('/');
    };

    return (
        <div className='checkout-card'>
            <div className='items-total'>
                <p>Item(s) total </p>
                <p>{formatter.format(subtotal)}</p>
            </div>
            <div className='discount'>
                <p>Discount</p>
                <p>{formatter.format(discount)}</p>
            </div>
            <div>
                <p>Total ({cartItems.length} items)</p>
                <p>{formatter.format(total)}</p>
            </div>
            <button onClick={deleteCart}>Buy</button>
        </div>
    );
}
