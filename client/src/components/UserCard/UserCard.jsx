import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUsers, logoutUser } from "../../Redux/actions/index.js"
import { useHistory } from 'react-router-dom'

const UserCard = () => {
 
  // const user = useSelector(state => state.currentUser)
  const user = JSON.parse(window.localStorage.getItem('login'))
  const history = useHistory();
  const dispatch = useDispatch()


  function handleClick() {
  
      dispatch(logoutUser())
      .then(() => {
        history.push('/')
        window.location.reload();
      })
  }

  console.log(user)

  return (
    <div>
     <button class="btn dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src={user.user.image} style={{borderRadius: "50%", width: "40px", height: "40px"}}/>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Mi perfil</a>
        {user.user.admin === true ? <a class="dropdown-item" href="/admin">Panel de administrador</a> : null }
        <a class="dropdown-item" href={`/${user.user.id}/passwordReset`}>Cambiar contraseña</a>
        <button class="dropdown-item" type="button" onClick = {() => handleClick()}>Cerrar sesion</button>
      </div>
    </div>
  );
};
export default UserCard;