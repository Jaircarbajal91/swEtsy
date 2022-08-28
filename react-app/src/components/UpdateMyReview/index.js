import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyReviewThunk, editReviewThunk, deleteReviewThunk } from "../../store/review";
import { Modal } from "../../context/Modal";
import DeleteReview from '../DeleteReview';
import './updateMyReview.css'

export default function EditMyReview({ review, showStore, setFold }) {
    const dispatch = useDispatch();
    const [reviewStars, setReviewStars] = useState()
    const [reviewBody, setReviewBody] = useState('')
    const [reviewLoaded, setReviewLoaded] = useState(false)
    const [deleteReview, setDeleteReview] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [errors, setErrors] = useState([])
    const [isDisabled, setIsDisabled] = useState(true);
    const sessionUser = useSelector(state => state.session.user);
    const myReviews = useSelector(state => state.reviews.reviewsList)
    let reviewId = review.id
    let productId = review.product.id
    useEffect(() => {
        dispatch(getMyReviewThunk()).then(() => setReviewLoaded(true))
    }, [dispatch])

    const newErrors = [];
    useEffect(() => {
        if (reviewBody.length > 500) {
            newErrors.push('You may only enter review in 500 characters.')
        }
        if (sessionUser.id !== review.user_id) {
            newErrors.push('You may only edit your own reviews.')
        }
        setErrors(newErrors)
        if (!errors.length) setIsDisabled(false);
        else setIsDisabled(true);
    }, [reviewBody.length, errors.length, reviewStars])

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            stars: reviewStars,
            review_body: reviewBody,
        }

        await dispatch(editReviewThunk(productId, reviewId, payload)).then((res) => {
            dispatch(getMyReviewThunk())
            setReviewStars()
            setReviewBody('')
            setFold('none')
        })

        let x = document.getElementById(`${e.target.value}`)
        x.style.display === "none" ? x.style.display = "block" : x.style.display = "none"
    }

    const handleDeleteModal = async e => {
        e.preventDefault()
        setShowDelete(true)
        // let id = Number(e.currentTarget.value)
        // if (deleteReview) {
        //     await dispatch(deleteReviewThunk(id)).then(() => console.log('deleted! id is ', id))
        //     await dispatch(getMyReviewThunk())
        // } else {
        //     setShowDelete(false)
        // }
    }

    const handleClear = async e => {
        e.preventDefault()
        setReviewStars()
        setReviewBody('')
    }

    return reviewLoaded && (
        <div id={reviewId} style={{ display: { ...showStore } }}>
            <form className='editreview-form'>Update My Review
                < section className="star rating-container" >
                    <input type="radio" name="ratingStar" className="rating" value="1" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" className="rating" value="2" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" className="rating" value="3" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" className="rating" value="4" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" className="rating" value="5" onClick={e => setReviewStars(e.target.value)} />
                </section >
                <div>
                    {errors.map((error, ind) => (
                        <div className='updatereview-error' key={ind}>{error}</div>
                    ))}
                </div>
                <div className='editreview-reviewbody'>
                    <textarea
                        type='textarea'
                        placeholder='write a review for this item'
                        onChange={e => setReviewBody(e.target.value)}
                        value={reviewBody}
                        maxLength={501}
                        className='editreview-reviewbody'
                    ></textarea>
                </div>
                <br></br>
                <button value={reviewId} className='editreview-button' onClick={handleSubmit} disabled={isDisabled}>Update My Review</button>
                <button value={reviewId} className='editreview-button' onClick={handleClear}>Clear</button>
                <button value={reviewId} className='editreview-button' onClick={handleDeleteModal}>Delete</button>
                {showDelete && (
                    <Modal >
                        <DeleteReview setDeleteReview={setDeleteReview} setShowDelete={setShowDelete} reviewId={reviewId} />
                    </Modal>
                )}
            </form>
        </div >
    )
}
