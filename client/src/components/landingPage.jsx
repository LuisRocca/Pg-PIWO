import React from "react"
import { Link, useHistory} from "react-router-dom"
import LandingPageStyles from "../css/LandingPage.module.css"
import swal from 'sweetalert'




const LandingPage = () => {
    const history = useHistory()
    const handleClick = (e) => {
        e.preventDefault();
        swal("You need to be 18 years or older", {
            buttons: false,
            icon: 'error',
            timer: 1500,
          });
    }
    return (
        <div>
            <div className={LandingPageStyles.landing}>
                <Link to='/beers'>
                    <button type="button" class="btn btn-warning btn-lg">I'm +18 Years old</button>
                </Link>
                <div>
                    <img className={LandingPageStyles.logo} src="https://i.postimg.cc/9FC2YjWV/Piwo-logo.png" alt="to home" />
                </div>
                {/* <a href="https://youtu.be/eNLjdPI9zdE?t=26"> */}
                    <button type="button" class="btn btn-info btn-lg" onClick={e => handleClick(e)} >I'm -18 Years old</button>
                {/* </a> */}
            </div>       
        </div>
    )
}

export default LandingPage;