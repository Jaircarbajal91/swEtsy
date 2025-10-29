import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { getReviewsThunk, createReviewThunk } from "../../store/review";
import { getProductsThunk } from '../../store/products'
import '../ProductDetail/ProductDetail.css';
import './createReview.css'

export default function AddAReview({ product }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false)
    const [reviewStars, setReviewStars] = useState()
    const [reviewBody, setReviewBody] = useState('')
    const [allstars, setAllstars] = useState('☆☆☆☆☆')
    const [errors, setErrors] = useState([])
    const [isDisabled, setIsDisabled] = useState(true);

    const sessionUser = useSelector(state => state.session.user);
    const id = product.id

    const getReviews = useCallback(() => {
        dispatch(getReviewsThunk(id))
    }, [dispatch, id])

    useEffect(() => {
        getReviews()
    }, [getReviews, showModal])

    const validateReview = useCallback(() => {
        const newErrors = [];

        if (sessionUser && product.reviews.some(e => e.user_id === sessionUser.id)) {
            newErrors.push(`You have already reviewed this product.`, `Please edit/delete under My Reviews`)
        } else {
            if (reviewStars === undefined) {
                newErrors.push('* Please give this product a rating.')
            }
            if (reviewBody.length > 500) {
                newErrors.push('You may only enter review in 500 characters.')
            }
        }
        
        setErrors(newErrors)
        setIsDisabled(newErrors.length > 0)
    }, [reviewStars, reviewBody.length, sessionUser, product.reviews])

    useEffect(() => {
        validateReview()
    }, [validateReview])

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            stars: reviewStars,
            review_body: reviewBody,
            product_id: product.id,
            user_id: sessionUser.id
        }

        try {
            await dispatch(createReviewThunk(id, payload))
            setReviewStars()
            setReviewBody('')
            setShowModal(false)
            dispatch(getProductsThunk())
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(prev => [...prev, ...data.errors])
            }
        }
    }

    const handleCancel = async e => {
        e.preventDefault()
        setReviewStars()
        setReviewBody('')
        setShowModal(false)
        setAllstars('☆☆☆☆☆')
    }

    const handleStars = async e => {
        e.preventDefault()
        const value = parseInt(e.target.value)
        
        const starMap = {
            1: '☆☆☆☆★',
            2: '☆☆☆★★',
            3: '☆☆★★★',
            4: '☆★★★★',
            5: '★★★★★'
        }
        
        setAllstars(starMap[value] || '☆☆☆☆☆')
        setReviewStars(value)
    }

    return sessionUser && (
        <>
            <div className="add-a-review">
                <button 
                    className="button button-add-a-review" 
                    onClick={() => setShowModal(true)} 
                    hidden={product.owner_id === sessionUser.id}
                >
                    Add a Review
                </button>
            </div>
            {showModal &&
                <Modal className='createreview-modal' onClose={() => setShowModal(false)} >
                    <form className='createreview-form'>
                        <div className='createreview-name'>{product.name}</div>
                        <div className='createreview-des'>{product.description}</div>
                        <div className='createreview-img'>
                            <img src={product.image} alt={`${product.name} product`} />
                        </div>
                        <div>
                            {errors.map((error, ind) => (
                                <div className='createreview-error' key={ind}>{error}</div>
                            ))}
                        </div>
                        <div className="star-rating-container">
                            <div className="radio-label-container">
                                <label htmlFor='r6' className='rating-label-all'>{allstars}</label>
                                <input type="radio" id='r1' className="rating-radio" value="5" onClick={handleStars} />
                                <label htmlFor='r1' className='rating-label'>☆</label>
                                <input type="radio" id='r2' className="rating-radio" value="4" onClick={handleStars} />
                                <label htmlFor='r2' className='rating-label'>☆</label>
                                <input type="radio" id='r3' className="rating-radio" value="3" onClick={handleStars} />
                                <label htmlFor='r3' className='rating-label'>☆</label>
                                <input type="radio" id='r4' className="rating-radio" value="2" onClick={handleStars} />
                                <label htmlFor='r4' className='rating-label'>☆</label>
                                <input type="radio" id='r5' className="rating-radio" value="1" onClick={handleStars} />
                                <label htmlFor='r5' className='rating-label'>☆</label>
                            </div>
                        </div>
                        <textarea
                            placeholder='Write a review for this item'
                            onChange={e => setReviewBody(e.target.value)}
                            value={reviewBody}
                            maxLength={501}
                            className='createreview-reviewbody'
                        />
                        <div className="review-buttons">
                            <button type="button" className='createreview-button' onClick={handleCancel}>
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className='createreview-button' 
                                onClick={handleSubmit} 
                                disabled={isDisabled}
                            >
                                Submit Review
                            </button>
                        </div>
                    </form>
                </Modal>}
        </>
    )
}