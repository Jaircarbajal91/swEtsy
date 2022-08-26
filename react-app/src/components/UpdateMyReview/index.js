import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { getMyReviewThunk, editReviewThunk, deleteReviewThunk } from "../../store/review";

export default function EditMyReview(review, showModalprop) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(showModalprop)
    const [reviewStars, setReviewStars] = useState()
    const [reviewBody, setReviewBody] = useState('')
    const [reviewLoaded, setReviewLoaded] = useState(false)
    const [errors, setErrors] = useState([])
    const sessionUser = useSelector(state => state.session.user);
    let reviewId = review?.review?.split(",")[0]
    let productId = review?.review?.split(",")[1]
    // console.log("in modal -- review id", reviewId)
    // console.log("in modal -- product id", productId)
    // console.log("in modal --  session user id", sessionUser.id)

    useEffect(() => {
        dispatch(getMyReviewThunk()).then(() => setReviewLoaded(true))
    }, [])

    const myReviews = useSelector(state => state.reviews.reviewsList)
    let theReview = myReviews.filter(each => each.id.id)


    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            id: reviewId,
            stars: reviewStars,
            review_body: reviewBody,
            product_id: productId,
            user_id: sessionUser.id
        }
        dispatch(editReviewThunk(payload.product_id, payload)).then((res) => {
            setReviewStars()
            setReviewBody('')
        })
        setShowModal(false)
        // .catch(
        //     async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) {
        //             setErrors(data.errors)
        //         }
        //     }
        // )
    }

    console.log('what is modal', showModal)
    const handleCancel = async e => {
        e.preventDefault()
        setReviewStars()
        setReviewBody('')
        setShowModal(false)
    }

    return showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <form>My Review
                {/* <div>{review.product.name}1111</div>
            <div>{review.product.description}</div>
            <div><img src={review.product.image} alt={'product image'}></img></div>
             */}
                <section class="star rrating-container">
                    <input type="radio" name="ratingStar" class="rating" value="1" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="2" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="3" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="4" onClick={e => setReviewStars(e.target.value)} />
                    <input type="radio" name="ratingStar" class="rating" value="5" onClick={e => setReviewStars(e.target.value)} />
                </section>
                <input
                    type='text'
                    placeholder='write a review for this item'
                    // placeholder={review?.review?.slice(2)}
                    onChange={e => setReviewBody(e.target.value)}
                    value={reviewBody}
                ></input>
                <br></br>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSubmit}>Edit Review</button>
            </form>
        </Modal >
    )
}
