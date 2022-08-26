import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Modal } from '../../../context/Modal';
import { getMyReviewThunk, createReviewThunk, editReviewThunk, deleteReviewThunk } from "../../../store/review";
import Stars from '../../Reviews/Stars'
import EditMyReview from '../../UpdateMyReview'

const MyReviews = () => {
    const dispatch = useDispatch();
    // const id = product.id;
    const [reviewLoaded, setReviewLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [errors, setErrors] = useState([])
    const [reviewId, setReviewId] = useState()
    const myReviews = useSelector(state => state.reviews.reviewsList)
    const sessionUser = useSelector(state => state.session.user);

    console.log('-->>>>>', myReviews)
    // console.log('-->>>>>', myReviews[0].review_body)

    useEffect(() => {
        dispatch(getMyReviewThunk()).then(() => setReviewLoaded(true))
    }, [])

    const handleEdit = async e => {
        e.preventDefault();
        setReviewId(e.target.value)
    }

    // const handleCancel = async e => {
    //     e.preventDefault()
    //     setReviewStars()
    //     setReviewBody('')
    //     setShowModal(false)
    // }

    return reviewLoaded && (
        <div className='review-container'>
            <p className='myreview title'> Posted Reviews</p>
            {myReviews?.length && myReviews.map(review => {
                return <div className='product review' key={review.id}>
                    <div className='review product'>
                        <NavLink to={`/products/${review.id}`}>{review.name}</NavLink>
                    </div>
                    <div>Your Review
                        <div className='review image'>
                            <img src={review.product.image} />
                        </div>
                        <div className='review star'>
                            <Stars rating={review.stars} />
                        </div>
                        <div className='review reviewbody'>{review.review_body}</div>
                    </div>
                    <button onClick={() => setShowModal(true)}>Edit Your Review</button>
                    <button>Delete</button>
                    {showModal && (
                        <EditMyReview review={review} />
                    )}
                    <br></br>
                </div>
            })
            }
        </div >

    )
}

export default MyReviews
