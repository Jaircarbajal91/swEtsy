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


let reviewLength = productReviews?.length;
// console.log('length====', reviewLength)

return reviewLoaded && (
    <div className='review-container'>
        <div className='reviews-header'>
            {/* <p><Stars rating={product.avgScore} /></p> */}
            <p className='review-title'>
                {productReviews?.length} reviews&nbsp;
                <Stars rating={product.avgScore} />
            </p>
        </div>
    {(productReviews.length) ?
        productReviews.map(review => {
        return <div className='product-review' key={review.id}>
            {/* <div className='review-username'>user: {review.user_id}</div> */}
            <div className='review-star'>
                <Stars rating={review.stars} />
            </div>
            <br></br>
            <div className='review-reviewbody'>{review.review_body}</div>
            <br></br>
        </div>
        }) : (
        <h4> - no review for this product yet - </h4>
        )}
    </div >
)
}

export default Reviews
