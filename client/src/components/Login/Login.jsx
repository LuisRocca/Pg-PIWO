import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { loginUser, LIST_USERS } from "../../Redux/actions/index.js";
import "./Login.css";
import NavBar from '../NavBar.jsx';


const Form = () => {
    const [input,setInput] = useState({
        username: '',
        password: '',
});

const dispatch = useDispatch();
const history = useHistory();

function User(e) {
    e.preventDefault();
    dispatch(loginUser(input))
    .then(()=>{
        history.push('/')
        window.location.reload();
    })
    setInput({
        username: '',
        password: ''
    })
}
return (
    <div>
        <NavBar/>
    {/* <div className="form">
        <div className="sesion">Iniciar Sesión</div>
        <form onSubmit={(e) => User(e)}>
            <div >
                <input className="input" type="username" placeholder="Username" value={input.username} onChange={e => setInput({ ...input, username: e.target.value })} required />

            </div>
            <div >
                <input className="input" type="password" placeholder="Contraseña" value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} required />
            </div>
            <div className="boton">
                    <input className="submit" type="submit" value="INICIAR SESIÓN" />
                    <a href = "http://localhost:3000/users/google">
                    <div className="google-btn">
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                        </div>
                        <p className="btn-text"><b>Iniciar sesión con Google</b></p>
                    </div>
                    </a>
                </div>
                <div className="login">No tenes cuenta?
                        <Link className="nav-link" to='/createuser'>
                        Registrate
                        </Link>
                </div>
            </form>
            <small>Piwo e-commerce</small>
        </div> */}
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
                    <button class="btn btn-danger btn-block continue" type='submit' href='http://localhost:3000/users/google'>Continue</button>
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
