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
}, [product.id])

let reviewLength = productReviews?.length;
// console.log('length====', reviewLength)

return reviewLoaded && (
    <div className='review-container'>
    {/* <p className='review title'>{reviewLength} shop reviews</p> */}
        <div className='reviews-header'>
            {reviewLength} reviews
            <Stars rating={product.avgScore} />
        </div>
        {productReviews?.length && productReviews.map(review => {
            return <div className='product review' key={review.id}>
            <div className='review username'>user: {review.user_id}</div>
            <div className='review star'>
                <Stars rating={review.stars} />
            </div>
            <div className='review reviewbody'>{review.review_body}</div>
            <br></br>
            </div>
        })
        }

    </div >
)
}

export default Reviews
