import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import '../css/Beers.css'
import { addCart, createOrder} from '../Redux/actions/index.js';
import swal from 'sweetalert';


export default function Beers ({id, name, impression, aroma, ingredients, flavor, IBU, ABV, history, image, examples, price, stock}) {
const {cart} = useSelector(s => s)
const dispatch = useDispatch()
const user = JSON.parse(localStorage.getItem('login'))
const historyy = useHistory();

const handleClick = (e) => {
    e.preventDefault();
    dispatch(addCart(id))
    console.log('cart', cart)
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
        dispatch(createOrder(user.id, {totalPrice: price, quantity: cart.quantity ? cart.quantity : 1}));
        historyy.push('/order')
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
            <div class="product">
            <img class='imgbeer'src={image} alt=" " />
			    <div class="buttons">
			        <a id = 'alerting' class="buy" href=" " onClick={(e) => handleClick(e)}>Add to cart</a>
                    <Link to={`/beers/${id}`}>
                        <a class="preview" href=" ">View item</a>
                    </Link>
		        </div>
	        </div>
            <div className='info'>
                <Link to={`/beers/${id}`}>
                    <h4>{name}</h4>
                </Link>
                <span className='description'> 
                    IBU: {IBU} <br/>
                    ABV: {ABV} <br/>
                </span>
                <span className='price'>US{formato.format(price)}</span>
                <a class='buy_now' href=' ' onClick={(e) => handleOnClick(e)}>Buy Now</a>
            </div>
            <div className='details'>
                <span className='stock'>
                    Stock: {stock} <br/>
                </span>
            </div>
        </div>
    )
}