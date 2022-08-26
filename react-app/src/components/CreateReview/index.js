import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { getReviewsThunk, createReviewThunk, editReviewThunk, deleteReviewThunk } from "../../store/review";


export default function AddAReviewModal(product) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false)
    const [reviewStars, setReviewStars] = useState()
    const [reviewBody, setReviewBody] = useState('')
    const [errors, setErrors] = useState([])

    const sessionUser = useSelector(state => state.session.user);

    const id = product.product.id
    console.log('owner is ', product.product.owner_id)
    useEffect(() => {
        dispatch(getReviewsThunk(id))
    }, [id, showModal])

    // useEffect(() => {
    //     if ()
    // }, [id, showModal])

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
            // setShowModal(false)
            if (res.review.error) {
                setErrors(res.review.error)
            }
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
                <button onClick={() => setShowModal(true)}>Add a Review</button>
            </div>
            {showModal &&
                <Modal onClose={() => setShowModal(false)} >
                    <form>
                        My Review
                        <div>{product.product.name}</div>
                        <div>{product.product.description}</div>
                        <div><img src={product.product.image} alt={'product image'} maxheight={'300px'}></img></div>
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
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
                        <button onClick={handleSubmit}>Submit Review</button>
                    </form>

                </Modal>}
        </>
    )
}
