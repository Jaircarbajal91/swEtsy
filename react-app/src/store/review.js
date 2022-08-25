const GET_REVIEW = 'reviews/GET_REVIEW';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';


const getProductsAction = reviews => ({
    type: GET_REVIEW,
    reviews
})

const createProductAction = review => ({
    type: CREATE_REVIEW,
    review,
});

const editProductAction = review => ({
    type: EDIT_REVIEW,
    review,
});


const deleteProductAction = review => ({
    type: DELETE_REVIEW,
    review
});

export const getReviewThunk = id => async dispatch => {
    const response = await fetch(`/api/products/${id}/reviews/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviewAction(reviews));
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
        dispatch(getReviewAction(reviews));
        return reviews;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const createProductThunk = payload => async dispatch => {
    const response = await fetch(`/api/products/`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const newProduct = await response.json();
        dispatch(createProductAction(newProduct));
        return newProduct;
    } else {
        const data = await response.json();
        return data.errors;
    };
};

export const editProductThunk = product => async dispatch => {
    const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        const product = await response.json();
        dispatch(editProductAction(product));
        return product;
    } else {
        const data = await response.json();
        return data.errors;
    }
}


export const deleteProductThunk = id => async dispatch => {
    const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const deleted = await response.json();
        dispatch(deleteProductAction(id));
        return deleted;
    } else {
        const data = await response.json();
        return data.errors;
    };
};

export default function productsReducer(state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTS: {
            const newState = {};
            action.products.products.forEach(product => {
                newState[product.id] = product
            });
            newState.productsList = [...action.products.products]
            return newState;
        }
        case CREATE_PRODUCT: {
            const newState = { ...state };
            newState[action.product.id] = action.product;
            return newState;
        }
        case EDIT_PRODUCT: {
            return {
                ...state,
                [action.product.id]: action.product,
            }
        }
        case DELETE_PRODUCT: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}
