import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { createUsers } from '../../actions/index.js';
import { useHistory } from 'react-router-dom';

const CreateUser = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    lastName: '',
    address: ''
  });
} 