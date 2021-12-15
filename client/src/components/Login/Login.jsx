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
                <div class="container d-flex justify-content-center align-items-center">
            <div class="card">
                <div class="p-3 border-bottom d-flex align-items-center justify-content-center">
                    <h5>Login to Piwo Beer Market</h5>
                </div>
                <div class="p-3 px-4 py-4 border-bottom"> 
                    <input type="text" class="form-control mb-2" placeholder="Email/Username" value={input.username} onChange={e => setInput({ ...input, username: e.target.value })} required />
                    <div class="form"> 
                        <input type="password" class="form-control" placeholder="Password" value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} required/> 
                        <a href=" # ">Forgot?</a> 
                    </div> 
                    {/* <Link to="/users/google"> */}
                        <button class="btn btn-danger btn-block continue" type='submit' href='http://localhost:3000/users/google'>Continue</button>
                    {/* </Link> */}
                    <div class="d-flex justify-content-center align-items-center mt-3 mb-3"> 
                        <span class="line"></span> 
                        <small class="px-2 line-text">OR</small> 
                        <span class="line"></span> 
                    </div> 
                    {/* <button class="btn btn-danger btn-block continue google-button d-flex justify-content-start align-items-center"> 
                        <i class="fa fa-google ml-2"></i> 
                        <span class="ml-5 px-4">Continue with Google</span> 
                    </button> */}
                    {/* <GoogleLogin
                     className='googleButton'
                     clientId='550939962948-srgtakf8176b6pikq34l4l3ed68l5q2b.apps.googleusercontent.com'
                     buttonText='Ingresa con Google'
                     onSuccess={responseGoogle}
                     onFailure={responseGoogle}
                     cookiePolicy={'single_host_origin'}
                    /> */}
                </div>
                <div class="p-3 d-flex flex-row justify-content-center align-items-center member"> 
                    <span>Not a member? </span> 
                    <a href="/createuser" class="text-decoration-none ml-2">SIGNUP</a> 
                </div>
              </div>
             </div>
        </form>
    </div>

    )
}

export default Form;