import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { CREATE_USERS} from "../../Redux/actions/index.js"
import { useHistory } from 'react-router-dom';
import {createUsers} from '../../Redux/actions/index.js'
import NavBar from '../NavBar.jsx';

const CreateUser = () => {

  const {users} = useSelector((state) => state)
  console.log(users);
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    lastName: '',
    image: '',
    address: ''
  });
const history = useHistory();
const dispatch = useDispatch()

function User(e, input){
  e.preventDefault();
  
  dispatch(createUsers(input))
  .then(() => {
    history.push('/users')
    window.location.reload();
})
setInput({
  username: '',
  email: '',
  password: '',
  name: '',
  lastName: '',
  image: '',
  address: ''
});
}
const onChange = e => {
  const files = e.target.files;
  const file = files[0];
  getBase64(file);
};

const onLoad = fileString => {
  setInput({ ...input, image : fileString})
};

const getBase64 = file => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    onLoad(reader.result);
  };
  reader.onerror = function (error){
    alert ('No se puede cargar la imagen, porfavor intentarlo nuevamente')
  };
};

console.log("create",input)
  return (
    <div>
      <NavBar />
    {/* <form onSubmit={(e) => User(e, input)}>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label >Nombre</label>
        <input type="text" class="form-control"  placeholder="Nombre" value={input.name} onChange={e => setInput({ ...input, name: e.target.value })} required />
      </div>

      <div class="form-group col-md-6">
        <label >Apellido</label>
        <input type="text" class="form-control" placeholder="Apellido"  value={input.lastName} onChange={e => setInput({ ...input, lastName: e.target.value })} required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label >Email</label>
        <input type="email" class="form-control" placeholder="Email" value={input.email} onChange={e => setInput({ ...input, email: e.target.value })} required />
      </div>

      <form class="md-form">
        <div class="form-group col-md-6">
          <div class="btn btn-outline-warning btn-sm ">
            <span>Seleccionar imagen </span>
            <input type="file" onChange={onChange} />
          </div>
          
        </div>
      </form>

      <div class="form-group col-md-6">
        <label >Contraseña</label>
        <input type="password" class="form-control" placeholder="Contraseña"  value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} required />
      </div>
      <div class="form-group col-md-6">
        <label >Username</label>
        <input type="text" class="form-control" placeholder="Username"  value={input.username} onChange={e => setInput({ ...input, username: e.target.value })} required />
      </div>
      
    </div>

    <div class="form-group">
      <label >Dirección</label>
      <input type="text" class="form-control" placeholder="Dirección"  value={input.address} onChange={e => setInput({ ...input, address: e.target.value })} required />
    </div>
  
    <button type="submit" class="btn btn-primary">Crear Usuario</button>

  </form> */}
  <form onSubmit={(e) => User(e, input)}>
    <div class="body-background">
      <div class="container-fluid d-flex justify-content-center align-items-center h-100">
          <div class="card p-3 text-center py-4">
              <h4>Create account</h4>
              <div> <span>Already have an account?</span> <a href="http://localhost:3000/users/google" class="text-decoration-none">Signin</a> </div>
              <div class="input-group px-3 mt-3"> <input type="text" class="form-control" placeholder="First Name" aria-label="Username" value={input.name} onChange={e => setInput({ ...input, name: e.target.value })} required/> <span></span> 
              <input type="text" class="form-control" placeholder="Last Name" value={input.lastName} onChange={e => setInput({ ...input, lastName: e.target.value })} required aria-label="Server"/> </div>
              <div class="mt-3 px-3"> <input class="form-control" placeholder="Username" value={input.username} onChange={e => setInput({ ...input, username: e.target.value })} required/> </div>
              <div class="mt-3 px-3"> <input type='password' class="form-control" placeholder="Password" value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} required/> </div>
              <div class="mt-3 px-3"> <input class="form-control" placeholder="E-mail" value={input.email} onChange={e => setInput({ ...input, email: e.target.value })} required/> </div>
              <div class="mt-3 px-3"> <input class="form-control" placeholder="Address" value={input.address} onChange={e => setInput({ ...input, address: e.target.value })} required/> </div><br/>
          <form class="md-form">
              <div class="form-group col-md-6 justify-content-center">
                <div class="btn btn-outline-success btn-sm ">
                  <span>Choose an image </span>
                  <input type="file"  onChange={onChange} />
                </div>          
              </div>
          </form>

              <div class="mt-3 d-grid px-3"> <button type='submit' class="btn btn-primary btn-block btn-signup text-uppercase"> <span>Signup</span> </button> </div>
              <div class="px-3">
                  <div class="mt-2 form-check d-flex flex-row"> <input class="form-check-input" type="checkbox" value="" id="services"/> <label class="form-check-label ms-2" for="services"> I have read and agree to the terms. </label> </div>
              </div>
          </div>
      </div>
    </div>
  </form>

  </div>
)
}

export default CreateUser;