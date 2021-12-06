import React from 'react'
import { addCart, delCart, delAllCart } from '../../Redux/actions';
// import Beers from '../Beers'
// import {Link} from 'react-router-dom';
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import "../../css/Cart.css"


export default function Cart ({id, name, price, image, quantity, total}) {

  let {cart} = useSelector((state) => state)
  const dispatch = useDispatch()
  let carrito = JSON.parse(window.localStorage.getItem('carrito'))
  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(delCart(id))
    if (JSON.parse(window.localStorage.getItem('carrito'))[0] ) {
      window.localStorage.removeItem('carrito')
    } else {
      window.localStorage.setItem('carrito',JSON.stringify(cart))
    }
    // window.localStorage.setItem('carrito', cart)
    // console.log(JSON.parse(window.localStorage.getItem('carrito')).length)
    // if (JSON.parse(window.localStorage.getItem('carrito').length === 1)) {
    //     window.localStorage.clear('carrito')
      // }
      // } else {
        //   cart = [];
        // }
        
      }
      // console.log(JSON.parse(window.localStorage.getItem('carrito')))
//   useEffect(() => {
//     cart && cart.length > 0 ? window.localStorage.setItem('carrito', JSON.stringify(cart))
//     : JSON.stringify(window.localStorage.getItem('carrito'))
// },[cart])

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

