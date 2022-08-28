import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteProductThunk, getProductsThunk } from "../../store/products";
import './deleteConfirmation.css'


const DeleteProduct = ({ setShowDelete, id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteProductThunk(id));
    setShowDelete(false);
    await dispatch(getProductsThunk());
    history.push('/');
  }

  return (
    <div className='delete-confirmation-modal'>
      <h1 className='delete-confirmation-question'>Are you sure you want to delete this product?</h1>
      <button className='delete-confirmation-yes' onClick={handleDelete}>Yes</button>
      <button className='delete-confirmation-no' onClick={() => setShowDelete(false)}>No</button>
    </div>
  )
}

export default DeleteProduct
