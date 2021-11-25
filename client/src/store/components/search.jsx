import React from "react";
import { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import { getBeersName } from "../actions";

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
        <form  >
            <input className="search_bar"
            type="text"
            placeholder="Busca la cerveza que desees"
            autoComplete="off"
            value={name} 
            onChange={(e) => handleChange(e)}
        />
        <input type= "submit"
        onClick= {(e)=> handleSubmit(e)}
        />
    </form>
    )}
