import React from "react";
import { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import { getBeersName } from "../Redux/actions";

export default function Search(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    useEffect(() => {
        dispatch(getBeersName(name))
    }, [dispatch, name])
    const handleChange = (e) => {
        setName(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            dispatch(getBeersName(name));
        }
    };
    return(
        <form class="d-flex">
            <input class="form-control me-2"
                type="text"
                placeholder="Find your fav Beer"
                aria-label="Search"
                autoComplete="off"
                value={name} 
                onChange={(e) => handleChange(e)}
            />
            <button class="btn btn-outline-success" type= "submit"
                onClick= {(e)=> handleSubmit(e)}
                >Search
            </button>
        </form>
    )}

//     <form class="d-flex">
//     <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//     <button class="btn btn-outline-success" type="submit">Search</button>
//   </form>
