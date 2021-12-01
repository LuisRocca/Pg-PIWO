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
  const { cart } = useSelector((state) => state)

  console.log(cart);

  const clickToDelete = (e) => {
    e.preventDefault();
    dispatch(delAllCart())
  }

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
  <div>
    {cart ? cart.map((e) => {
      let total = 0;
      return (
        <h2>TOTAL = {total + e.price}</h2>
      )
    }): <h4>NO HAY NADA EN EL CARRITO</h4>}
  </div>
  <div>
    <button onClick={() => history.push('/beers')}>Back to Home</button>
  </div>
  </div>
          )
}
