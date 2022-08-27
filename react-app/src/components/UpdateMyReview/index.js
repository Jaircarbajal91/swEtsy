import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyReviewThunk, editReviewThunk, deleteReviewThunk } from "../../store/review";

export default function EditMyReview({ review, showStore, setFold }) {
    const dispatch = useDispatch();
    const [reviewStars, setReviewStars] = useState()
    const [reviewBody, setReviewBody] = useState('')
    const [reviewLoaded, setReviewLoaded] = useState(false)
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

    const handleDelete = async e => {
        e.preventDefault()
        let id = Number(e.currentTarget.value)
        await dispatch(deleteReviewThunk(id)).then(() => console.log('deleted! id is ', id))
        await dispatch(getMyReviewThunk())
    }

    const handleClear = async e => {
        e.preventDefault()
        setReviewBody('')
    }

    return reviewLoaded && (
        <div id={reviewId} style={{ display: { ...showStore } }}>
            <form>My Review
                < section class="star rrating-container" >
                    <input type="radio" name="ratingStar" class="rating" value="1" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="2" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="3" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="4" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="5" onClick={e => setReviewStars(e.target.value)} />
                </section >
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <input
                    type='text'
                    placeholder='write a review for this item'
                    onChange={e => setReviewBody(e.target.value)}
                    value={reviewBody}
                    maxLength={501}
                ></input>
                <br></br>
                <button value={reviewId} onClick={handleSubmit} disabled={isDisabled}>Update My Review</button>
                <button value={reviewId} onClick={handleClear}>Clear</button>
                <button value={reviewId} onClick={handleDelete}>Delete</button>
            </form>
        </div >
    )
}
