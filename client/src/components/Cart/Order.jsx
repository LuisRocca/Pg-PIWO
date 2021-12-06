import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCart, delCart, delAllCart} from "../../Redux/actions";
import Cart from './Cart.jsx';
import { useHistory } from 'react-router';
import "../../css/Order.css"


export default function Order () {
  const dispatch = useDispatch();
  const history = useHistory()
  const { cart, otherCart, localCart } = useSelector((state) => state)

  // console.log(JSON.parse(otherCart))
  // console.log('carrito perro', cart)
  // let storage = window.localStorage
  // storage.setItem('carrito', JSON.stringify(cart))
  // storage.setItem('carrito', cart)
  // console.log(window.localStorage.carrito);

  // console.log('hola', JSON.parse(storage))

  // let cartStorage = JSON.parse(storage.getItem('carrito'))

  // console.log('chua',cartStorage)

  // console.log(cart);

  // let newCart = JSON.parse(window.localStorage.getItem('carrito'))

  const clickToDelete = (e) => {
    e.preventDefault();
    dispatch(delAllCart())
    // window.localStorage.removeItem('carrito')
  }
  let total = 0;
  cart && cart.map((e => {
    total = total + (e.price * e.quantity);
  }))

  return (

  <div>
  <div>
    <div className="nav-cart">
      <div className="name">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Shopping_cart_font_awesome.svg/1200px-Shopping_cart_font_awesome.svg.png" alt="" />
      </div>
        <button className="cart-button" onClick={() => history.push('/beers')}>Home</button>
    </div>
    {cart ? cart.map((e) => {
        return (
          <div > 
            <div>
                <Cart 
                image = {e.image}
                id = {e.id}
                name = {e.name}
                price = {e.price}
                quantity = {e.quantity}
                />
            </div>
          </div>
            )
    }): <h4>NO HAY NADA EN EL CARRITO</h4>}     
  </div>
  <div className="cart-footer">
  <h2>TOTAL = US${total}</h2>
  <a onClick={(e) => clickToDelete(e)}>CLEAR CART</a>
  </div>
  </div>

          )
}
