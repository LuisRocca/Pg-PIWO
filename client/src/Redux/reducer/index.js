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
        DELETE_BEERS_CATEGORY,
        CREATE_USERS,
        LOGIN_USER,
        LIST_USERS,
        LIST_USER,
        ADD_CART,
        DEL_CART,
        DEL_ALL_CART,
        GET_IMGS,
        DELETE_BEER,
        //  ORDENAMIENTOS
        ORDER_CATEGORY,
        ORDER_ALCOHOL,
        ORDER_BEERS,
        ORDER_IBU,
        ORDER_PRICE,
        SET_CART,
        STYLE_FILTERED,
        QUANTITY_ITEM,
        SET_USER,
        POST_REVIEW_USER,
        PUT_REVIEW_USER,
        POST_ORDER_USER,
        GET_ORDER_USER,
        RESET_PASSWORD,
        // PASARELA DE PAGO
        GET_ID



    } from "../actions"


const initialState = {
    beers: [],
    // searchBeer: [],
    allBeers: [],
    beerId: [],
    stylesBeer: [],
    allStyles:[],
    beersOfCategory: [],
    reviews: [],
    users: [],
    user:[],
    listUser: [],
    cart: [],
    imgs: [],
    orders: [],
    mpData: []
    // localCart: localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [],

}


function rootReducer (state = initialState, action) {
    
console.log(action.payload)
    switch (action.type) {
        case GET_BEERS:
            state.allBeers.length = 0;
            state.beers.length=0;
            // console.log('beers', action.payload.length)
            return {
                ...state,
                beers: action.payload.sort(function(a, b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }),
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
            return { 
                ...state, 
                users: state.users.concat(action.payload) 
            }

        case LIST_USERS: {
            return {
                ...state, 
                users: state.users.concat(action.payload) 
            }
        }
        case LIST_USER: {
            return {
                ...state, 
                listUser: action.payload 
            }
        }

        case LOGIN_USER: {
            return {
                ...state,
                user: action.payload
            }
        }

        case GET_STYLES:
            const array = action.payload.sort(function(a, b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0;
            })
            return{
                ...state,
                stylesBeer: array,
                allStyles: array
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
        case DELETE_BEER:
            state.allBeers = state.allBeers.filter(el => el.id !== action.payload)
            return{
                ...state,
                beers: state.allBeers
            }
        case ADD_CART:
            let existe = state.cart.filter(el => el.id === action.payload)
            if(existe.length===1) return state
            let newItem = state.beers.find((p) => p.id === action.payload)
             return{
                ...state,
                cart: [...state.cart, {...newItem, quantity: 1}],
            }
        case DEL_CART:
           return{
            ...state,
            cart: state.cart.filter(p => p.id !== action.payload),
        }

        case DEL_ALL_CART:
            return {
                ...state,
                cart: [],
                localCart: window.localStorage.removeItem('carrito')
            }
        case QUANTITY_ITEM: 
            return{
                ...state,
                cart: state.cart.map(el => {
                    if(el.id === action.payload.id){
                        return {
                            ...el,
                            quantity: action.payload.cantidad
                        }
                    }
                    return el
                })
            }
        case GET_IMGS:{
            return {
                ...state,
                imgs: action.payload
            }
        }

        //     AQUI ESTAN LOS CASOS DE LOS ORDENAMIENTOS 

        case ORDER_CATEGORY:
        const ordenamientoC = 
          action.payload === 'des'
          ? state.stylesBeer.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
          })
          :action.payload==='asc'? state.stylesBeer.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
          })
          :state.stylesBeer
        return {
            ...state,
            stylesBeer : ordenamientoC,
        }

        case ORDER_BEERS:
        const ordenamientoB =
        action.payload === 'des'
        ? state.beers.sort((a, b) => {
            if (a.name> b.name) {
                return -1;
            }
            if (b.name > a.name) {
                return 1;
            }
              return 0;
        })
        :action.payload === 'asc'? state.beers.sort((a, b) => {
            if (a.name> b.name) {
                return 1;
            }
            if (b.name > a.name) {
                return -1;
            }
              return 0;
          }):state.beers
        return {
            ...state,
            beers: ordenamientoB,
            }

        case ORDER_ALCOHOL:
            const ordenamientoA =
                    action.payload === 'des'
                    ? state.beers.sort((a, b) => {
                        if (a.ABV> b.ABV) {
                            return -1;
                        }
                        if (b.ABV > a.ABV) {
                            return 1;
                        }
                          return 0;
                    })
                    :action.payload === 'asc'?state.beers.sort((a, b) => {
                        if (a.ABV> b.ABV) {
                            return 1;
                        }
                        if (b.ABV > a.ABV) {
                            return -1;
                        }
                          return 0;
                      }): state.beers
                    return {
                       ...state,
                       beers: ordenamientoA,
                    }
            case ORDER_IBU:
                const ordenamientoI =
                    action.payload === 'des'
                    ? state.beers.sort((a, b) => {
                        if (a.IBU> b.IBU) {
                            return -1;
                        }
                        if (b.IBU > a.IBU) {
                            return 1;
                        }
                          return 0;
                    })
                    :action.payload === 'asc'?state.beers.sort((a, b) => {
                        if (a.IBU> b.IBU) {
                            return 1;
                        }
                        if (b.IBU > a.IBU) {
                            return -1;
                        }
                          return 0;
                      }): state.beers
                    return {
                       ...state,
                       beers: ordenamientoI,
                    }
                case ORDER_PRICE:
                    const ordenamientoP =
                    action.payload === 'des'
                    ? state.beers.sort((a, b) => {
                        if (a.price> b.price) {
                            return -1;
                        }
                        if (b.price > a.price) {
                            return 1;
                        }
                          return 0;
                    })
                    :action.payload === 'asc'?state.beers.sort((a, b) => {
                        if (a.price> b.price) {
                            return 1;
                        }
                        if (b.price > a.price) {
                            return -1;
                        }
                          return 0;
                      }): state.beers
                    return {
                       ...state,
                       beers: ordenamientoP,
                    }
      // ----  FIN ORDEN
        case SET_CART:
            return {
                ...state,
                cart: action.payload
            }
        case STYLE_FILTERED:
            if(action.payload==='all'){
                return{
                    ...state,
                    stylesBeer: state.allStyles
                }
            }
            return{
                ...state,
                stylesBeer: state.allStyles.filter(el => el.name === action.payload)
            }    
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }

        case POST_REVIEW_USER:
            return {
                ...state,
                // reviews: action.payload
            }
        
        case PUT_REVIEW_USER:
            return {
                ...state,
            }

        case POST_ORDER_USER:
            return {
                ...state,
                orders: state.orders.concat(action.payload)
            }

        case GET_ORDER_USER:
            return {
                ...state,
                orders: action.payload
            }

        case RESET_PASSWORD:
            return {
                ...state,
        // pasarela de pago
            }
        case GET_ID:
            return {
                ...state,
                mpData: action.payload,
            }
        
            
        default:
            return state;
        
         
    }
}

export default rootReducer;