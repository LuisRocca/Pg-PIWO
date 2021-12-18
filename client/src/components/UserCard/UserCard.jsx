import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword, logoutUser, getOrder } from "../../Redux/actions/index.js"
import {Link, useHistory} from 'react-router-dom';
import NavBar from "../NavBar.jsx";
import "../../css/UserCardModule.css"

const UserCard = () => {

  const user = JSON.parse(window.localStorage.getItem('login'))
  const history = useHistory();
  const dispatch = useDispatch()
  const [password, setPassword] = useState('');
  const orders = useSelector(state => state.orders)

  function handleClick(e) {
    e.preventDefault();
    dispatch(ResetPassword(user.id, password))
    setPassword('')
    history.push('/beers')
  }

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    dispatch(getOrder(user.id))
  },[])

  return (

    <div>
   
      <div>
        <Link to='/beers'>
          <button type="button" className="btn m-3 btn-warning btn-lg"> Back home</button>
        </Link>
      </div>
      <div className="container">
      <div class="container profile-page">
    <div class="row">
        <div class="col-xl-6 col-lg-7 col-md-12">
            <div class="cardd profile-header">
                <div class="body">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-12">
                            <div class="profile-image float-md-right"> <img src={user.image ? user.image : "https://bootdey.com/img/Content/avatar/avatar7.png"} alt=""/> </div>
                        </div>
                        <div class="col-lg-8 col-md-8 col-12">
                            <h4 class="m-t-0 m-b-0"><strong>Name: {user.name}</strong></h4>
                            <h4 class="m-t-0 m-b-0"><strong>User Name: {user.username}</strong></h4>
                            <span class="job_post">Email: {user.email}</span>
                            <p>Address: {user.address}</p>
                            <div>
                            <input type="password" required autoComplete="off" value={password} onChange={(e) => handleChange(e)}/>
                            </div>
                              <br />
                            <div>
                                <button class="btn btn-warning  btn-round" onClick={(e) => handleClick(e)}>Change Password</button>
                            </div>
                        </div>                
                    </div>
                </div>                    
            </div>
        </div>
      </div>
    </div>
      </div>

      
    </div>
  );
};
export default UserCard;