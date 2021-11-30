import React from 'react'
// import Beers from '../Beers'
// import {Link} from 'react-router-dom';
// import {useState, useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';

const Cart = (name, price) => {
  return (
    <div>
      <h1>{name}</h1>
      <h3>{price}</h3>
    </div>
  )
}

export default Cart