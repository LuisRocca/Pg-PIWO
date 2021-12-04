import axios from 'axios';
export const GET_BEERS = 'GET_BEERS'
export const GET_BEERS_BY_ID = 'GET_BEERS_BY_ID'
export const GET_BEERS_NAME = 'GET_BEERS_NAME'
export const GET_STYLES = 'GET_STYLES'
export const GET_REVIEW = 'GET_REVIEW'
export const GET_USERS = 'GET_USER'
export const POST_USER = 'POST_USER'
export const POST_PRODUCT = 'POST_PRODUCT'
export const ADD_BEERS_OF_CATEGORY = 'ADD_BEERS_OF_CATEGORY'
export const DELETE_BEERS_CATEGORY = 'DELETE_BEERS_CATEGORY'
export const CREATE_BEER = 'CREATE_BEER'
export const SET_CART = 'SET_CART'


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
// '-----> ORDENAMIENTO'
export const ORDER_CATEGORY = 'ORDER_CATEGORY';
export const ORDER_ALCOHOL = 'ORDER_ALCOHOL';
export const ORDER_BEERS = 'ORDER_BEERS';
export const ORDER_PRICE = 'ORDER_PRICE';
export const ORDER_IBU = 'ORDER_IBU';


export function getBeers () {
    return async function (dispatch) {
        try {
            let beers = await axios.get("http://localhost:3001/beers")
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
            let beerId = await axios.get(`http://localhost:3001/beers/${id}`)
            console.log("codigo hermoso desaparecido",beerId.data)
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
            let {data} = await axios.get(`http://localhost:3001/review/beer/${id}`)
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
            let b = await axios (`http://localhost:3001/beers/?name=${name}`)
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
                const { data }= await axios (`http://localhost:3001/beers/categories`) 
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
            const url = "http://localhost:3001/users";
            
      return axios.post(url, input)
      .then(res => res.data)
      .then(data => {
          dispatch({ type: CREATE_USERS, payload: data })
        })
        .then(() => dispatch(listarUsers()))
        .then(() => alert('Usuario creado '))
        .catch(error => alert(error, 'Algo salió mal al crear usuario'))
    }
}
export function listarUsers() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/users`)
        .then(res => res.data)
        .then(data => {
          dispatch({ type: LIST_USERS, payload: data })
        })
        .catch(error => alert(error, 'Algo salió mal'))
    }
}
export function listUser() {
    return function (dispatch) {
        axios.get('http://localhost:3001/users')
        .then((res) => res.data)
        .then(data => {
            dispatch({ type: LIST_USER, payload: data });
        })
        .catch(error => alert(error, 'Algo esta saliendo pesimo'))
    }
}
export function userAdmin(id) {
    return function (dispatch) {
      const url = `http://localhost:3001/users/promote/${id}`;
      return axios.put(url)
        .then(res => res.data)
        .then(data => {
          dispatch({ type: ADMIN_USER, payload: data })
        })
        .catch(error => alert(error, 'Algo salió mal'))
    }
  }
  export function logoutUser() {
    return function (dispatch) {
      const url = "http://localhost:3001/users/logout";
      return axios.post(url)
        .then(() => alert('La sesión se ha cerrado'))
        .catch(error => alert(error, 'algo salio muy mal'))
    }
  }
  export function loginUser(input) {
    return function (dispatch) {
      const url = "http://localhost:3001/users/login";
      return axios.post(url, input)
      .then(res => res.data)
        .then(data => {
           dispatch({ type: LOGIN_USER, payload: data })
        })
        .catch(error => alert(error, "No se pudo iniciar sesion"))
    }
  }
  
  
  export function currentUser() {
    return function (dispatch) {
       axios.get('http://localhost:3001/users/me')
        .then((res) => res.data)
        .then(data => {
          dispatch({ type: CURRENT_USER, payload: data });
        })
        .catch(error => alert(error, 'Algo esta saliendo pesimo'))
    }
  }
  export function getuser(payload) {
    return function (dispatch) {
      return axios.get(`http://localhost:3001/users/${payload}`)
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
       axios.put(`http://localhost:3001/users/promote/${payload}`)
        .then((res) => res.data)
        .then(data => {
          dispatch({ type: UPGRADE_USER, payload: data });
        })
        .then(() => alert('Se dieron/quitaron privilegios de administrador'))
        .catch(error => alert(error, 'Algo esta saliendo pesimo'))
    }
  }

  export function ResetPassword(id, input) {
    return function (dispatch) {
      const url = `http://localhost:3001/users/${id}/passwordReset`;
      return axios.put(url, input)
        .then(res => res.data)
        .then(data => {
          dispatch({ type: RESET_PASSWORD, payload: data })
        })
        .then(() => alert('La contraseña ha sido cambiada'))
        .catch(error => alert(error, 'Algo salió mal al modificar la Contraseña'))
    }}


export function addCart(id){
    return async function (dispatch, getState){
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

export function postUser(payload){
    return async function(dispatch){
        try{
            const { data } = await axios.post('http://localhost:3001/users', payload)
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
            var info = await axios.get ("http://localhost:3001/users");
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
            const { data } = await axios.post('http://localhost:3001/categories/create', {...payload})
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
            const { data } = await axios.post('http://localhost:3001/beers/create', {...payload})
            return dispatch({type: CREATE_BEER, payload: data})
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
            const { data } = await axios.put(`http://localhost:3001/beers/edit/${payload.id}`, {...payload})
            alert(data)
            return dispatch({type: EDIT_BEER})
        }
        catch(err){
            console.log(err)
        }
    }
}
export function deleteBeer (id) {
    return async function (dispatch) {
        try {
            let {data} = await axios.delete(`http://localhost:3001/beers/${id}`)
            // console.log("codigo hermoso 2 desaparecido",data)
            alert(data)
            return dispatch({type: DELETE_BEER})
        }
        catch (err) {
            console.log(err);
        }
    }
}

export function getImgs(){
    return async function(dispatch) {
        try {
            const {data} = await axios.get(`http://localhost:3001/beers/images`)
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
