import axios from 'axios';
import swal from 'sweetalert';

export const GET_ID = "GET_ID"
export const GET_BEERS = 'GET_BEERS'
export const GET_BEERS_BY_ID = 'GET_BEERS_BY_ID'
export const GET_BEERS_NAME = 'GET_BEERS_NAME'
export const GET_STYLES = 'GET_STYLES'
export const GET_REVIEW = 'GET_REVIEW'
export const GET_USERS = 'GET_USER'
export const EDIT_ORDER = 'EDIT_ORDER'
export const GET_ORDERS = 'GET_ORDERS'
export const POST_ORDER = 'POST_ORDER'
export const POST_USER = 'POST_USER'
export const POST_PRODUCT = 'POST_PRODUCT'
export const ADD_BEERS_OF_CATEGORY = 'ADD_BEERS_OF_CATEGORY'
export const DELETE_BEERS_CATEGORY = 'DELETE_BEERS_CATEGORY'
export const DELETE_ORDER = 'DELETE_ORDER'
export const CREATE_BEER = 'CREATE_BEER'
export const SET_CART = 'SET_CART'
export const SET_USER = 'SET_USER'
export const POST_REVIEW_USER = 'POST_REVIEW_USER'
export const PUT_REVIEW_USER = 'PUT_REVIEW_USER'
export const POST_ORDER_USER = 'POST_ORDER_USER'
export const GET_ORDER_USER = 'GET_ORDER_USER'
export const GET_ORDER_BY_ID = 'GET_ORDER_BY_ID'

export const CREATE_USERS = 'CREATE_USERS'
export const LIST_USERS = 'LIST_USERS'
export const LIST_USER = 'LIST_USER'; 
export const LOGOUT_USER = 'LOGOUT_USER';
export const ADMIN_USER = 'ADMIN_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const CURRENT_USER = 'CURRENT_USER';
export const GET_ONE_USER = 'GET_ONE_USER';
export const UPGRADE_USER = 'UPGRADE_USER'; 
export const RESET_PASSWORD = 'RESET_PASSWORD'; 
export const EDIT_BEER = 'EDIT_BEER'
export const GET_IMGS = 'GET_IMGS'
export const DELETE_BEER = 'DELETE_BEER'
//'--------> CART'
export const ADD_CART = 'ADD_CART'
export const DEL_CART = 'DEL_CART'
export const DEL_ALL_CART = 'DEL_ALL_CART'
export const MOD_CART = 'MOD_CART'
export const QUANTITY_ITEM = 'QUANTITY_ITEM'
// '-----> ORDENAMIENTO'
export const ORDER_CATEGORY = 'ORDER_CATEGORY';
export const ORDER_ALCOHOL = 'ORDER_ALCOHOL';
export const ORDER_BEERS = 'ORDER_BEERS';
export const ORDER_PRICE = 'ORDER_PRICE';
export const ORDER_IBU = 'ORDER_IBU';
export const STYLE_FILTERED = 'STYLE_FILTER'
export const SET_MP = 'SET_MP'


