// import { 
//     ADD_CART,
//     DEL_CART,
//     DEL_ALL_CART,
//     MOD_CART,
// } from "../actions/actionsCart.js"

// // import beers from "../reducer/index.js"
// const initialState ={
//     beersForCart: [],
//     cart: []
// }

// function reducerCart (state = initialState, action){
//     switch(action.type) {
//         case ADD_CART:
//             return{
//                 ...state,
//                 cart: state.cart.concat(action.payload)
//         }
        
//         case DEL_CART:
//             return{
//                 ...state,
//                 cart: state.cart.filter((p) => p.id === action.payload)
//         }
        
//         case DEL_ALL_CART:
        
//         case MOD_CART:

//         default:
//             return state;
//     }
// }

// export default reducerCart