import React from 'react';
import { Modal } from '../../../context/Modal';
import './PurchaseConfirmation.css';

export default function PurchaseConfirmationModal({ showModal, onClose, cartItems, orderSummary }) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // Generate a simple order number
    const orderNumber = `ORD-${Date.now()}`;

    if (!showModal) return null;

    return (
        <Modal onClose={onClose}>
            <div className="purchase-confirmation-container">
                <div className="success-header">
                    <div className="success-icon">✓</div>
                    <h2>Purchase Successful!</h2>
                    <p className="order-number">Order #{orderNumber}</p>
                </div>

                <div className="order-items-section">
                    <h3>Items Purchased</h3>
                    <div className="order-items-list">
                        {cartItems.map((item, index) => (
                            <div key={index} className="order-item-row">
                                <div className="order-item-info">
                                    <img 
                                        src={item.product_detail.image} 
                                        alt={item.product_detail.name}
                                        className="order-item-image"
                                    />
                                    <div className="order-item-details">
                                        <p className="order-item-name">{item.product_detail.name}</p>
                                        <p className="order-item-price">
                                            {formatter.format(item.product_detail.price)} × {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <div className="order-item-total">
                                    {formatter.format(item.quantity * item.product_detail.price)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order-summary-section">
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>{formatter.format(orderSummary.subtotal)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Discount (20%)</span>
                        <span className="discount-amount">-{formatter.format(orderSummary.discount)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span className="shipping-amount">FREE</span>
                    </div>
                    <div className="summary-row total-row">
                        <span>Total</span>
                        <span className="total-amount">{formatter.format(orderSummary.total)}</span>
                    </div>
                </div>

                <div className="confirmation-footer">
                    <button onClick={onClose} className="continue-shopping-btn">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </Modal>
    );
}

