import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCart, delCart, delAllCart} from "../../Redux/actions";
import Cart from './Cart.jsx';
import { useHistory } from 'react-router';


export default function Order () {
  const dispatch = useDispatch();
  const history = useHistory()
  const { cart, otherCart, localCart } = useSelector((state) => state)

  const carrito =  JSON.parse(window.localStorage.getItem('carrito'))
  // console.log(carrito)
  // carrito? carrito.map(el => dispatch(addCart(el.id))): console.log('carrito', carrito)
  const clickToDelete = (e) => {
    e.preventDefault();
    dispatch(delAllCart())
    // window.localStorage.removeItem('carrito')
  }
  let total = 0;
  carrito && carrito.map((e => {
    total = total + (e.price * e.quantity);
  }))

  return (
<div>
  <div>
    <button onClick={(e) => clickToDelete(e)}>CLEAR CART</button>
    {carrito ? carrito.map((e) => {
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
