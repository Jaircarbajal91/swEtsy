const GET_CART_ITEMS = 'cart/GET_CART_ITEMS'
const EDIT_CART_ITEM = 'cart/EDIT_CART_ITEM'

const getCartItemsAction = cartItems => ({
    type: GET_CART_ITEMS,
    cartItems
});

export const getCartItemsThunk = () => async dispatch => {
    const response = await fetch('/api/')
}
