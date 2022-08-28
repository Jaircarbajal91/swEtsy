import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Modal } from '../../context/Modal';
import { getReviewsThunk, createReviewThunk } from "../../store/review";
import './createReview.css'


export default function AddAReview({ product }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false)
    const [reviewStars, setReviewStars] = useState()
    const [reviewBody, setReviewBody] = useState('')
    const [errors, setErrors] = useState([])
    const [isDisabled, setIsDisabled] = useState(true);

    const sessionUser = useSelector(state => state.session.user);
    // const productReviews = useSelector(state => state.products.reviews);
    const id = product.id

    useEffect(() => {
        dispatch(getReviewsThunk(id))
    }, [id, showModal])

    const newErrors = [];

    useEffect(() => {
        if (sessionUser && product.reviews.some(e => e.user_id === sessionUser.id)) {
            newErrors.push(`You have already reviewed this product.`, `Please edit/delete under My Reviews.`, <NavLink className='review-redirect' to='https://swetsy-app.herokuapp.com/myreviews' style={{ color: '#472600', textDecoration: 'none' }}>Take me to My Reviews ...</NavLink>)
        }
        else {
            if (reviewStars == undefined) {
                newErrors.push('* Please give this product a rating.')
            }
            if (reviewBody.length > 500) {
                newErrors.push('You may only enter review in 500 characters.')
            }
        }
        setErrors(newErrors)
        if (!errors.length) setIsDisabled(false);
        else setIsDisabled(true)
    }, [reviewStars, reviewBody.length, errors.length, showModal])

    // console.log('starr--', reviewStars)
    // console.log(errors)

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            stars: reviewStars,
            review_body: reviewBody,
            product_id: product.id,
            user_id: sessionUser.id
        }

        dispatch(createReviewThunk(id, payload)).then((res) => {
            setReviewStars()
            setReviewBody('')
            setShowModal(false)
        })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) newErrors.push(data.errors)
            })
    }

    const handleCancel = async e => {
        e.preventDefault()
        setReviewStars()
        setReviewBody('')
        setShowModal(false)
    }

    return sessionUser && (
        <>
            <div className="button add-a-review">
                <button onClick={() => setShowModal(true)} hidden={product.owner_id === sessionUser.id}>Add a Review</button>
            </div>
            {showModal &&
                <Modal className='createreview-modal' onClose={() => setShowModal(false)} >
                    <form className='createreview-form'>
                        <div className='createreview-name'>{product.name}</div>
                        <div className='createreview-des'>{product.description}</div>
                        <div className='createreview-img'><img src={product.image} alt={'product image'}></img></div>
                        <div>
                            {errors.map((error, ind) => (
                                <div className='createreview-error' key={ind}>{error}</div>
                            ))}
                        </div>
                        <section className="star-rating-container">
                            <input type="radio" name="ratingStar" className="rating" value="1" onClick={e => setReviewStars(e.target.value)} />
                            <input type="radio" name="ratingStar" className="rating" value="2" onClick={e => setReviewStars(e.target.value)} />
                            <input type="radio" name="ratingStar" className="rating" value="3" onClick={e => setReviewStars(e.target.value)} />
                            <input type="radio" name="ratingStar" className="rating" value="4" onClick={e => setReviewStars(e.target.value)} />
                            <input type="radio" name="ratingStar" className="rating" value="5" onClick={e => setReviewStars(e.target.value)} />
                        </section>
                        <textarea
                            type='textarea'
                            placeholder='write a review for this item'
                            onChange={e => setReviewBody(e.target.value)}
                            value={reviewBody}
                            maxLength={501}
                            className='createreview-reviewbody'
                        ></textarea>
                        <div>
                            <button className='createreview-button' onClick={handleCancel}>Cancel</button>
                            <button className='createreview-button' onClick={handleSubmit} disabled={isDisabled}>Submit Review</button>
                        </div>
                    </form>

                </Modal>}
        </>
    )
}
