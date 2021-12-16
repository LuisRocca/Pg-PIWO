import React from "react"
import { Link } from "react-router-dom"
import LandingPageStyles from "../css/LandingPage.module.css"



const LandingPage = () => {
    return (
        <div>
            <div className={LandingPageStyles.landing}>
                <Link to='/beers'>
                    <button type="button" class="btn btn-warning btn-lg">I'm +18 Years old</button>
                </Link>
                <div>
                    <img className={LandingPageStyles.logo} src="https://i.postimg.cc/9FC2YjWV/Piwo-logo.png" alt="to home" />
                </div>
                <a href="https://youtu.be/eNLjdPI9zdE?t=26">
                    <button type="button" class="btn btn-info btn-lg">I'm -18 Years old</button>
                </a>
            </div>       
        </div>
    )
}

export default LandingPage;