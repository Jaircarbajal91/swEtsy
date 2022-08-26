

{
    showModal &&
        <Modal onClose={() => setShowModal(false)} review={review} >
            <form>
                My Review
                <div>{review.product.name}</div>
                <div>{review.product.description}</div>
                <div><img src={review.product.image} alt={'product image'}></img></div>
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
                <button onClick={handleCancel} value={review.product.id}>Cancel</button>
                <button onClick={handleSubmit}>Edit Review</button>
            </form>
        </Modal>
}
