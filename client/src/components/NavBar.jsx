import React from 'react'
import { NavLink } from "react-router-dom";
import './Nav.css';


export const Nav = () => {

    return (
        <div id="NavBar" className="Nav-Links">
            <div>
            <NavLink
                activeStyle={{ color: '#b3b3b3', fontWeight: 'bold' }}
                className="Link" to='/home' >
                <span>Home</span>
            </NavLink>
            </div>
            <div>
            <NavLink
                 activeStyle={{ color: '#b3b3b3', fontWeight: 'bold' }}
                className="Link" to='/add' >Add Activity
                </NavLink>
            </div>
        </div>
        
    )
}