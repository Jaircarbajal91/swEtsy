import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { deleteCartThunk } from '../../../store/cart';

export default function CartTotalCard({ cartItems, initialSubtotal}) {
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(initialSubtotal)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const subtotal = initialSubtotal;
    const discount = initialSubtotal * 0.2;
    const total = subtotal - discount;

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
