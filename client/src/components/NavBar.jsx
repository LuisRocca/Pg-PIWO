import React from 'react'
import Search from './search';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect } from "react";
import {Link} from 'react-router-dom';



//<a href='https://postimg.cc/Rqs2vy6b' target='_blank'><img src='https://i.postimg.cc/Rqs2vy6b/Piwo-logo.png' border='0' alt='Piwo-logo'/></a>
function NavBar (){
  // const history = useHistory()
  const user = JSON.parse(window.localStorage.getItem('login')) ? JSON.parse(window.localStorage.getItem('login')) : []
  const login = [];
  const localCart = []
  const carrito = JSON.parse(window.localStorage.getItem('carrito')) ? JSON.parse(window.localStorage.getItem('carrito')) : []
  const {cart }= useSelector((state) => state)

  const handleClick = () => {
    window.localStorage.removeItem('login')
    window.localStorage.removeItem('carrito')
    window.location.reload()
  }
//   useEffect(() => {
//     cart.length>0?
//     window.localStorage.setItem('carrito', JSON.stringify(cart))
//     : JSON.stringify(window.localStorage.getItem('carrito'))
// },[cart])

// useEffect(() => {
//   carrito.length
// })

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
                    <li className="nav-item">
                    <Link to="/order">
                      <a className="nav-link" href=" " >Orders</a>
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart">
                            <a className="nav-link" href=" ">My Cart</a>
                        </Link>
                            <h3>{cart && cart.length}</h3>
                    </li>
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
                  <div>
                    {user.name && <h5>Welcome back 
                        <Link to="/me">
                          {user.name}
                       </Link>
                       !</h5>}
                  </div>
                  <Search /> 
                </div>
              </div>
            </nav>        
      )
  }

  export default NavBar;