import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import '../css/Beers.css'
import { addCart, createOrder, getOrder, setCart} from '../Redux/actions/index.js';
import swal from 'sweetalert';


export default function Beers ({id, name, impression, aroma, ingredients, flavor, IBU, ABV, history, image, examples, price, stock}) {
const cart = useSelector(state => state.cart)
const dispatch = useDispatch()
const user = JSON.parse(localStorage.getItem('login'))
const historyy = useHistory();
// console.log('cart', cart)
const beer = {id, name, impression, aroma, ingredients, flavor, IBU, ABV, history, image, examples, price, stock}

const handleClick = (e) => {
    e.preventDefault();
    dispatch(addCart(id))
    if (Array.isArray(cart))dispatch(createOrder(user.id, [...cart, beer]))
    
    // if (!JSON.parse(window.localStorage.getItem('carrito'))) {
    //     window.localStorage.setItem('carrito',JSON.stringify(cart))
    // }
    swal("Added to the cart successfully!", {
        buttons: false,
        icon: 'success',
        timer: 1500,
      });
}

// const quantity = {quantity: cart.quantity ? cart.quantity : 1};
const handleOnClick = (e) => {
    e.preventDefault()
    if (user.name) {
        dispatch(setCart([]))
        dispatch(addCart(id))
        dispatch(createOrder(user.id, cart));
        historyy.push('/cart')
    } else {
        swal("You need to sign in to proceed with this purchase", {
            buttons: false,
            icon: 'error',
            timer: 1500,
          });
    }
}
  const formato = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
  })
    return (
        <div className="box">
            <div className="product">
            <img className='imgbeer'src={image} alt=" " />
			    <div className="buttons">
                    <Link to={`/beers/${id}`}>
                        <a className="preview" href=" ">View item</a>
                    </Link>
		        </div>
	        </div>
            <div className='info'>
                <Link style={{ textDecoration: 'none', color: 'white' }} to={`/beers/${id}`}>
                    <h4>{name}</h4>
                </Link>
                <span className='description'> 
                    IBU: {IBU} <br/>
                    ABV: {ABV} <br/>
                </span>
                <span className='price'>US{formato.format(price)}</span>
                <a class='buy_noww' href=' ' onClick={(e) => handleClick(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-cart4" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                    </svg>                        

                </a>
            </div>
            <div className='details'>
                <span className='stock'>
                    Stock: {stock} <br/>
                </span>
            </div>
        </div>
    )
}