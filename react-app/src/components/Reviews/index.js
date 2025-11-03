import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getReviewsThunk } from "../../store/review";

import Stars from '../Reviews/Stars';
import './Reviews.css';

const Reviews = ({ product }) => {
const dispatch = useDispatch();
const id = product.id;
const [reviewLoaded, setReviewLoaded] = useState(false)
const productReviews = useSelector(state => state.reviews.reviewsList)


useEffect(() => {
    dispatch(getReviewsThunk(id)).then(() => setReviewLoaded(true))
}, [id, dispatch])

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

let reviewLength = productReviews?.length;

// Calculate average star rating
const calculateAverageRating = () => {
    if (!productReviews || productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + (review.stars || 0), 0);
    return sum / productReviews.length;
};

const averageRating = calculateAverageRating();

return reviewLoaded && (
    <div className='review-container'>
        <div className='reviews-header'>
            <div className='reviews-title-wrapper'>
                <p className='review-title'>
                    {productReviews?.length} reviews
                </p>
            </div>
            {productReviews?.length > 0 && (
                <div className='average-rating-container'>
                    <span className='average-rating-label'>Overall Rating:</span>
                    <div className='average-rating-stars'>
                        <Stars rating={averageRating} />
                    </div>
                    <span className='average-rating-value'>{averageRating.toFixed(1)}</span>
                </div>
            )}
        </div>
    {(productReviews.length) ?
        productReviews.map(review => {
        return <div className='product-review' key={review.id}>
            <div className='review-content-wrapper'>
                <div className='review-star'>
                    <Stars rating={review.stars} />
                </div>
                <div className='review-reviewbody'>{review.review_body}</div>
                {review.created_at && (
                    <div className='review-date'>
                        Reviewed on {formatDate(review.created_at)}
                    </div>
                )}
            </div>
        </div>
        }) : (
        <h4> - no review for this product yet - </h4>
        )}
    </div >
)
}

export default Reviews
