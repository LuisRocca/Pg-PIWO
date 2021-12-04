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
        LIST_USERS,
        LIST_USER,
        ADD_CART,
        DEL_CART,
        DEL_ALL_CART,
        MOD_CART,
<<<<<<< HEAD
        GET_IMGS,
        DELETE_BEER,
        //  ORDENAMIENTOS
        ORDER_CATEGORY,
        ORDER_ALCOHOL,
        ORDER_BEERS,
        ORDER_IBU,
        ORDER_PRICE,
=======
        SET_CART
>>>>>>> master
    } from "../actions"


const initialState = {
    beers: [],
    allBeers: [],
    beerId: [],
    stylesBeer: [],
    beersOfCategory: [],
    reviews: [],
    users: [],
    user:[],
    listUser: [],
    cart: [],
<<<<<<< HEAD
    imgs: []
    // localCart: localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [],
=======

>>>>>>> master
}


function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_BEERS:
            state.allBeers.length = 0;
<<<<<<< HEAD
            state.beers.length=0;
=======
     
>>>>>>> master
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
                stylesBeer: action.payload.sort(function(a, b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
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
            if (state.cart.length === 0) {
                state.cart = localStorage.getItem('carrito')
            }
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
<<<<<<< HEAD
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
          : state.stylesBeer.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
          });
        return {
            ...state,
            stylesBeer : ordenamientoC,
        }

        case ORDER_BEERS:
        const ordenamientoB =
        action.payload === 'asc'
        ? state.stylesBeer.sort((a, b) => {
            if (a.beers.map(e => e.name.toLowerCase()) > b.beers.map(e => e.name.toLowerCase())) {
                return 1;
              }
              if (b.beers.map(e => e.name.toLowerCase()) > a.beers.map(e => e.name.toLowerCase())) {
                return -1;
              }
              return 0;
        })
        : state.stylesBeer.sort((a, b) => {
            if (a.beers.map(e => e.name.toLowerCase()) > b.beers.map(e => e.name.toLowerCase())){
                return -1;
              }
              if (b.beers.map(e => e.name.toLowerCase()) > a.beers.map(e => e.name.toLowerCase())) {
                return 1;
              }
              return 0;
          })
        return {
            ...state,
            stylesBeers: ordenamientoB,
            }

        case ORDER_ALCOHOL:
            const ordenamientoA =
            action.payload === 'asc'
            ? state.stylesBeer.sort((a, b) => {
                if (a.beers.map(e => e.ABV)> b.beers.map(e => e.ABV)) {
                    return -1;
                  }
                  if (b.beers.map(e => e.ABV) > a.beers.map(e => e.ABV)) {
                    return 1;
                  }
                  return 0;
            })
            : state.stylesBeer.sort((a, b) => {
                if (a.beers.map(e => e.ABV) > b.beers.map(e => e.ABV)){
                    return 1;
                  }
                  if (b.beers.map(e => e.ABV) > a.beers.map(e => e.ABV)) {
                    return -1;
                  }
                  return 0;
              })
            return {
                ...state,
                stylesBeers: ordenamientoA,
            }
            case ORDER_IBU:
                const ordenamientoI =
                action.payload === 'asc'
                ? state.stylesBeer.sort((a, b) => {
                    if (a.beers.map(e => e.IBU)> b.beers.map(e => e.IBU)) {
                        return -1;
                      }
                      if (b.beers.map(e => e.IBU) > a.beers.map(e => e.IBU)) {
                        return 1;
                      }
                      return 0;
                })
                : state.stylesBeer.sort((a, b) => {
                    if (a.beers.map(e => e.IBU) > b.beers.map(e => e.IBU)){
                        return 1;
                      }
                      if (b.beers.map(e => e.IBU) > a.beers.map(e => e.IBU)) {
                        return -1;
                      }
                      return 0;
                  })
                return {
                   ...state,
                   stylesBeers: ordenamientoI,
                }
                case ORDER_PRICE:
                    const ordenamientoP =
                    action.payload === 'asc'
                    ? state.stylesBeer.sort((a, b) => {
                        if (a.beers.map(e => e.price)> b.beers.map(e => e.price)) {
                            return -1;
                          }
                          if (b.beers.map(e => e.price) > a.beers.map(e => e.price)) {
                            return 1;
                          }
                          return 0;
                    })
                    : state.stylesBeer.sort((a, b) => {
                        if (a.beers.map(e => e.price) > b.beers.map(e => e.price)){
                            return 1;
                          }
                          if (b.beers.map(e => e.price) > a.beers.map(e => e.price)) {
                            return -1;
                          }
                          return 0;
                      })
                    return {
                       ...state,
                       stylesBeers: ordenamientoP,
                    }
      // ----  FIN ORDEN
=======
        case SET_CART:
            return {
                ...state,
                cart: action.payload
            }
>>>>>>> master
        default:
            return state;
        
         
    }
}

export default rootReducer;