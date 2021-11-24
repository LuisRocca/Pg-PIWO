const initialState = {
    beers: [],
    allBeers: [],
    beerId: {}
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_BEERS':
            state.beers.length = 0;
            state.allBeers.length = 0;
            return {
                ...state,
                beers: state.beers.concat(action.payload),
                allBeers: state.allBeers.concat(action.payload)
            }
        
        case 'GET_BEER_BY_ID':
            return {
                ...state,
                beerId: action.payload
            }

        default:
            return state;
    }
}

export default rootReducer;