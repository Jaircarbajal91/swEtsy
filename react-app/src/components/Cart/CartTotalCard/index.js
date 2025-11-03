import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { deleteCartThunk } from '../../../store/cart';
import PurchaseConfirmationModal from '../PurchaseConfirmationModal';

export default function CartTotalCard({ cartItems, initialSubtotal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const subtotal = initialSubtotal;
    const discount = initialSubtotal * 0.2;
    const total = subtotal - discount;
    const totalItems = cartItems ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0) : 0;

    const handlePurchase = async e => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleCloseModal = async () => {
        setShowModal(false);
        await dispatch(deleteCartThunk());
        history.push('/');
    };

    return (
        <>
            <PurchaseConfirmationModal
                showModal={showModal}
                onClose={handleCloseModal}
                cartItems={cartItems}
                orderSummary={{ subtotal, discount, total }}
            />
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
                    <span>FREE</span>
                </div>
                <div className='Total buy-item-container'>
                    <span>Total ({totalItems} items)</span>
                    <span>{formatter.format(total)}</span>
                </div>
                <div className='buy-item-button-container'>
                    <button className='button buy-item' onClick={handlePurchase}>Proceed with purchase</button>
                </div>
            </div>
        </>
    );
}
