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
    const [showStore, setShowStore] = useState('none')
    const [errors, setErrors] = useState([])
    const [fold, setFold] = useState('none')
    const myReviews = useSelector(state => state.reviews.reviewsList)
    // const myReviews = useSelector(state => state.reviews)
    const sessionUser = useSelector(state => state.session.user);

    let disableButton

    useEffect(() => {
        dispatch(getMyReviewThunk()).then(() => setReviewLoaded(true))
    }, [dispatch, showStore, fold])

    const handleEdit = async (e) => {
        e.preventDefault();
        let x = document.getElementById(`${e.currentTarget.value}`)
        // console.log('what is x ???', e.currentTarget.value)
        x.style.display == "none" ? x.style.display = "block" : x.style.display = "none"
        disableButton = true
        setFold(e.target.value)
    }
    const handleCancel = async (e) => {
        e.preventDefault();
        let x = document.getElementById(`${e.currentTarget.value}`)
        // console.log('what is x ???', e.currentTarget.value)
        x.style.display == "none" ? x.style.display = "block" : x.style.display = "none"
        setFold('none')
        disableButton = true
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
                    <div id={review.id} value={review.id} style={{ display: showStore }}>
                        <EditMyReview review={review} showStore={showStore} setShowStore={setShowStore} setFold={setFold} />
                    </div>
                    {fold !== review.id.toString() && <button id={review.id} onClick={handleEdit} value={review.id} disabled={disableButton}>Edit Your Review</button>}
                    {fold === review.id.toString() && (<button id={review.id} onClick={handleCancel} value={review.id} disabled={disableButton}>Cancel Edit</button>)}
                    {/* <button id={review.id} onClick={handleEdit} value={review.id} disabled={disableButton}>Edit Your Review</button>
                    <button id={review.id} onClick={handleCancel} value={review.id} display={showStore} disabled={disableButton}>Cancel Edit</button> */}
                </div>
            })
            }
        </div >

    )
}
export default MyReviews
