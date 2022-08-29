import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyReviewThunk, editReviewThunk, deleteReviewThunk } from "../../store/review";
import { Modal } from "../../context/Modal";
import DeleteReview from '../DeleteReview';
import './updateMyReview.css'
import FullStar from '../images/FullStar.svg'
import EmptyStar from '../images/EmptyStar.svg'

export default function EditMyReview({ setShowModal }) {
    const dispatch = useDispatch();
    const [reviewStars, setReviewStars] = useState()
    const [reviewBody, setReviewBody] = useState('')
    const [reviewLoaded, setReviewLoaded] = useState(false)
    const [reviewId, setReviewId] = useState()
    const [productId, setProductId] = useState()
    const [deleteReview, setDeleteReview] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [allstars, setAllstars] = useState('☆☆☆☆☆')
    const [errors, setErrors] = useState([])
    const [isDisabled, setIsDisabled] = useState(true);
    const sessionUser = useSelector(state => state.session.user);
    const myReviews = useSelector(state => state.reviews.reviewsList)
    let reviewPicked;

    reviewPicked = myReviews.find(i => i.id == reviewId)


    useEffect(() => {
        dispatch(getMyReviewThunk()).then(() => setReviewLoaded(true))
    }, [dispatch, reviewId])

    console.log('star is -- ', reviewStars);
    console.log('review picked ---', myReviews)
    console.log('review id is ---', reviewId)

    const newErrors = [];
    useEffect(() => {
        if (reviewBody.length > 500) {
            newErrors.push('You may only enter review in 500 characters.')
        }
        // if (sessionUser.id !== reviewPicked.user_id) {
        //     newErrors.push('You may only edit your own reviews.')
        // }
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

        await dispatch(editReviewThunk(reviewPicked?.product_id, reviewId, payload)).then((res) => {
            dispatch(getMyReviewThunk())
            setReviewStars()
            setReviewBody('')
            setShowModal(false)
        })
    }

    console.log('review picked', reviewPicked)
    console.log('product id', reviewPicked?.product_id)
    console.log('review id', reviewId)

    const handleDeleteModal = async e => {
        e.preventDefault()
        setShowDelete(true)
    }

    const handleClear = async e => {
        e.preventDefault()
        setReviewStars()
        setAllstars('☆☆☆☆☆')
        setReviewBody('')
    }

    const handleCancel = async e => {
        e.preventDefault()
        setAllstars('☆☆☆☆☆')
        setShowModal(false)
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
        // <div id={reviewId} style={{ display: { ...showStore } }}>
        <div id={reviewId} >

            <form className='editreview-form'>Update My Review
                <h3>Choose Your Review</h3>
                <select className="dropdown-myreviews" onChange={e => setReviewId(e.target.value)} >
                    <option value='' selected disabled hidden>Choose Your Reviews ...</option>
                    {myReviews && myReviews.map(myreview => {

                        return <option key={myreview.id} value={myreview.id}>{myreview.product.name}</option>
                    })
                    }
                </select>
                <div className='editreview-img'><img src={reviewPicked?.image} alt={'product image'}></img></div>
                <div>{reviewPicked?.review_body}</div>
                <div>
                    {errors.map((error, ind) => (
                        <div className='updatereview-error' key={ind}>{error}</div>
                    ))}
                </div>
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
                <button value={reviewId} className='editreview-button' onClick={handleCancel}>Cancel Edit</button>
                {showDelete && (
                    <Modal >
                        <DeleteReview setShowModal={setShowModal} setDeleteReview={setDeleteReview} setShowDelete={setShowDelete} reviewId={reviewId} />
                    </Modal>
                )}
            </form>
        </div >
    )
}
