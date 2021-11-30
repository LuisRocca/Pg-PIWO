import axios from 'axios';
export const GET_BEERS = 'GET_BEERS'
export const GET_BEERS_BY_ID = 'GET_BEERS_BY_ID'
export const GET_BEERS_NAME = 'GET_BEERS_NAME'
export const GET_STYLES = 'GET_STYLES'
export const GET_REVIEW = 'GET_REVIEW'
export const CREATE_USERS = 'CREATE_USERS'
export const LIST_USERS = 'LIST_USERS'
export const LIST_USER = 'LIST_USER'; 
//'--------> CART'
export const ADD_CART = 'ADD_CART'
export const DEL_CART = 'DEL_CART'
export const DEL_ALL_CART = 'DEL_ALL_CART'
export const MOD_CART = 'MOD_CART'


export function getBeers () {
    return async function (dispatch) {
        try {
            let beers = await axios.get("http://localhost:3001/beers")
            return dispatch({
                type: 'GET_BEERS',
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
            const url = "http://localhost:3000/users";
            
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
        axios.get(`http://localhost:3000/users`)
        .then(res => res.data)
        .then(data => {
          dispatch({ type: LIST_USERS, payload: data })
        })
        .catch(error => alert(error, 'Algo salió mal'))
    }
}
export function listUser() {
    return function (dispatch) {
        axios.get('http://localhost:3000/users')
        .then((res) => res.data)
        .then(data => {
            dispatch({ type: LIST_USER, payload: data });
        })
        .catch(error => alert(error, 'Algo esta saliendo pesimo'))
    }
}
export function addCart(id){
    return async function (dispatch){
        try{
            return dispatch({
                type: ADD_CART, 
                payload: id
            })
        }
        catch (err){
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