export function getBeers () {
    return async function (dispatch) {
        try {
            let beers = await axios.get("/beers")
            return dispatch({
                type: GET_BEERS,
                payload: beers.data
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export function getBeersDetails (id) {
    return async function (dispatch) {
        try {
            let beerId = await axios.get(`/beers/${id}`)
            // console.log("codigo hermoso desaparecido",beerId.data)
            return dispatch({
                type: GET_BEERS_BY_ID,
                payload: beerId.data
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export function getReviews (id) {
    return async function (dispatch) {
        try {
            let {data} = await axios.get(`/review/beer/${id}`)
            return dispatch({
                type: GET_REVIEW,
                payload: data
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export function getBeersName(name){
    return async function(dispatch){
        try{
            let b = await axios (`/beers/?name=${name}`)
            return dispatch ({
                type: GET_BEERS_NAME,
                payload: b.data})
            }
            catch(err){
                console.log(err)
            }
        }
    }
    
    export function getStylesOfBeers(){
        return async function (dispatch){
            try{
                const { data }= await axios (`/beers/categories`) 
                // console.log('ESTILOS DE LA ACTION', data)
                return dispatch({
                    type: GET_STYLES, 
                    payload: data
                })
            }
            catch (err){
                console.log(err)
            }
        }   
    }
    export function createUsers(input) {
        return function (dispatch) {
            const url = "/users";
            
      return axios.post(url, input)
      .then(res => res.data)
      .then(data => {
          dispatch({ type: CREATE_USERS, payload: data })
        })
        .then(() => dispatch(listarUsers()))
        .catch(error => alert(error, 'Algo sali?? mal al crear usuario'))
    }
}
export function listarUsers() {
    return function (dispatch) {
        axios.get(`/users`)
        .then(res => res.data)
        .then(data => {
          dispatch({ type: LIST_USERS, payload: data })
        })
        .catch(error => alert(error, 'Algo sali?? mal'))
    }
}
export function listUser() {
    return function (dispatch) {
        axios.get('/users')
        .then((res) => res.data)
        .then(data => {
            dispatch({ type: LIST_USER, payload: data });
        })
        .catch(error => alert(error, 'Algo esta saliendo pesimo'))
    }
}
export function userAdmin(id) {
    return function (dispatch) {
      const url = `/users/promote/${id}`;
      return axios.put(url)
        .then(res => res.data)
        .then(data => {
          dispatch({ type: ADMIN_USER, payload: data })
        })
        .catch(error => alert(error, 'Algo sali?? mal'))
    }
  }
  export function logoutUser() {
    return function (dispatch) {
      const url = "/users/logout";
      return axios.post(url)
        .then(() => alert('La sesi??n se ha cerrado'))
        .catch(error => alert(error, 'algo salio muy mal'))
    }
  }
  export function loginUser(input) {
    return function (dispatch) {
      const url = "/users/google";
      return axios.post(url, {username: input.username, password: input.password})
      .then(res => {
          console.log('res:', res)
          return res.data})
        .then(data => {
            window.localStorage.setItem('login', JSON.stringify(data.user))
           dispatch({ type: LOGIN_USER, payload: data })
        })
        .catch(err => swal("Error", {
            buttons: false,
            icon: 'error',
            timer: 1500,
            })
        )
    }
  }
  
  
  export function currentUser() {
    return function (dispatch) {
       axios.get('/users/me')
        .then((res) => res.data)
        .then(data => {
          dispatch({ type: CURRENT_USER, payload: data });
        })
        .catch(error => alert(error, 'Algo esta saliendo pesimo'))
    }
  }
  export function getuser(payload) {
    return function (dispatch) {
      return axios.get(`/users/${payload}`)
        .then(response => {
          dispatch({ type: GET_ONE_USER, payload: response.data });
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
  export function UpgradeUser(payload) {
    return function (dispatch) {
       axios.put(`/users/promote/${payload}`)
        .then((res) => res.data)
        .then(data => {
          dispatch({ type: UPGRADE_USER, payload: data });
        })
        .then(() => swal("The user was successfully upgraded to admin", {
            buttons: false,
            icon: 'success',
            timer: 1500,
          }))
        .catch(error => alert(error, 'Algo esta saliendo pesimo'))
    }
  }

  export function ResetPassword(id, password) {
    return function (dispatch) {
      const url = `/users/${id}/passwordReset`;
      return axios.put(url, {password: password})
        .then(res => res.data)
        .then(data => {
            console.log('aca esta', data.password);
          dispatch({ type: RESET_PASSWORD, payload: {password: data.password} })
        })
        .then(() => 
        swal("Changed password successfully!", {
            buttons: false,
            icon: 'success',
            timer: 1500,
          })
        )
        .catch(error => alert(error, 'Algo sali?? mal al modificar la Contrase??a'))
    }}


export function addCart(id){
    return async function (dispatch){
        try{
            dispatch({
                type: ADD_CART, 
                payload: id
            })
        // localStorage.setItem('carrito', JSON.stringify(getState().localCart));
        }
        catch (err){
            console.log(err)
        }
    }   
}
export const quantity_item = (payload) => dispatch => {
    try {
        return dispatch({type:QUANTITY_ITEM, payload})
    } catch (err){
        console.log(err)
    }
}

export function postUser(payload){
    return async function(dispatch){
        try{
            const { data } = await axios.post('/users', payload)
            return dispatch({type: POST_USER, payload: data})
        }
        catch(err){
            console.log(err)
        }
    }
}

export function getUsers(){
    return async function(dispatch){
        try{
            var info = await axios.get ("/users");
            return dispatch ({
                type: GET_USERS,
                payload: info.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function postProduct(payload){
    return async function(dispatch){
        try{
            const { data } = await axios.post('/categories/create', {...payload})
            return dispatch({type: POST_PRODUCT, payload: data})
        }
        catch(err){
            console.log(err)
        }
    }
}
export function delCart(id){
    return async function (dispatch){
        try {
            return dispatch({
                type: DEL_CART,
                payload: id
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export function addBeersOfCategory(beer){
    return async function (dispatch){
        return dispatch({type: ADD_BEERS_OF_CATEGORY, payload: beer})
    }   
}
export function delBeersCategory(beer){
    return async function (dispatch){
        return dispatch({type: DELETE_BEERS_CATEGORY, payload: beer})
    }   
}
export function postBeer(payload){
    return async function(dispatch){
        try{
            const { data } = await axios.post('/beers/create', {...payload})
            return dispatch({type: CREATE_BEER, payload: data})
        }
        catch(err){
            console.log(err)
        }
    }
}
export function postOrder(payload){
    return async function(dispatch){
        try{
            const { data } = await axios.post('/order/create', {...payload})
            return dispatch({type: POST_ORDER, payload: data})
        }
        catch(err){
            console.log(err)
        }
    }
}

export function delAllCart () {
    return async function (dispatch) {
        try {
            return dispatch({
                type: DEL_ALL_CART
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}
export function editBeer(payload){
    return async function(dispatch){
        try{
            const { data } = await axios.put(`/beers/edit/${payload.id}`, {...payload})
            alert(data)
            return dispatch({type: EDIT_BEER})
        }
        catch(err){
            console.log(err)
        }
    }
}
export function editOrder(payload){
    return async function(dispatch){
        try{
            const { data } = await axios.put(`/order/edit/${payload.id}`, payload)
            console.log(data)
            console.log(payload)
            return dispatch({type: EDIT_ORDER})
        }
        catch(err){
            console.log(err)
        }
    }
};


export function deleteBeer (id) {
    return async function (dispatch) {
        try {   
            await axios.delete(`/beers/${id}`)
            return dispatch({type: DELETE_BEER, payload: id})
        }
        catch (err) {
            console.log(err);
        }
    }
}

export function deleteOrder (id) {
    return async function (dispatch) {
        try {
            let {data} = await axios.delete(`/order/${id}`)
            return dispatch({type: DELETE_ORDER})
        }
        catch (err) {
            console.log(err);
        }
    }
};



export function getImgs(){
    return async function(dispatch) {
        try {
            const {data} = await axios.get(`/beers/images`)
            return dispatch({type: GET_IMGS, payload: data})
        } catch (error) {
            console.log(error)
        }
    }
}

// ESTAS SON LAS FUNCIONES QUE DISPACHAN AL REDUCER CON RESPECTO AL -->!! ORDEN !!<--

export const orderCategory = (payload) => {
    return {
       type: ORDER_CATEGORY,
       payload,
    }
};

export const orderAlcohol = (payload) => {
    return {
        type: ORDER_ALCOHOL,
        payload,
    }
};

export const orderBeer = (payload) => {
    return {
        type: ORDER_BEERS,
        payload,
    }
};

export const orderPrice = (payload) => {
    return {
        type:ORDER_PRICE,
        payload,
    }
};

export const orderIBU = (payload) => {
    return {
       type: ORDER_IBU,
       payload,
    }
}
export function setCart (payload) {
    return async function (dispatch) {
        try {
            return dispatch({type: SET_CART, payload})
        }
        catch (err) {
            console.log(err)
        }
    }
} 
export const styleFilter = (payload) => dispatch => dispatch({type:STYLE_FILTERED, payload})

export function setUser (payload) {
    return async function (dispatch) {
        try {
            return dispatch({type: SET_USER, payload})
        }
        catch (err) {
            console.log(err)
        }
    }
}
export function getOrders () {
    return async function (dispatch) {
        try {
            let orders = await axios.get("/order")
            
            return dispatch({
                type: GET_ORDERS,
                payload: orders.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export function postReviewUser (idBeer, idUser, payload) {
                return async function (dispatch) {
                    try {
                        await axios.post(`/review/beer/${idBeer}/user/${idUser}`, payload )
                        return dispatch({type: POST_REVIEW_USER, payload})
                    } catch (err) {
                        console.log(err);
                    }
                }
            }

export function putReviewUser (idBeer, idUser, payload) {
    return async function (dispatch) {
        try {
            await axios.put(`/review/beer/${idBeer}/user/${idUser}`, payload )
            return dispatch({type: PUT_REVIEW_USER, payload})
        } catch (err) {
            console.log(err);
        }
    }
}

export function createOrder (idUser, payload) {
    return async function (dispatch) {
        try {
           let order = await axios.post(`/users/${idUser}/cart`, payload )
            return dispatch({type: POST_ORDER_USER, payload: order.data});
        } catch (err) {
            console.log(err);
        }
    }
}

export function getOrder (idUser) {
    return async function (dispatch) {
        try {
            let orders = await axios.get(`/users/${idUser}/cart`)
            return dispatch({
                type: GET_ORDER_USER,
                payload: orders.data
            })
        } catch (err) {
            console.log(err);
        }
    }
}
export function getId (payload) {
    return async function (dispatch){
        try{
            let datos = await axios.post("/mercadopago", payload)
            console.log('la data de mercadopago', payload)
            return dispatch({
                type: GET_ID,
                payload: datos
            })
        }
        catch (err){
            console.log(err)
        }
    }
}

export function setMp (payload) {
    return async function (dispatch) {
        try {
            return dispatch({type: SET_MP, payload:payload})
        }
        catch (err) {
            console.log(err)
        }
    }
}

export function getOrderById(orderId) {
    return async function (dispatch) {
        try {
            let order = await axios.get(`/order/${orderId}`)
            return dispatch({type: GET_ORDER_BY_ID, payload: order.data})
        } catch (err) {
            console.log(err)
        }
    }
}