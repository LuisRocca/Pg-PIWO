import React from 'react'
import { Link } from 'react-router-dom';
import "../css/LandingPage.css"
import Arrow from '../css/img/arrow.svg';




const LandingPage = () => {
    return (
        <div  className="Box-LandingPage">
            <div className="LandingPage">
                <div className="Margin-LandingPage">
                <h1 className="Title-LandingPage">Bienvenido a Piwo</h1>
                <p className="Info-LandingPage">El lugar donde encontrarás tus cervezas favoritas a un mejor precio.</p>
                
              <Link to="/beers" spy={true} smooth={true}><img className="animation" alt="arrow" src={Arrow}></img></Link>
                {/* <Link to="/home">
                
                <img className="bounce" src={Arrow}></img>
                    
                
                </Link> */}
                </div>
           
            </div>
        </div>
    )
}

export default LandingPage