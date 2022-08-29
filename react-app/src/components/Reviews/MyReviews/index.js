

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Modal } from '../../../context/Modal';
import { getMyReviewThunk } from "../../../store/review";
import Stars from '../../Reviews/Stars'
import EditMyReview from '../../UpdateMyReview'
import './myReviews.css'

const MyReviews = ({ reviews, setShowLogin }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [reviewLoaded, setReviewLoaded] = useState(false)
    const [showStore, setShowStore] = useState('none')
    const [showModal, setShowModal] = useState(false)
    const [fold, setFold] = useState('none')
    const myReviews = useSelector(state => state.reviews.reviewsList)
    const sessionUser = useSelector(state => state.session.user);

    let disableButton


    useEffect(() => {
        dispatch(getMyReviewThunk()).then(() => setReviewLoaded(true))
    }, [dispatch, showStore, fold, myReviews?.length, showModal])

    if (myReviews?.length == 0) {
        return <h2>You have no reviews yet.</h2>
    }
    // console.log("product id ---", typeof myReviews)
    const handleEdit = async (e) => {
        e.preventDefault();
        let x = document.getElementById(`${e.currentTarget.value}`)
        x.style.display === "none" ? x.style.display = "block" : x.style.display = "none"
        disableButton = true
        setFold(e.target.value)
    }
    const handleCancel = async (e) => {
        e.preventDefault();
        let x = document.getElementById(`${e.currentTarget.value}`)
        x.style.display === "none" ? x.style.display = "block" : x.style.display = "none"
        setFold('none')
        disableButton = true
    }

    if (!sessionUser) {
        history.push('/')
        return (
            window.location.reload(false)
        )
    }

    return reviewLoaded && (
        <div className='myreview-container'>
            <div className='myreview title'> Purchases and Reviews</div>
            <button className="editreview-modal-button" onClick={() => setShowModal(true)}>Edit Your Reviews</button>
            {showModal && (<Modal>
                <EditMyReview setShowModal={setShowModal} />
            </Modal>)}
            {myReviews?.length && myReviews.map(review => {
                return <div className='product-myreview' key={review.id}>
                    <div>
                        <div className='myreview-left-img'>
                            <img className='myreview-img' src={review.product.image} alt={'product image'} />
                        </div>
                            <div className='myreview-product'>Review on
                                <div className='myreview-reviewbody'>
                                    <NavLink to={`/products/${review.product.id}`}
                                        className={'myreview-redirect'}
                                    > {review.product.name}</NavLink>
                                    <div className='myreview-star'>
                                        <Stars rating={review.stars} />
                                    </div>
                                    <div id='review-body'>
                                        {review.review_body}
                                    </div>
                                </div>
                            </div>
                            <div className='myreview-reviewbody'>

                            </div>
                            {/* <div id={review.id} value={review.id} style={{ display: showStore }}>
                                <EditMyReview review={review} showStore={showStore} setShowStore={setShowStore} setFold={setFold} />
                            </div> */}
                            {/* {fold !== review.id.toString() && (<button id={review.id} className='myreviews-editbutton' onClick={handleEdit} value={review.id} disabled={disableButton}>Edit Your Review</button>)}
                            {fold === review.id.toString() && (<button id={review.id} className='myreviews-editbutton' onClick={handleCancel} value={review.id} disabled={disableButton}>Cancel Edit</button>)} */}

                            {/* <button id={review.id} onClick={handleEdit} value={review.id} disabled={disableButton}>Edit Your Review</button>
                                <button id={review.id} onClick={handleCancel} value={review.id} display={showStore} disabled={disableButton}>Cancel Edit</button> */}

                    </div>
                </div>
            })
            }
        </div >

    )
}
export default MyReviews
