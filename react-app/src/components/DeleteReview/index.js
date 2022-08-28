import React from 'react';
import { useDispatch } from 'react-redux';
import { getMyReviewThunk, deleteReviewThunk } from "../../store/review";
import './deleteConfirmation.css'

const DeleteReview = ({ setDeleteReview, setShowDelete, reviewId }) => {
    const dispatch = useDispatch();
    const handleDelete = async e => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(reviewId)).then(() => console.log('deleted! id is ', reviewId))
        await dispatch(getMyReviewThunk())
    }

    return (
        <div className='delete-confirmation-modal'>
            <h1 className='delete-confirmation-question'>Are you sure you want to delete this Review?</h1>
            <button className='delete-confirmation-yes' onClick={handleDelete}>Yes</button>
            <button className='delete-confirmation-no' onClick={() => setShowDelete(false)}>No</button>
        </div>
    )
}

export default DeleteReview

// onClose={() => setShowDelete(false)}
