import React, { useState } from 'react';
import { ResetPassword, logoutUser } from '../../Redux/actions/index.js';
import { useDispatch, useSelector } from "react-redux";
import {  useHistory } from 'react-router-dom';


const PasswordReset = () => {

  const [errors, setErrors] = useState({noInputs : 'No hay inputs'});
  const [input, setInputs] = useState({
    password: "",
  });
  
  var pass1 = document.getElementById('pass1');
  var pass2 = document.getElementById('pass2');

  const user = useSelector(state => state.currentUser)
  
  const dispatch = useDispatch();
  const history = useHistory();


  function UpdatePassword(e, user, input) {
    e.preventDefault();
    dispatch(ResetPassword(user, input))
    dispatch(logoutUser())
     .then(() => {
      history.push('/')
      window.location.reload();
  })
    
    setInputs({
        password: "",
    });
  }

  
  
  function isNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }

    
  const handleInputChange = function(e) {
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    },pass1, pass2));
    setInputs({
        password: e.target.value
    })
  }


  return (

    <form className="m-5" onSubmit={(e) => UpdatePassword(e, user.id, input)}>
        <h2>Cambiar contraseña</h2>
      <div  className="form-row m-3">
      <input type="password" class="form-control" placeholder = "Nueva contraseña" name = "password" id="pass1" onChange={(e)=>handleInputChange(e)}/>
      </div>
      <div  className="form-row m-3">
      <input type="password" class="form-control" placeholder = "Confirmar nueva contraseña" name = "password2" id ="pass2" onChange={(e)=>handleInputChange(e)}/>
      </div>
      { errors.name && ( <p class="alert alert-danger ocultar">{errors.name }</p> )}
      <div className="container text-center  d-flex justify-content-center align-items-center">
        <input type="submit" disabled = {isNotEmpty(errors)} className="btn btn-warning m-3" value="MODIFICAR CONTRASEÑA" />
      </div>
    </form>
  )
}

export function validate(input, pass1, pass2) {
  let errors = {};
  if (!input.password) {
    errors.name = 'Contraseña es un campo obligatorio';
  }
  if (pass1.value !== pass2.value) {
    errors.name = 'Las contraseñas no coinciden';
  }
  return errors;
}

export default PasswordReset;