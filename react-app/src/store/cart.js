const GET_CART_ITEMS = 'cart/GET_CART_ITEMS'
const ADD_ITEM_TO_CART = 'cart/ADD_ITEM_TO_CART'
const EDIT_CART_ITEM = 'cart/EDIT_CART_ITEM'
const DELETE_CART_ITEM = 'cart/DELETE_CART_ITEM'
const DELETE_CART = 'cart/DELETE_CART';

const getCartItemsAction = cartItems => ({
    type: GET_CART_ITEMS,
    cartItems
});

const addItemToCartAction = cartItem => ({
    type: ADD_ITEM_TO_CART,
    cartItem
});

const editCartItemAction = (id, quantity) => ({
    type: EDIT_CART_ITEM,
    id,
    quantity,
});

const deleteCartItemAction = id => ({
    type: DELETE_CART_ITEM,
    id
});

const deleteCartAction = () => ({
    type: DELETE_CART,
});

export const getCartItemsThunk = () => async dispatch => {
    const response = await fetch('/api/cart');
    if (response.ok) {
        const cartItems = await response.json();
        dispatch(getCartItemsAction(cartItems));
        return cartItems;
    };
};

export const addCartItemThunk = (id, quantity) => async dispatch => {
    const response = await fetch(`/api/products/${id}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quantity)
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

export const editCartItemThunk = (id, quantity) => async dispatch => {
    const response = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
    });
    if (response.ok) {
        const cartItem = await response.json();
        dispatch(editCartItemAction(id, quantity));
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

export const deleteCartThunk = () => async dispatch => {
    const response = await fetch('/api/cart', {method: 'DELETE'});
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteCartAction());
        return data;
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
            newState.cartItemsList = [...action.cartItems.cart_details].sort((a, b) => a.id - b.id);
            return newState;
        }
        case EDIT_CART_ITEM: {
            // console.log(action)
            const newState = { ...state }
            newState[action.id].quantity = action.quantity
            return newState
        }
        case ADD_ITEM_TO_CART: {
            const newState = { ...state }
            newState[action.cartItem.id] = action.cartItem
            return newState
        }
        case DELETE_CART_ITEM: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        case DELETE_CART: {
            return { cartItemsList: [] };
        }
        default:
            return state;
    };
};
