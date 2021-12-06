import React from 'react'
import { addCart, delCart, delAllCart } from '../../Redux/actions';
// import Beers from '../Beers'
// import {Link} from 'react-router-dom';
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';


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

