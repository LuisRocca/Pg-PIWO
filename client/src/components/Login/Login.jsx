import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setUser, createUsers, listUser } from "../../Redux/actions/index.js";
import { useEffect } from "react";
import "./Login.css";
import NavBar from '../NavBar.jsx';
import swal from 'sweetalert';
// import GoogleLogin from 'react-google-login'


const Form = () => {
const dispatch = useDispatch();
const history = useHistory();
const user = useSelector(state => state.user)
const [input,setInput] = useState({
    username: '',
    password: '',
});
// const [inputgoogle, setInputgoogle] = useState({
//     username: '',
//     email: '',
//     password: '',
//     name: '',
//     lastName: '',
//     image: '',
//     address: ''
//   });

const local = window.localStorage.getItem('login')
// let user = JSON.parse(window.localStorage.getItem('login'));
// console.log('este es el que acab 21liunea', user) 

const responseGoogle = async (res) => {
    try {

        if(res.error) {
            console.log(res.error)
        }
        else {
            console.log('perfil de google', res.profileObj)
            let users = await axios.get('http://localhost:3001/users')
            console.log('usuarios',users)
            let aux = users.data.filter((e) => e.email === res.profileObj.email)
            console.log('aaaaaaaaaaaaaaaa', aux)
            if (users.data[0].email === res.profileObj.email) {
                window.localStorage.setItem('login', JSON.stringify(res.profileObj))
                console.log('1')
                history.push('/beers')
            } else {
                console.log('2')
                await axios.post('http://localhost:3001/users', {
                    username: res.profileObj.name,
                    email: res.profileObj.email,
                    password: res.profileObj.googleId,
                    name: res.profileObj.givenName,
                    lastName: res.profileObj.familyName,
                    image: res.profileObj.imageUrl,
                    address: 'change'
                })
                window.localStorage.setItem('login', JSON.stringify(res.profileObj))
                history.push('/beers')
            }
        }
    } catch(err) {
        console.log(err)
    }
                //   setInputgoogle({
                    //     username: '',
                    //     email: '',
                    //     password: '',
                    //     name: '',
                    //     lastName: '',
                    //     image: '',
                    //     address: ''
                    //   })
                    // const respose = await axios.post(api/user, {
                        //data: {
                            //email: res.profileObj
                            //: res.profileObj
                            //}
                            //}) // preguntar si existe usuario
                            
                            //if(response === existe) {
                                //history.push('/beers')
                                // y guardo los datos del usuario en localStorage
        //} 
        //else (ejemplo){
        // name: response.profileObj.givenName,
        // lastname: response.profileObj.familyName,
        // email: response.profileObj.email,
        // password: response.profileObj.googleId,
        // picture: response.profileObj.imageUrl,
        // confirmation: true,
        //}
        
}

// enviar los datos de profileOBJ al backend
// hacer primer peticion y verificar si el email coincide con algun usuario.
// sino coincide

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
            history.push('/beers')
        }
    })
    .catch(err => 
        // alert(err)
        swal("Error, please verify your email or password", {
        buttons: false,
        icon: 'error',
        timer: 1800,
        }
        )
        )
    setInput({username: '',password: ''})   
    }

return (
    <div>
        <NavBar/>
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
                        <button class="btn btn-danger btn-block continue google-button d-flex justify-content-start align-items-center">
                          <i class="fa fa-google ml-2"></i>
                          <span class="ml-5 px-4">Continue with Google</span>
                        </button>
                      </div>

                      <p class="small mb-5 pb-lg-2">
                        <a class="text-muted" href="#!">
                          Forgot password?
                        </a>
                      </p>
                      <p>
                        Don't have an account?{" "}
                        <a href="/createuser" class="link-info">
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