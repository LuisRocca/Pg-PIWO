import React from 'react'
import Search from './search';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect } from "react";
import {Link} from 'react-router-dom';
import {createOrder, getOrder, setCart} from '../Redux/actions/index.js';



//<a href='https://postimg.cc/Rqs2vy6b' target='_blank'><img src='https://i.postimg.cc/Rqs2vy6b/Piwo-logo.png' border='0' alt='Piwo-logo'/></a>
function NavBar (){
  // const history = useHistory()
  const user = JSON.parse(window.localStorage.getItem('login')) ? JSON.parse(window.localStorage.getItem('login')) : []
  const login = [];
  const dispatch = useDispatch()
  const localCart = []
  const carrito = JSON.parse(window.localStorage.getItem('carrito')) ? JSON.parse(window.localStorage.getItem('carrito')) : []
  const {cart, orders }= useSelector((state) => state)

  const handleClick = () => {
    dispatch(createOrder(user.id,cart))
    window.localStorage.removeItem('login')
    window.localStorage.setItem('login', JSON.stringify([]))
    window.localStorage.removeItem('carrito')
    window.location.reload()
  }

  const orderclick = () => {
      dispatch(createOrder(user.id, cart))
  }


        return (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient h5 sticky-top" >
          <div className="container-fluid">
            <a className="navbar-brand h1 $headings-font-weight" href="/beers"><img src='https://i.postimg.cc/Rqs2vy6b/Piwo-logo.png' width='70' border='0' alt='Piwo-logo' /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/beers">Beers</a>
                </li>
                
                {user.length === 0 &&
                  <li className="nav-item">
                  <a className="nav-link" href="/users/google" onClick={window.localStorage.setItem('login', JSON.stringify(login))}>Login</a>
                </li>}
                {/* <li className="nav-item"> UNITE LUIS L
                <Link to="/order">
                  <a className="nav-link" href=" " >Orders</a>
                </Link>
                </li> */}
                {user && user.admin ===  true &&
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href=" " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="/admin">Beers List & Edit</a></li>
                    <li><a className="dropdown-item" href="/admin/createCa">Beer New Category</a></li>
                    <li><a className="dropdown-item" href="/admin/createBeer">Beer New</a></li>
                    <li><a className="dropdown-item" href="/admin/orderList">Orders List & Edit</a></li>
                    <li><a className="dropdown-item" href="/admin/userList">Users Upgrade</a></li>
                  </ul>  
                </li>}
                <li className="nav-item">
                {user.name &&
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href=" " onClick={((e) => handleClick(e))}>Logout</a>
                </li>
}
                </li>
                <li className='nav-link'>
                <p className="text-md-start">
                  {user.name && 
                  <strong>Welcome: {user.name && <Link style={{ textDecoration: 'none', color: 'orange' }} to="/me">{user.name}</Link>}
                  </strong>
                  }
                </p>
                </li>
              </ul>
              {/* <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form> */}
              <li className="nav-link" onClick={(e) => orderclick(e)}>
                  <Link to="/cart">
                    <button type="button" class="btn btn-secondary position-relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" class="bi bi-cart4" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                      </svg>                        
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart && cart.length}
                      </span>
                    </button>
                  </Link>
              </li>
              <Search /> 
            </div>
          </div>
        </nav>        
  )
}

  export default NavBar;