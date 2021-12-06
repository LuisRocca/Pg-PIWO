import React from 'react'
import Search from './search';
import { useHistory } from 'react-router';



//<a href='https://postimg.cc/Rqs2vy6b' target='_blank'><img src='https://i.postimg.cc/Rqs2vy6b/Piwo-logo.png' border='0' alt='Piwo-logo'/></a>
function NavBar (){
  const history = useHistory()

        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient h5" >
              <div class="container-fluid">
                <a class="navbar-brand h1 $headings-font-weight" href="/beers"><img src='https://i.postimg.cc/Rqs2vy6b/Piwo-logo.png' width='80' border='0' alt='Piwo-logo' /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/beers">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/users/google">Login</a>
                    </li>
                    <li class="nav-item" onClick={() => history.push('/order')}>
                      <a class="nav-link" href=" " >Orders</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/cart">My Cart</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href=" " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Admin
                      </a>
                      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="/admin">Admin Panel</a></li>
                        <li><a class="dropdown-item" href="/admin/createCa">New Category's Beer</a></li>
                        <li><a class="dropdown-item" href="/admin/createBeer">New Beer</a></li>
                      </ul>
                    </li>
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