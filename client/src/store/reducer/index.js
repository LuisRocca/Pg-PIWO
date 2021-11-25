const initialState = {
    beers: [],
    allBeers: [],
    beerId: {}
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_BEERS':            
            return {
                ...state,
                beers: action.payload,
                allBeers:action.payload
            }
        
        case 'GET_BEER_BY_ID':
            return {
                ...state,
                beerId: action.payload
            }
        
        case 'GET_BEERS_NAME':
            return{
                ...state,
                beers:action.payload
            }
        
        default:
            return state;
    }
}

export default rootReducer;