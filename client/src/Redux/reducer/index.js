import {
        GET_BEERS, 
        GET_BEERS_BY_ID, 
        GET_BEERS_NAME, 
        GET_STYLES,
        GET_REVIEW,
        GET_USERS,
        POST_USER,
        POST_PRODUCT,
        ADD_BEERS_OF_CATEGORY,
        DELETE_BEERS_CATEGORY
    } from "../actions";

const initialState = {
    beers: [],
    allBeers: [],
    beerId: {},
    stylesBeer: [],
    beersOfCategory: [],
    reviews: [],
    users: [],
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
                beersOfCategory:[]
            }
        case ADD_BEERS_OF_CATEGORY:
            return action.payload === ''? state : state.beersOfCategory.includes(action.payload)? state : {
                ...state,
                beersOfCategory: [ ...state.beersOfCategory, action.payload]
            }
        case DELETE_BEERS_CATEGORY:
            return {
                ...state,
                beersOfCategory: state.beersOfCategory.filter(el => el.name !== action.payload)
            }
        default:
            return state;
    }
}

export default rootReducer;