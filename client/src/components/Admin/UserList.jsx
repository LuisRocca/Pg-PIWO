import React, { useState, useEffect } from 'react';
import { UpgradeUser, listUser, getuser } from '../../Redux/actions';
import { useSelector, useDispatch } from "react-redux";
import {useHistory } from "react-router-dom";
import axios from 'axios';
import NavBar from "../NavBar";
import styles from '../../css/UserList.module.css';
import swal from 'sweetalert';

const Upgrade = () => {

    const [user, setUser] = useState('');
    const [input, setInput] = useState({
        email: "",
        admin: ""
    });
    const ListUser = useSelector(state => state.listUser)
    const dispatch = useDispatch()
    const history = useHistory()

    function previousValues(e) {
        axios.get(`http://localhost:3001/users/${e}`)
            .then(res => {
                console.log(res);
                const c = res.data;
                setUser(e)
                setInput({
                    email: c.email,
                    admin: c.admin.toString(),
                });
            })
    }

    useEffect(() => {
        dispatch(listUser());
        dispatch(getuser());
    }, [dispatch])

    function updateUser(e, user) {
        e.preventDefault();
        dispatch(UpgradeUser(user));
        swal("The user was successfully upgraded to admin", {
            buttons: false,
            icon: 'success',
            timer: 1500,
          });
        setInput({
            email: "",
            admin: ""
        });
        history.push('/admin')
    }

    const filteredUsers = ListUser.filter(user => {
        return (user.email, user.admin.toString())
    })

    return (
        <div>
            <NavBar />
            <div className={styles.section}></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Upgrade User</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>User</label>
                                            <select className="form-control" onChange={(e) => previousValues(e.target.value)}>
                                                <option value="">Select User</option>
                                                {filteredUsers.map(user => {
                                                    return (
                                                        <option key={user.id} value={user.id}>{user.username}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Admin</label>
                                            <select className="form-control" value={input.admin} onChange={(e) => setInput({ ...input, admin: e.target.value })}>
                                                <option value="">Select Admin</option>
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button className="btn btn-primary" onClick={(e) => updateUser(e, user)}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Upgrade;