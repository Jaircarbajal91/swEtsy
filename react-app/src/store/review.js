const GET_REVIEW = 'reviews/GET_REVIEW';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';


const getReviewsAction = reviews => ({
    type: GET_REVIEW,
    reviews
})

const createReviewsAction = review => ({
    type: CREATE_REVIEW,
    review,
});

const editReviewAction = review => ({
    type: EDIT_REVIEW,
    review,
});


const deleteReviewAction = id => ({
    type: DELETE_REVIEW,
    id
});

export const getReviewsThunk = id => async dispatch => {
    const response = await fetch(`/api/products/${id}/reviews/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviewsAction(reviews));
        return reviews;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const getMyReviewThunk = () => async dispatch => {
    const response = await fetch(`/api/users/reviews/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviewsAction(reviews));
        return reviews;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const createReviewThunk = (id, review) => async dispatch => {
    const response = await fetch(`/api/products/${id}/`, {
        method: 'POST',
        body: JSON.stringify(review),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReviewsAction(newReview));
        return newReview;
        // console.log('res.ok is----', newReview)
    } else {
        const data = await response.json();
        // console.log('revs.NOT ok details is----', data.errors)
        return data.errors;
    };
};

export const editReviewThunk = (productId, reviewId, review) => async dispatch => {
    const response = await fetch(`/api/products/${productId}/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(review),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        // console.log("in thunk good--> ", reviewId)
        const review = await response.json();
        dispatch(editReviewAction(review));
        return review;
    } else {
        // console.log("in thunk bad--> ", reviewId)
        const data = await response.json();
        return data.errors;
    }
}


export const deleteReviewThunk = id => async dispatch => {
    const response = await fetch(`/api/reviews/${id}/`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const deleted = await response.json();
        dispatch(deleteReviewAction(id));
        return deleted;
    } else {
        const data = await response.json();
        return data.errors;
    };
};

export default function productsReducer(state = {}, action) {
    switch (action.type) {
        case GET_REVIEW: {
            const newState = {};
            action.reviews.review_details.forEach(review => {
                newState[review.id] = review
            });
            newState.reviewsList = [...action.reviews.review_details]
            return newState;
        }
        case CREATE_REVIEW: {
            const newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        }
        case EDIT_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review,
            }
        }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}
