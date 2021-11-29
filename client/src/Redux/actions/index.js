import axios from 'axios';
export const GET_BEERS = 'GET_BEERS'
export const GET_BEERS_BY_ID = 'GET_BEERS_BY_ID'
export const GET_BEERS_NAME = 'GET_BEERS_NAME'
export const GET_STYLES = 'GET_STYLES'
export const GET_REVIEW = 'GET_REVIEW'
export const GET_USERS = 'GET_USER'
export const POST_USER = 'POST_USER'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const POST_PRODUCT = 'POST_PRODUCT'


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
            console.log("codigo de mierda desaparecido",beerId.data)
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
            return dispatch({type: GET_STYLES, payload: data})
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
            const { data } = await axios.post('http://localhost:3001/products', payload)
            return dispatch({type: POST_PRODUCT, payload: data})
        }
        catch(err){
            console.log(err)
        }
    }
}

export function getProducts(){
    return async function(dispatch){
        try{
            var info = await axios.get ("http://localhost:3001/products");
            return dispatch ({
                type: GET_PRODUCTS,
                payload: info.data
            })
        } catch (error){
            console.log(error)
        }
    }
}