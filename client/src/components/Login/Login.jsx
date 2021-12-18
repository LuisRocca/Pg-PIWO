import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setUser, getOrder} from "../../Redux/actions/index.js";

import { useEffect } from "react";
import "./Login.css";
import NavBar from '../NavBar.jsx';
import swal from 'sweetalert';
import GoogleLogin from 'react-google-login'


const Form = () => {
    
const dispatch = useDispatch();
const history = useHistory();
const user = useSelector(state => state.user)
const orders = useSelector(state => state.orders)
const [input,setInput] = useState({
    username: '',
    password: '',
});
const local = window.localStorage.getItem('login')
const responseGoogle = async (res) => {
    try {

        if (res.error) {
            console.log(res.error)
        } else {
            // console.log('perfil de google', res.profileObj)

            const response = await axios.post('http://localhost:3001/users/socialAuth', res.profileObj)
            if (response.data) {
                window.localStorage.setItem('login', JSON.stringify(response.data))
                history.push('/beers')
            }

        }
    } catch (err) {
        console.log(err)
    }
}



if ( !user.name && local) {
    dispatch(setUser(local))
  }
        
  useEffect(() => {
    local.name?
    history.push('/beers')
    : JSON.stringify(window.localStorage.getItem('login'))
},[user])

    function User (e) {
    e.preventDefault();
    axios.post("http://localhost:3001/users/google", input)
    .then(res =>{
        if(res.status === 200){
            let user = {
                id: res.data.user.id, 
                name: res.data.user.name,
                lastName: res.data.user.lastname,
                email: res.data.user.email, 
                address: res.data.user.address, 
                username: res.data.user.username,
                admin: res.data.user.admin
            }
            window.localStorage.setItem('login', JSON.stringify(user))
            dispatch(getOrder(user.id))
            history.push('/beers')
        }
    })
    .catch(err => 
        swal("Error, please verify your email or password", {
        buttons: false,
        icon: 'error',
        timer: 1800,
        }
        )
        )
    setInput({username: '',password: ''})   
    }

    const clickToRegister = (e) => {
      e.preventDefault();
      history.push('/createuser')
    }

return (
    <div>
      
        <form onSubmit={(e) => User(e)}>
        <div className="container">
          <div class="vh-100">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-6 text-black">
                  <div class="px-5 ms-xl-4">
                    <span class="h1 fw-bold mb-0 text-center">Piwo Market</span>
                  </div>

                  <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                    <div style={{ width: "23rem" }}>
                      <h3
                        class="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Log in
                      </h3>

                      <div>
                        <input
                          type="text"
                          class="form-control mb-2"
                          placeholder="Username"
                          value={input.username}
                          onChange={(e) =>
                            setInput({ ...input, username: e.target.value })
                          }
                          required        
                        />
                      </div>

                      <div class="form">
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            value={input.password}
                            onChange={(e) =>
                              setInput({ ...input, password: e.target.value })
                            }
                            required
          
                          />
                      </div>
                      <br />

                      <div class="pt-1 mb-4">
                        <button
                          class="btn btn-warning btn-lg btn-block"
                          type="submit"
                          href="http://localhost:3000/users/google"
                        >
                          Login
                        </button>
                        <p class="form-label text-center" >OR</p>
                        <GoogleLogin
                                className='googleButton w-100'
                                clientId='550939962948-srgtakf8176b6pikq34l4l3ed68l5q2b.apps.googleusercontent.com'
                                buttonText='Ingresa con Google'
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                      </div>

                      <p class="small mb-5 pb-lg-2">
                        <a class="text-muted" href="#!">
                          Forgot password?
                        </a>
                      </p>
                      <p>
                        Don't have an account?{" "}
                        <a href=" " class="link-info" onClick={(e) => clickToRegister(e)}>
                          Register here
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 px-0 d-none d-sm-block">
                  <img
                    src="https://i.postimg.cc/nr8bkC6Z/Piwo-Cover.png"
                    alt="Login i"
                    class="w-100 vh-100"
                    style={{ objectFit: "cover", objectPosition: "left" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>

    )
}

export default Form;
