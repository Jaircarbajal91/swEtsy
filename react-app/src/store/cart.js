const GET_CART_ITEMS = 'cart/GET_CART_ITEMS'
const EDIT_CART_ITEM = 'cart/EDIT_CART_ITEM'

const getCartItemsAction = cartItems => ({
    type: GET_CART_ITEMS,
    cartItems
});

export const getCartItemsThunk = () => async dispatch => {
    const response = await fetch('/api/cart');
    if (response.ok) {
        const cartItems = await response.json();
        dispatch(getCartItemsAction(cartItems));
        return cartItems;
    };
};

export default function cartItemsReducer(state = {}, action) {
    switch (action.type) {
        case GET_CART_ITEMS: {
            const newState = {};
            action.cartItems.cart_details.forEach(item => {
                newState[item.id] = item;
            });
            newState.cartItemsList = [ ...action.cartItems.cart_details ];
            return newState;
        };
        default:
            return state;
    };
};
