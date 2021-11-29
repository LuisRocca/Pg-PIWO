import {
        GET_BEERS, 
        GET_BEERS_BY_ID, 
        GET_BEERS_NAME, 
        GET_STYLES,
        GET_REVIEW,
        GET_USERS,
        POST_USER,
        GET_PRODUCTS,
        POST_PRODUCT,
    } from "../actions";

const initialState = {
    beers: [],
    allBeers: [],
    beerId: {},
    stylesBeer: [],
    reviews: [],
    users: [],
    products: [],
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
        case POST_USER:
                return {
                    ...state,
                }
        case GET_USERS:
            return {
                 ...state,
                 users: action.payload 
                }
        case POST_PRODUCT:
            return {
                ...state,
                    }
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload 
                    }
        default:
            return state;
    }
}

export default rootReducer;