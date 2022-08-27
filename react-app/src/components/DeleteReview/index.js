import React from 'react';
import { useDispatch } from 'react-redux';
import { getMyReviewThunk, deleteReviewThunk } from "../../store/review";

const DeleteReview = ({ setDeleteReview, setShowDelete, reviewId }) => {
    const dispatch = useDispatch();
    const handleDelete = async e => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(reviewId)).then(() => console.log('deleted! id is ', reviewId))
        await dispatch(getMyReviewThunk())
    }

    return (
        <div>
            <h1>Are you sure you want to delete this Review?</h1>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowDelete(false)}>No</button>
        </div>
    )
}

export default DeleteReview

// onClose={() => setShowDelete(false)}
