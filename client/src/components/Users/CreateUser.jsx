import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { CREATE_USERS} from "../../Redux/actions/index.js"
import { useHistory } from 'react-router-dom';
import {createUsers} from '../../Redux/actions/index.js'

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

    <form onSubmit={(e) => User(e, input)}>
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
  
    <button type="submit" class="btn btn-primary">Sign in</button>

  </form>
  </div>
)
}

export default CreateUser;