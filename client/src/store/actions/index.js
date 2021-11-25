import axios from 'axios';

export function getBeers() {
    console.log("getBeers");
    return function (dispatch) {
        return axios.get("http://localhost:3001/beers")
        .then ((json) => {
        dispatch({ 
            type: "GET_BEERS", 
            payload: json.data })
        })
        .catch((err) => {
            dispatch({ type: "GET_BEERS_ERROR", payload: err })});
    }
};

export function getBeerDetails (id) {
    return async function (dispatch) {
        try {
            let beerId = await axios.get(`http://localhost:3001/beers/${id}`)
            return dispatch({
                type: 'GET_BEER_BY_ID',
                payload: beerId.data
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
                type: 'GET_BEERS_NAME',
                payload: b.data})
        }
        catch(err){
            console.log(err)
        }
    }
}

export function postUser(payload){
    var response = axios.post ("http://localhost:3001/users", payload)
    console.log(response)
    return {
        type: "POST_USER",
        response
    }
}

export function getUsers(){
    return async function(dispatch){
        try{
            var info = await axios.get ("http://localhost:3001/users");
            return dispatch ({
                type: "GET_USERS",
                payload: info.data
            })
        } catch (error){
            console.log(error)
        }
    }
};