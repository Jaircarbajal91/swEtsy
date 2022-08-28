import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyReviewThunk, editReviewThunk, deleteReviewThunk } from "../../store/review";
import { Modal } from "../../context/Modal";
import DeleteReview from '../DeleteReview';
import './updateMyReview.css'
import FullStar from '../images/FullStar.svg'
import EmptyStar from '../images/EmptyStar.svg'



export default function EditMyReview({ review, showStore, setFold }) {
    const dispatch = useDispatch();
    const [reviewStars, setReviewStars] = useState()
    const [reviewBody, setReviewBody] = useState('')
    const [reviewLoaded, setReviewLoaded] = useState(false)
    const [deleteReview, setDeleteReview] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [allstars, setAllstars] = useState('☆☆☆☆☆')
    const [errors, setErrors] = useState([])
    const [isDisabled, setIsDisabled] = useState(true);
    const sessionUser = useSelector(state => state.session.user);
    const myReviews = useSelector(state => state.reviews.reviewsList)
    let reviewId = review.id
    let productId = review.product.id
    useEffect(() => {
        dispatch(getMyReviewThunk()).then(() => setReviewLoaded(true))
    }, [dispatch])

    console.log('star is -- ', reviewStars);
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
    }, [reviewBody.length, errors.length, reviewStars, allstars])

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
        setAllstars('☆☆☆☆☆')
        setReviewBody('')
    }

    const handleStars = async e => {
        e.preventDefault()
        if (e.target.value == 1) {
            setAllstars('☆☆☆☆★')
        }
        if (e.target.value == 2) {
            setAllstars('☆☆☆★★')
        }
        if (e.target.value == 3) {
            setAllstars('☆☆★★★')
        }
        if (e.target.value == 4) {
            setAllstars('☆★★★★')
        }
        if (e.target.value == 5) {
            setAllstars('★★★★★')
        }
        setReviewStars(e.target.value)
    }

    return reviewLoaded && (
        <div id={reviewId} style={{ display: { ...showStore } }}>
            <form className='editreview-form'>Update My Review
                < div className="star-rating-container" >
                    <selection className="radio-label-container">
                        <label for='r6' className='rating-label-all'>{allstars}</label>
                        <input type="radio" id='r1' className="rating-radio" value="5" onClick={handleStars}></input>
                        <label for='r1' className='rating-label'>☆</label>
                        <input type="radio" id='r2' className="rating-radio" value="4" onClick={handleStars}></input>
                        <label for='r2' className='rating-label'>☆</label>
                        <input type="radio" id='r3' className="rating-radio" value="3" onClick={handleStars}></input>
                        <label for='r3' className='rating-label'>☆</label>
                        <input type="radio" id='r4' className="rating-radio" value="2" onClick={handleStars}></input>
                        <label for='r4' className='rating-label'>☆</label>
                        <input type="radio" id='r5' className="rating-radio" value="1" onClick={handleStars}></input>
                        <label for='r5' className='rating-label'>☆</label>
                    </selection>
                </div >
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
