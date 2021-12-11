import React,{useState} from 'react'
import { addCart, delCart, delAllCart, quantity_item } from '../../Redux/actions';
// import Beers from '../Beers'
// import {Link} from 'react-router-dom';
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import "../../css/Cart.css"


export default function Cart ({id, name, price, image, quantity}) {

  let {cart} = useSelector((state) => state)
  console.log(cart, "este es linea 13 pero de cart")
  const dispatch = useDispatch()
  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(delCart(id))
    if (JSON.parse(window.localStorage.getItem('carrito'))[0] ) {
      window.localStorage.removeItem('carrito')
    } else {
      window.localStorage.setItem('carrito',JSON.stringify(cart))
    }
  }
  const handleQuantity= (e) => {
    e.preventDefault()
    dispatch(quantity_item({id, cantidad: e.target.value}))
    // console.log('target', e.target.value)
  }
  // console.log('quantity ', quantity)
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
        <h4>US${price} x <input type="number" min='1' max='30' value={quantity} onChange={handleQuantity}/>u = US${price * quantity}</h4>
        </div>
        </div>
      </div>
      </div>
    </div>
  )
}

