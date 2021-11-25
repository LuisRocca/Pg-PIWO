import {
        GET_BEERS, 
        GET_BEERS_BY_ID, 
        GET_BEERS_NAME, 
        GET_STYLES,
        GET_REVIEW,
    } from "../actions";

const initialState = {
    beers: [],
    allBeers: [],
    beerId: {},
    stylesBeer: [],
    reviews: [],
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_BEERS:
            state.beers.length = 0;
            state.allBeers.length = 0;
     
            return {
                ...state,
                beers: state.beers.concat(action.payload),
                allBeers: state.allBeers.concat(action.payload)
            }
        
        case GET_BEERS_BY_ID:
            return {
                ...state,
                beerId: action.payload
            }

        case GET_REVIEW:
            return {
                ...state,
                reviews: action.payload
            }
        
        case GET_BEERS_NAME:
            return{
                ...state,
                beers:action.payload
            }
        case GET_STYLES:
            return{
                ...state,
                stylesBeer: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;