import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loginUser, LIST_USERS, setUser } from "../../Redux/actions/index.js";
import { useEffect } from "react";
import "./Login.css";
import NavBar from '../NavBar.jsx';
import swal from 'sweetalert';


const Form = () => {
    
const dispatch = useDispatch();
const history = useHistory();
const user = useSelector(state => state.user)
const [input,setInput] = useState({
    username: '',
    password: '',
});
const local = window.localStorage.getItem('login')
// let user = JSON.parse(window.localStorage.getItem('login'));
// console.log('este es el que acab 21liunea', user) 

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
    // console.log('antes del dispa ',user)
    axios.post("http://localhost:3001/users/google", input)
    .then(res =>{
        if(res.status === 200){
            window.localStorage.setItem('login', JSON.stringify(res.data.user))
            history.push('/beers')
        }
    })
    .catch(err => 
        swal("Error", {
        buttons: false,
        icon: 'error',
        timer: 1500,
        }
        )
        )
    setInput({username: '',password: ''})   
    // history.push('/beers')
        // swal("Error", {
        // buttons: false,
        // icon: 'error',
        // timer: 1500,
        // }
        // )
    }



    
    // .then(()=>{
    //     history.push('/users/google')
    //     window.location.reload();
    // })
    // swal("Logged in successfully!", {
    //     buttons: false,
    //     icon: 'success',
    //     timer: 1500,
    //   });
    // setInput({
    //     username: '',
    //     password: ''
    // })

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
                    <button class="btn btn-danger btn-block continue facebook-button d-flex justify-content-start align-items-center"> 
                        <i class="fa fa-facebook ml-2"></i> 
                        <span class="ml-5 px-4">Continue with facebook</span> 
                    </button> 
                    <button class="btn btn-danger btn-block continue google-button d-flex justify-content-start align-items-center"> 
                        <i class="fa fa-google ml-2"></i> 
                        <span class="ml-5 px-4">Continue with Google</span> 
                    </button>
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
