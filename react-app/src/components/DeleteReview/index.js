import React from 'react';
import { useDispatch } from 'react-redux';
import { getMyReviewThunk, deleteReviewThunk } from "../../store/review";
import './deleteConfirmation.css'

const DeleteReview = ({ setDeleteReview, setShowDelete, reviewId, setShowModal }) => {
    const dispatch = useDispatch();
    const handleDelete = async e => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(reviewId))
        // await dispatch(getMyReviewThunk())
        setShowModal(false)
        setShowModal(false)
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
