import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCart, delCart, delAllCart, setCart} from "../../Redux/actions";
import Cart from './Cart.jsx';
import { useHistory } from 'react-router';


export default function Carting () {
  const dispatch = useDispatch();
  const history = useHistory()
  let { cart, otherCart } = useSelector((state) => state)
  
  // if (JSON.parse(window.localStorage.getItem('carrito'))[0] && cart.length == 0 ) {
  //   cart = JSON.parse(window.localStorage.getItem('carrito'))
  // }

  const carrito =  JSON.parse(window.localStorage.getItem('carrito'))
  //  const cart1 = cart;
  // console.log('aaaaaaaaaaaaaaaa', cart1)
  // // carrito? carrito.map(el => dispatch(addCart(el.id))): console.log('carrito', carrito)
  const clickToDelete = (e) => {
    e.preventDefault();
    dispatch(delAllCart())
    // window.localStorage.removeItem('carrito')
  }
  let total = 0;
  carrito && carrito.map((e => {
    total = total + (e.price * e.quantity);
  }))

  if ( cart.length === 0 && carrito) {
    dispatch(setCart(carrito))
  }
        
  useEffect(() => {
    cart.length>0?
    window.localStorage.setItem('carrito', JSON.stringify(cart))
    : JSON.stringify(window.localStorage.getItem('carrito'))
},[cart])

  return (

    
<div>
  <div>
    <button onClick={(e) => clickToDelete(e)}>CLEAR CART</button>
    {cart ? cart.map((e) => {
        return (
          <div>
            <div>
                <Cart 
                id = {e.id}
                name = {e.name}
                price = {e.price}
                image = {e.image}
                quantity = {e.quantity}
                />
            </div>
          </div>
            )
    }): <h4>NO HAY NADA EN EL CARRITO</h4>}     
  </div>
  <h1>TOTAL = US${total}</h1>
  <div>
    <button onClick={() => history.push('/beers')}>Back to Home</button>
  </div>
  </div>
          )
}
