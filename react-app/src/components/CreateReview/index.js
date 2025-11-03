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
    const [errors, setErrors] = useState([])
    const [isDisabled, setIsDisabled] = useState(true);
    const [hoveredStar, setHoveredStar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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
                newErrors.push('Please give this product a rating.')
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
        setIsLoading(true);
        const payload = {
            stars: reviewStars,
            review_body: reviewBody,
            product_id: product.id,
            user_id: sessionUser.id
        }

        try {
            await dispatch(createReviewThunk(id, payload))
            setIsLoading(false);
            setShowSuccess(true);
            setTimeout(() => {
                setReviewStars()
                setReviewBody('')
                setShowSuccess(false);
                setShowModal(false)
                dispatch(getProductsThunk())
            }, 1500);
        } catch (res) {
            setIsLoading(false);
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
    }

    const handleStars = async e => {
        e.preventDefault()
        const value = parseInt(e.target.value)
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
                        {errors.length > 0 && (
                            <div className="error-container">
                                {errors.map((error, ind) => (
                                    <div className='createreview-error' key={ind}>
                                        <svg className="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>{error}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="star-rating-container">
                            <label className="rating-prompt">Rate this product</label>
                            <div 
                                className="star-rating-wrapper" 
                                data-selected-rating={reviewStars || 0}
                                data-hover-rating={hoveredStar || 0}
                                onMouseLeave={() => setHoveredStar(null)}
                            >
                                {[5, 4, 3, 2, 1].map((starValue) => {
                                    // Array is [5,4,3,2,1] so star 5 is leftmost, star 1 is rightmost
                                    // Fill stars from right: if rating is N, we want the N rightmost stars filled
                                    // Example: rating 1 means fill star 1 (rightmost)
                                    // rating 2 means fill stars 1, 2 (rightmost 2)
                                    // rating 5 means fill all stars 5,4,3,2,1
                                    const shouldBeFilled = reviewStars && starValue <= reviewStars;
                                    // For hover: if hovering star with value N, highlight all stars <= N (rightmost up to N)
                                    // hoveredStar = 1 (rightmost) → highlight star 1 only
                                    // hoveredStar = 2 → highlight stars 1, 2
                                    // hoveredStar = 5 (leftmost) → highlight all stars 5,4,3,2,1
                                    const isHovered = hoveredStar && starValue <= hoveredStar && !reviewStars;
                                    return (
                                        <React.Fragment key={starValue}>
                                            <input 
                                                type="radio" 
                                                id={`r${starValue}`} 
                                                className="rating-radio" 
                                                value={starValue} 
                                                onChange={handleStars} 
                                                checked={reviewStars === starValue} 
                                            />
                                            <label 
                                                htmlFor={`r${starValue}`} 
                                                className={`rating-star-label ${shouldBeFilled ? 'star-filled' : ''} ${isHovered ? 'star-hovered' : ''}`}
                                                data-rating={starValue}
                                                onMouseEnter={() => setHoveredStar(starValue)}
                                            >
                                                <svg className="star-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </label>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                            {reviewStars && (
                                <div className="rating-value-display">
                                    {reviewStars} {reviewStars === 1 ? 'star' : 'stars'}
                                </div>
                            )}
                        </div>
                        <div className="textarea-wrapper">
                            <textarea
                                placeholder='Share your experience with this product... What did you like? What could be improved?'
                                onChange={e => setReviewBody(e.target.value)}
                                value={reviewBody}
                                maxLength={500}
                                className='createreview-reviewbody'
                            />
                            <div className="character-count">
                                <span className={reviewBody.length > 450 ? 'character-count-warning' : ''}>
                                    {reviewBody.length}
                                </span>
                                <span className="character-count-separator">/</span>
                                <span>500</span>
                            </div>
                        </div>
                        {showSuccess && (
                            <div className="success-message">
                                <svg className="success-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Review submitted successfully!</span>
                            </div>
                        )}
                        <div className="review-buttons">
                            <button 
                                type="button" 
                                className='createreview-button' 
                                onClick={handleCancel}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className='createreview-button' 
                                onClick={handleSubmit} 
                                disabled={isDisabled || isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
                                                <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416;0 31.416" repeatCount="indefinite"/>
                                                <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416;-31.416" repeatCount="indefinite"/>
                                            </circle>
                                        </svg>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    'Submit Review'
                                )}
                            </button>
                        </div>
                    </form>
                </Modal>}
        </>
    )
}