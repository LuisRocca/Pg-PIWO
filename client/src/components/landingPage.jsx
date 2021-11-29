import React from 'react';
import { Link } from 'react-router-dom';
import "../css/LandingPage.css"
const LandingPage = () => {
    
    return (
        <div>
            <div className="LandingPage">
            </div>
            <div className="cont">  
                    <Link to='/beers' >
                    <button className="boton"> Home </button>
                </Link>
                </div>
            </div>
     
    )
}
export default LandingPage;