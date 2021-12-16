import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword, logoutUser, getOrder } from "../../Redux/actions/index.js"
import {Link, useHistory} from 'react-router-dom';

const UserCard = () => {
 
  // const user = useSelector(state => state.currentUser)
  const user = JSON.parse(window.localStorage.getItem('login'))
  const history = useHistory();
  const dispatch = useDispatch()
  const [password, setPassword] = useState('');

  // console.log(password)
  function handleClick(e) {
    e.preventDefault();
    dispatch(ResetPassword(user.id, password))
    setPassword('')
      // .then(() => {
      //   history.push('/me')
      //   window.location.reload();
      // })
  }

  const handleChange = (e) => {
    setPassword(e.target.value);
};

  // console.log(user)

  return (
    <div>
      <div>
        <h1>Name: {user.name}</h1>
      </div>
      <div>
        <h1>Address: {user.address}</h1>
      </div>
      <div>
        <h1>Email: {user.email}</h1>
      </div>
      <div>
        <h1>Username: {user.username}</h1>
      </div>
      <div>
        <input type="text" autoComplete="off" value={password} onChange={(e) => handleChange(e)}/>
      </div>
      <div>
        <button onClick={(e) => handleClick(e)}>Change Password</button>
      </div>
      <div>
        <Link to='/beers'>
          <button>Back home</button>
        </Link>
      </div>
    </div>
  );
};
export default UserCard;