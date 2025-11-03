

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Modal } from '../../../context/Modal';
import { getMyReviewThunk } from "../../../store/review";
import Stars from '../../Reviews/Stars'
import EditMyReview from '../../UpdateMyReview'
import DeleteReview from '../../DeleteReview'
import './myReviews.css'

const MyReviews = ({ reviews, setShowLogin }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [reviewLoaded, setReviewLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editingReview, setEditingReview] = useState(null)
    const [showDelete, setShowDelete] = useState(false)
    const [deletingReviewId, setDeletingReviewId] = useState(null)
    const myReviews = useSelector(state => state.reviews.reviewsList)
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getMyReviewThunk()).then(() => setReviewLoaded(true))
    }, [dispatch])

    if (myReviews?.length == 0) {
        return <h2>You have no reviews yet.</h2>
    }

    const handleEditClick = (review) => {
        setEditingReview(review)
        setShowModal(true)
    }

    const handleDeleteClick = (reviewId) => {
        setDeletingReviewId(reviewId)
        setShowDelete(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setEditingReview(null)
    }

    const handleCloseDeleteModal = () => {
        setShowDelete(false)
        setDeletingReviewId(null)
    }

    if (!sessionUser) {
        history.push('/')
        return (
            window.location.reload(false)
        )
    }

    return reviewLoaded && (
        <div className='myreview-container'>
            <header className='myreview-header'>
                <h1 className='myreview-title'>Reviews</h1>
            </header>
            {showModal && editingReview && (
                <Modal onClose={handleCloseModal}>
                    <EditMyReview 
                        review={editingReview} 
                        setShowModal={handleCloseModal} 
                    />
                </Modal>
            )}
            {showDelete && deletingReviewId && (
                <Modal onClose={handleCloseDeleteModal}>
                    <DeleteReview 
                        reviewId={deletingReviewId}
                        setShowDelete={handleCloseDeleteModal}
                        setShowModal={handleCloseDeleteModal}
                    />
                </Modal>
            )}
            <div className='myreview-grid'>
                {myReviews?.length && myReviews.map(review => {
                    return (
                        <article className='product-myreview-card' key={review.id}>
                            <div className='myreview-icon-buttons'>
                                <button 
                                    className='myreview-edit-button'
                                    onClick={() => handleEditClick(review)}
                                    title="Edit review"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </button>
                                <button 
                                    className='myreview-delete-button'
                                    onClick={() => handleDeleteClick(review.id)}
                                    title="Delete review"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className='myreview-card-content'>
                                <div className='myreview-image-wrapper'>
                                    <img 
                                        className='myreview-img' 
                                        src={review.product.image} 
                                        alt={review.product.name} 
                                        loading="lazy"
                                    />
                                </div>
                                <div className='myreview-details'>
                                    <NavLink 
                                        to={`/products/${review.product.id}`}
                                        className='myreview-product-link'
                                    >
                                        {review.product.name}
                                    </NavLink>
                                    <div className='myreview-star-rating'>
                                        <Stars rating={review.stars} />
                                    </div>
                                    <p className='myreview-body'>
                                        {review.review_body}
                                    </p>
                                    <div className='myreview-date'>
                                        Reviewed on {review.created_at ? new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    )
}
export default MyReviews
