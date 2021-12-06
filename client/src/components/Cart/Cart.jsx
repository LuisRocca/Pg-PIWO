import React from 'react'
import { addCart, delCart, delAllCart } from '../../Redux/actions';
import "../../css/Cart.css"
// import Beers from '../Beers'
// import {Link} from 'react-router-dom';
// import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';


export default function Cart ({id, name, price, image, quantity, total}) {

  // const {cart} = useSelector((state) => state)
  const dispatch = useDispatch()
  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(delCart(id))
    // JSON.parser(window.localStorage.getItem('carrito'))
  }
  // window.localStorage.setItem('carrito', JSON.stringify(cart))

  return (
    <div className="cart-cont">
    <div  className="order">
      <div className="shopping-cart">
        <div className="item"> 
      <div>
        <button className="button-X" onClick={(e) => handleOnClick(e)}><span> X </span></button>
      </div>
      <div className="cart-imagen">
      <img src={image} alt="Not found"/>
      </div>
      <h3 className="name-cart">{name}</h3>
      <div className="quantity">
      <h3 className="price">US${price}</h3>
      <h4>US${price} x {quantity}u = US${price * quantity}</h4>
      </div>
      </div>
    </div>
    </div>
    </div>
  )
}

