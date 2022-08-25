import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Modal } from '../../context/Modal';
import { getReviewsThunk, getMyReviewThunk, createReviewThunk, editReviewThunk, deleteReviewThunk } from "../../store/review";
import Stars from '../Reviews/Stars'

const Reviews = ({ product, isLoaded }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [reviewLoaded, setReviewLoaded] = useState(false)
  const productReviews = useSelector(state => state.reviews[product.id])

  useEffect(() => {
    dispatch(getReviewsThunk()).then(() => setReviewLoaded(true))
  }, [product.id])

  // reviewCount = productReviews.count()
  // totalStar = 0;
  // // productReviews.reduce(sum, { stars })=> sum + stars, 0)
  console.log('-----------', product)
  // avgStar = totalStar / reviewCount;
  // console.log('reviews are -----', productReviews)
  // console.log('review counts are ----', productReviews.count())
  // console.log('review avg stars is ----', productReviews.count())

  return isLoaded && (
    <div className='review-container'>
      <p className='review title'>{ } shop reviews
        <Stars rating={5} />
      </p>
      {
        reviewLoaded && productReviews.map(review =>
          <div className='product review'>
            <div className='review star'>
              <Stars rating={review.stars} />
            </div>
            <div className='review username'></div>
            <div className='review reviewbody'></div>
          </div>
        )
      }

    </div >
  )
}

export default Reviews
