import React from 'react'
import Search from './search';
import { useHistory } from 'react-router';
import { useEffect } from "react";
import {Link} from 'react-router-dom';



//<a href='https://postimg.cc/Rqs2vy6b' target='_blank'><img src='https://i.postimg.cc/Rqs2vy6b/Piwo-logo.png' border='0' alt='Piwo-logo'/></a>
function NavBar (){
  const history = useHistory()
  const user = JSON.parse(window.localStorage.getItem('login')) ? JSON.parse(window.localStorage.getItem('login')) : []
  const login = [];

  const handleClick = () => {
    window.localStorage.removeItem('login')
    window.location.reload()
  }

  useEffect(() => {
    // location.reload()
  }, [user]);
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient h5" >
              <div className="container-fluid">
                <a className="navbar-brand h1 $headings-font-weight" href="/beers"><img src='https://i.postimg.cc/Rqs2vy6b/Piwo-logo.png' width='80' border='0' alt='Piwo-logo' /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="/beers">Home</a>
                    </li>
                    {
                    user.length === 0 &&
                      <li className="nav-item">
                      <a className="nav-link" href="/users/google" onClick={window.localStorage.setItem('login', JSON.stringify(login))}>Login</a>
                    </li>
                    }
                    <li className="nav-item" onClick={() => history.push('/order')}>
                      <a className="nav-link" href=" " >Orders</a>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart">
                            <a className="nav-link" href=" ">My Cart</a>
                        </Link>
                    </li>
                    {user && user.admin ===  true &&
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href=" " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Admin
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="/admin">Admin Panel</a></li>
                        <li><a className="dropdown-item" href="/admin/createCa">New Category's Beer</a></li>
                        <li><a className="dropdown-item" href="/admin/createBeer">New Beer</a></li>
                        <li><a className="dropdown-item" href="/admin/orderList">Edit Orders</a></li>
                      </ul>  
                    </li>}
                    <div>
                      
                    {user.name &&
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href=" " onClick={((e) => handleClick(e))}>Logout</a>
                    </li>
                    }

                    </div>
                  </ul>
                  {/* <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                  </form> */}
                  <Search /> 
                </div>
              </div>
            </nav>        
      )
  }

  export default NavBar;