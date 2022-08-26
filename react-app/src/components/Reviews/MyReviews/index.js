import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Modal } from '../../../context/Modal';
import { getMyReviewThunk, deleteReviewThunk } from "../../../store/review";
import Stars from '../../Reviews/Stars'
import EditMyReview from '../../UpdateMyReview'

const MyReviews = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [reviewLoaded, setReviewLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [errors, setErrors] = useState([])
    const [review, setReview] = useState()
    const myReviews = useSelector(state => state.reviews.reviewsList)
    // const myReviews = useSelector(state => state.reviews)
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getMyReviewThunk()).then(() => setReviewLoaded(true))
    }, [dispatch, showModal])

    const handleEdit = async (e) => {
        e.preventDefault();
        setReview(e.currentTarget.value)
        // console.log('---', e.currentTarget.value)
        setShowModal(true)
        console.log(showModal)
    }

    const handleDelete = async e => {
        e.preventDefault()
        let id = Number(e.currentTarget.value)
        await dispatch(deleteReviewThunk(id)).then(() => console.log('deleted!!'))
        await dispatch(getMyReviewThunk())
    }

    return reviewLoaded && (
        <div className='review-container'>
            <p className='myreview title'> Your Reviews</p>
            {myReviews?.length && myReviews.map(review => {
                return <div className='product review' key={review.id}>

                    <div>
                        <div className='review product'>Review on  
                            <div className='review product'>
                                <NavLink to={`/products/${review.id}`}>{review.product.name}</NavLink>
                            </div>
                        </div>
                        <div className='review star'>
                            <Stars rating={review.stars} />
                        </div>
                        <div className='review reviewbody'>{review.review_body}</div>
                    </div>
                    <button onClick={handleEdit} value={[review.id, review.product.id]}>Edit Your Review</button>
                    <button onClick={handleDelete} value={review.id}>Delete</button>
                </div>
            })
            }
            <EditMyReview review={review} showModalprop={showModal} />
        </div >

    )
}
export default MyReviews
