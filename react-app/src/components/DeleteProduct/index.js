import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteProductThunk, getProductsThunk } from "../../store/products";


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
    <div>
    <h1>Are you sure you want to delete this product?</h1>
    <button onClick={handleDelete}>Yes</button>
    <button onClick={() => setShowDelete(false)}>No</button>
    </div>
)
}

export default DeleteProduct
