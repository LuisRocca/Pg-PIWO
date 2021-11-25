import axios from 'axios';

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