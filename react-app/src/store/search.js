const GET_SEARCH = 'search/GET_SEARCH';

const getSearchAction = data => ({
    type: GET_SEARCH,
    data
})

export const getSearchThunk = filters => async dispatch => {
    const response = await fetch(`/api/search?${filters}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getSearchAction(data));
        return data;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export default function searchReducer(state = {}, action) {
    switch (action.type) {
        case GET_SEARCH: {
            const newState = {};
            action.data.products.forEach(product => {
                newState[product.id] = product
            });
            newState.products = [...action.data.products]
            newState.page = action.data.page
            newState.order = action.data.order
            newState.size = action.data.size
            return newState;
        }

        default:
            return state;
    }
}
