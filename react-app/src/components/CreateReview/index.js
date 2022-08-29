import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
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
    // const productReviews = useSelector(state => state.products.reviews);
    const id = product.id

    useEffect(() => {
        dispatch(getReviewsThunk(id))
    }, [id, showModal])

    const newErrors = [];

    useEffect(() => {
        if (sessionUser && product.reviews.some(e => e.user_id === sessionUser.id)) {
            // newErrors.push(`You have already reviewed this product.`, `Please edit/delete under My Reviews.`, <Navlink className='review-redirect' to='/myreviews' style={{ color: '#472600', textDecoration: 'none' }}>Take me to My Reviews ...</NavLink>)
            newErrors.push(`You have already reviewed this product.`, `Please edit/delete under  - My Reviews - `)
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
            .then(() => dispatch(getProductsThunk()))
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
        setAllstars('☆☆☆☆☆')
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

    return sessionUser && (
        <>
            <div className="add-a-review">
                <button className="button button-add-a-review" onClick={() => setShowModal(true)} hidden={product.owner_id === sessionUser.id}>Add a Review</button>
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
                        {/* <section className="star-rating-container">
                            <input type="radio" name="ratingStar" className="rating" value="1" onClick={e => setReviewStars(e.target.value)} />
                            <input type="radio" name="ratingStar" className="rating" value="2" onClick={e => setReviewStars(e.target.value)} />
                            <input type="radio" name="ratingStar" className="rating" value="3" onClick={e => setReviewStars(e.target.value)} />
                            <input type="radio" name="ratingStar" className="rating" value="4" onClick={e => setReviewStars(e.target.value)} />
                            <input type="radio" name="ratingStar" className="rating" value="5" onClick={e => setReviewStars(e.target.value)} />
                        </section> */}
                        < div className="star-rating-container" >
                            <div className="radio-label-container">
                                <label htmlFor='r6' className='rating-label-all'>{allstars}</label>
                                <input type="radio" id='r1' className="rating-radio" value="5" onClick={handleStars}></input>
                                <label htmlFor='r1' className='rating-label'>☆</label>
                                <input type="radio" id='r2' className="rating-radio" value="4" onClick={handleStars}></input>
                                <label htmlFor='r2' className='rating-label'>☆</label>
                                <input type="radio" id='r3' className="rating-radio" value="3" onClick={handleStars}></input>
                                <label htmlFor='r3' className='rating-label'>☆</label>
                                <input type="radio" id='r4' className="rating-radio" value="2" onClick={handleStars}></input>
                                <label htmlFor='r4' className='rating-label'>☆</label>
                                <input type="radio" id='r5' className="rating-radio" value="1" onClick={handleStars}></input>
                                <label htmlFor='r5' className='rating-label'>☆</label>
                            </div>
                        </div >
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
