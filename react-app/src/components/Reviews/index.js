import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Modal } from '../../context/Modal';
import { getReviewsThunk, createReviewThunk, editReviewThunk, deleteReviewThunk } from "../../store/review";
import Stars from '../Reviews/Stars'

const Reviews = ({ product, isLoaded }) => {
  const dispatch = useDispatch();
  const id = product.id;
  const [reviewLoaded, setReviewLoaded] = useState(false)
  const productReviews = useSelector(state => state.reviews.reviewsList)

  useEffect(() => {
    dispatch(getReviewsThunk(id)).then(() => setReviewLoaded(true))
  }, [product.id])

  let reviewLength = productReviews?.length;
  console.log('length====', reviewLength)

  return reviewLoaded && reviewLength && (
    <div className='review-container'>
      {/* <p>{product.avgScore}<Stars rating={5} /></p> */}
      <p><Stars rating={5} /></p>
      <p className='review title'>{reviewLength} shop reviews
      </p>
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
