import React from 'react';
import { useDispatch } from 'react-redux';
import { getMyReviewThunk, deleteReviewThunk } from "../../store/review";
import './deleteConfirmation.css'

const DeleteReview = ({ setDeleteReview, setShowDelete, reviewId, setShowModal }) => {
    const dispatch = useDispatch();
    const handleDelete = async e => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(reviewId))
        await dispatch(getMyReviewThunk())
        setShowDelete(false)
        setShowModal(false)
    }

    return (
        <div className='delete-confirmation-modal'>
            <h1 className='delete-confirmation-question'>Are you sure you want to delete this review?</h1>
            <div className='delete-confirmation-buttons'>
                <button className='delete-confirmation-yes' onClick={handleDelete}>Delete</button>
                <button className='delete-confirmation-no' onClick={() => setShowDelete(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteReview

// onClose={() => setShowDelete(false)}
