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
        <form className="d-flex">
            <input className="form-control me-2"
                type="text"
                placeholder="Find your fav Beer"
                aria-label="Search"
                autoComplete="off"
                value={name} 
                onChange={(e) => handleChange(e)}
            />
            <button className="btn btn-outline-success" type= "submit"
                onClick= {(e)=> handleSubmit(e)}
                >Search
            </button>
        </form>
    )}


