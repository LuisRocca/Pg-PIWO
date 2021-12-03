import React from 'react'
import { addCart, delCart, delAllCart } from '../../Redux/actions';
// import Beers from '../Beers'
// import {Link} from 'react-router-dom';
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';


export default function Cart ({id, name, price, image, quantity, total}) {

  const {cart} = useSelector((state) => state)
  const dispatch = useDispatch()
  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(delCart(id))
    // JSON.parser(window.localStorage.getItem('carrito'))
  }
  useEffect(() => {
    cart.length>0?
    window.localStorage.setItem('carrito', JSON.stringify(cart))
    : JSON.stringify(window.localStorage.getItem('carrito'))
},[cart])

  return (
    <div>
      <div>
        <button onClick={(e) => handleOnClick(e)}>X</button>
      </div>
      <h3>{name}</h3>
      <h3>US${price}</h3>
      <img src={image} alt="Not found" height='200vw' weight='200vw'/>
      <h4>US${price} x {quantity}u = US${price * quantity}</h4>
    </div>
  )
}

