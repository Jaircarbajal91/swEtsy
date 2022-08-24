const GET_CART_ITEMS = 'cart/GET_CART_ITEMS'
const ADD_ITEM_TO_CART = 'cart/ADD_ITEM_TO_CART'
const EDIT_CART_ITEM = 'cart/EDIT_CART_ITEM'
const DELETE_CART_ITEM = 'cart/DELETE_CART_ITEM'

const getCartItemsAction = cartItems => ({
    type: GET_CART_ITEMS,
    cartItems
});

const addItemToCartAction = cartItem => ({
    type: ADD_ITEM_TO_CART,
    cartItem
});

const editCartItemAction = cartItem => ({
    type: EDIT_CART_ITEM,
    cartItem
});

const deleteCartItemAction = id => ({
    type: DELETE_CART_ITEM,
    id
});

export const getCartItemsThunk = () => async dispatch => {
    const response = await fetch('/api/cart');
    if (response.ok) {
        const cartItems = await response.json();
        dispatch(getCartItemsAction(cartItems));
        return cartItems;
    };
};

export const addCartItemThunk = product => async dispatch => {
    const response = await fetch(`/api/products/${product.id}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        const cartItem = await response.json();
        dispatch(addItemToCartAction(cartItem));
        return cartItem;
    } else {
        const data = await response.json();
        return data.errors;
    }
};

export const editCartItemThunk = product => async dispatch => {
    const response = await fetch(`/api/cart/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        const cartItem = await response.json();
        dispatch(editCartItemAction(cartItem));
        return cartItem;
    } else {
        const data = await response.json();
        return data.errors;
    }
};

export const deleteCartItemThunk = id => async dispatch => {
    const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const deletedItem = await response.json();
        dispatch(deleteCartItemAction(id));
        return deletedItem;
    } else {
        const data = await response.json();
        return data.errors;
    }
};

export default function cartItemsReducer(state = {}, action) {
    switch (action.type) {
        case GET_CART_ITEMS: {
            const newState = {};
            action.cartItems.cart_details.forEach(item => {
                newState[item.id] = item;
            });
            console.log(action.cartItems)
            newState.cartItemsList = [...action.cartItems.cart_details];
            return newState;
        }
        case EDIT_CART_ITEM: {
            const newState = { ...state }
            newState[action.cartItem.id].quantity = action.cartItem.quantity
            return newState
        }
        case ADD_ITEM_TO_CART: {
            const newState = { ...state }
            newState[action.cartItem.id] = action.cartItem
            return newState
        }
        case DELETE_CART_ITEM: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    };
};
