const GET_SEARCH = 'search/GET_SEARCH';

const getSearchAction = filters => ({
    type: GET_SEARCH,
    filters
})

export const getSearchThunk = filters => async dispatch => {
    const response = await fetch(`/api/search?${filters}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
    });
    if (response.ok) {
        const products = await response.json();
        dispatch(getSearchAction(products));
        return products;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export default function searchReducer(state = {}, action) {
    switch (action.type) {
        case GET_SEARCH: {
            const newState = {};
            action.filters.forEach(product => {
                newState[product.id] = product
            });
            newState.productsList = [...action.products.products]
            return newState;
        }

        default:
            return state;
    }
}
