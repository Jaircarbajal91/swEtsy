import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { getReviewsThunk, editReviewThunk, deleteReviewThunk } from "../../store/review";

export default function EditMyReview(reviewId, showModalprop) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(showModalprop)
    const [reviewStars, setReviewStars] = useState()
    const [reviewBody, setReviewBody] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            stars: reviewStars,
            review_body: reviewBody,
            product_id: reviewBody,
            user_id: reviewBody
        }
        dispatch(editReviewThunk(reviewBody, payload)).then((res) => {
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
        <Modal reviewId={reviewId} onClose={() => setShowModal(false)}>
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
