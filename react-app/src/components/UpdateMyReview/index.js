import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMyReviewThunk, editReviewThunk, deleteReviewThunk } from "../../store/review";

export default function EditMyReview(review, showStore, setShowStore) {
    const dispatch = useDispatch();
    // const [showModal, setShowModal] = useState(showModalprop)
    const [reviewStars, setReviewStars] = useState()
    const [reviewBody, setReviewBody] = useState('')
    const [reviewLoaded, setReviewLoaded] = useState(false)
    const [errors, setErrors] = useState([])
    const sessionUser = useSelector(state => state.session.user);
    let reviewId = review.review.id
    let productId = review.review.product.id

    useEffect(() => {
        dispatch(getMyReviewThunk()).then(() => setReviewLoaded(true))
    }, [dispatch])

    const myReviews = useSelector(state => state.reviews.reviewsList)

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            stars: reviewStars,
            review_body: reviewBody,
        }
        console.log('in handleSubmit - previewId', reviewId)
        console.log('in handleSubmit - productId', productId)
        await dispatch(editReviewThunk(productId, reviewId, payload)).then((res) => {
            dispatch(getMyReviewThunk())
            setReviewStars()
            setReviewBody('')
        })
        // .catch(
        //     async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) {
        //             setErrors(data.errors)
        //         }
        //     }
        // )
        let x = document.getElementById(`${e.target.value}`)
        x.style.display == "none" ? x.style.display = "block" : x.style.display = "none"
    }
    const handleDelete = async e => {
        e.preventDefault()
        let id = Number(e.currentTarget.value)
        await dispatch(deleteReviewThunk(id)).then(() => console.log('deleted! id is ', id))
        await dispatch(getMyReviewThunk())
    }

    return (
        <div id={reviewId} style={{ display: showStore }}>
            <form>My Review
                < section class="star rrating-container" >
                    <input type="radio" name="ratingStar" class="rating" value="1" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="2" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="3" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="4" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="5" onClick={e => setReviewStars(e.target.value)} />
                </section >
                <input
                    type='text'
                    placeholder='write a review for this item'
                    // placeholder={review.review.id}
                    onChange={e => setReviewBody(e.target.value)}
                    value={reviewBody}
                ></input>
                <br></br>
                <button value={reviewId} onClick={handleSubmit}>Update My Review</button>
                <button value={reviewId} onClick={handleDelete}>Delete</button>
            </form>
        </div >
    )
}
