import {
        GET_BEERS, 
        GET_BEERS_BY_ID, 
        GET_BEERS_NAME, 
        GET_STYLES,
        GET_REVIEW,
        CREATE_USERS,
        LIST_USERS,
        LIST_USER,
        ADD_CART,
        DEL_CART,
        DEL_ALL_CART,
        MOD_CART,
    } from "../actions"


const initialState = {
    beers: [],
    allBeers: [],
    beerId: {},
    stylesBeer: [],
    reviews: [],
    users: [],
    user:[],
    listUser: [],
    cart: [],

}


function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_BEERS:
            state.beers.length = 0;
            state.allBeers.length = 0;
     
            return {
                ...state,
                beers: state.beers.concat(action.payload),
                allBeers: state.allBeers.concat(action.payload),
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
            case CREATE_USERS: 
                return { ...state, users: state.users.concat(action.payload) 
                }
    
                case LIST_USERS: {
                    return {...state, users: state.users.concat(action.payload) }
                }
                case LIST_USER: {
                    return {...state, listUser: action.payload }
                }

        case GET_STYLES:
            return{
                ...state,
                stylesBeer: action.payload
            }
        
        case ADD_CART:
            let newItem = state.beers.find((p) => p.id === action.payload)
            
            let itemInCart = state.cart.find((i) => i.id === newItem.id)
            return itemInCart ? {
                ...state,
                cart: state.cart.map((e) => e.id === newItem.id ? {...e, quantity: e.quantity + 1} : e),
            }
             : {
                ...state,
                cart: [...state.cart, {...newItem, quantity: 1}],
                }
            
        case DEL_CART:
            let itemDel = state.cart.find((e) => e.id === action.payload);
            return itemDel.quantity > 1 ? {
                ...state,
                cart: state.cart.map((e) => e.id === action.payload ? {...e, quantity: e.quantity - 1} : e),
            }
            : {
            ...state,
            cart: state.cart.filter((p) => p.id !== action.payload),
        }

        case DEL_ALL_CART:
            return {
                ...state,
                cart: [],
                localCart: window.localStorage.removeItem('carrito')
            }
        default:
            return state;
        
         
}
}

export default rootReducer;