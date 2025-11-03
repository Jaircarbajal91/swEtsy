import React from "react";
import { useDispatch } from "react-redux";
import { deleteCartItemThunk, getCartItemsThunk } from "../../../store/cart";
import './deleteCartItem.css'

const DeleteCartItem = ({ setShowDelete, itemId, productName }) => {
  const dispatch = useDispatch();
  
  const handleDelete = async () => {
    await dispatch(deleteCartItemThunk(itemId));
    await dispatch(getCartItemsThunk());
    setShowDelete(false);
  }

  return (
    <div className='delete-confirmation-container'>
      {/* Message */}
      <div className='delete-confirmation-content'>
        <h2 className='delete-confirmation-title'>Remove from Cart</h2>
        <p className='delete-confirmation-question'>
          Are you sure you want to remove "{productName}" from your cart?
        </p>
      </div>

      {/* Actions */}
      <div className='delete-confirmation-actions'>
        <button 
          className='delete-confirmation-cancel' 
          onClick={() => setShowDelete(false)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span>Cancel</span>
        </button>
        <button 
          className='delete-confirmation-delete' 
          onClick={handleDelete}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <span>Remove Item</span>
        </button>
      </div>
    </div>
  )
}

export default DeleteCartItem

