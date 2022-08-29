import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { deleteCartThunk } from '../../../store/cart';

export default function CartTotalCard({ cartItems, initialSubtotal }) {
    const dispatch = useDispatch();
    const history = useHistory();

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
        <div className='checkout-card-container'>
            <div className='items-total buy-item-container'>
                <span>Item(s) total </span>
                <span>{formatter.format(subtotal)}</span>
            </div>
            <div className='discount buy-item-container'>
                <span>Discount</span>
                <span>-{formatter.format(discount)}</span>
            </div>
            <div className='shipping buy-item-container'>
                <span>Shipping</span>
                <span style={{
                    color: '#258535'
                }}>FREE</span>
            </div>
            <div className='Total buy-item-container'>
                <span style={{
                    display: 'inline'
                }}>Total ({cartItems.length} items)</span>
                <span>{formatter.format(total)}</span>
            </div>
            <div className='buy-item-button-container'>
                <button className='button buy-item' onClick={deleteCart}>Proceed with purchase</button>
            </div>
        </div>
    );
}
