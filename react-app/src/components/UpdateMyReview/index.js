import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMyReviewThunk, editReviewThunk } from "../../store/review";
import './updateMyReview.css'

export default function EditMyReview({ review, setShowModal }) {
    const dispatch = useDispatch();
    const [reviewLoaded, setReviewLoaded] = useState(false)
    const [reviewStars, setReviewStars] = useState(review?.stars)
    const [reviewBody, setReviewBody] = useState(review?.review_body)
    const [errors, setErrors] = useState([])
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        dispatch(getMyReviewThunk()).then(() => setReviewLoaded(true))
    }, [dispatch])

    useEffect(() => {
        const newErrors = [];
        if (reviewBody?.length > 500) {
            newErrors.push('You may only enter review in 500 characters.')
        }
        setErrors(newErrors)
        setIsDisabled(newErrors.length > 0);
    }, [reviewBody?.length])

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            stars: reviewStars,
            review_body: reviewBody,
        }

        await dispatch(editReviewThunk(review?.product_id, review?.id, payload)).then((res) => {
            dispatch(getMyReviewThunk())
            setShowModal(false)
        })

    }

    const handleCancel = async e => {
        e.preventDefault()
        setShowModal(false)
    }

    const handleStarClick = (rating) => {
        setReviewStars(rating)
    }


    return reviewLoaded && (
        <div className='editreview-modal-wrapper'>
            <form className='editreview-form'>
                <h2 className='editreview-title'>Reviews</h2>
                <div className='editreview-product-info'>
                    <div className='editreview-product-image'>
                        <img src={review?.product?.image} alt={review?.product?.name} />
                    </div>
                    <div className='editreview-name'>{review?.product?.name}</div>
                </div>
                <div>
                    {errors.map((error, ind) => (
                        <div className='updatereview-error' key={ind}>{error}</div>
                    ))}
                </div>
                <div className="editreview-star-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`editreview-star ${star <= reviewStars ? 'active' : ''}`}
                            onClick={() => handleStarClick(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <div className='editreview-textarea-container'>
                    <textarea
                        type='textarea'
                        placeholder='write a review for this item'
                        onChange={e => setReviewBody(e.target.value)}
                        value={reviewBody}
                        maxLength={501}
                        className='editreview-textarea'
                    ></textarea>
                </div>
                <div className='editreview-buttons'>
                    <button className='editreview-button editreview-button-primary' onClick={handleSubmit} disabled={isDisabled}>Update Review</button>
                    <button className='editreview-button editreview-button-secondary' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
