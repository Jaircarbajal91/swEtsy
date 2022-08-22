const GET_PRODUCTS = 'products/GET_PRODUCTS';


const getProductsAction = (products) => ({
  type: GET_PRODUCTS,
  products
})



export const getProductsThunk = () => async (dispatch) => {
  const response = await fetch('/api/products/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const products = await response.json();
    dispatch(getProductsAction(products))
  } else {
    const data = await response.json();
    return data.errors;
  }
}


export default function productsReducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      const newState = {};
      action.products.products.forEach(product => {
        newState[product.id] = product
      });
      newState.productsList = [ ...action.products.products ]
      return newState;
    }
    default:
      return state;
  }
}
