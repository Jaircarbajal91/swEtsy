const GET_PRODUCTS = 'products/GET_PRODUCTS';
const CREATE_PRODUCT = 'products/CREATE_PRODUCT';


const getProductsAction = products => ({
  type: GET_PRODUCTS,
  products
})

const createProductAction = product => ({
  type: CREATE_PRODUCT,
  product,
});

export const getProductsThunk = () => async dispatch => {
  const response = await fetch('/api/products/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const products = await response.json();
    dispatch(getProductsAction(products));
    return products;
  } else {
    const data = await response.json();
    return data.errors;
  }
}

export const createProductThunk = payload => async dispatch => {
  const response = await fetch(`/api/products`, {
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
    case CREATE_PRODUCT: {
      const newState = { ...state };
      newState[action.product.id] = action.product;
      return newState;
    }
    default:
      return state;
  }
}
