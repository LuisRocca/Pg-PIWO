import React from 'react';
// import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { delCart, delAllCart, setCart, createOrder, getId} from "../../Redux/actions";
import Cart from './Cart.jsx';
import { useHistory } from 'react-router';
import swal from 'sweetalert';


export default function Carting () {
  const dispatch = useDispatch();
  const history = useHistory()
  let { cart, orders} = useSelector((state) => state)
  const carrito =  JSON.parse(window.localStorage.getItem('carrito'))
  const user = JSON.parse(window.localStorage.getItem('login'))
  console.log("aca esta el orders",  orders)
  // console.log(carrito)
  const clickToDelete = (e) => {
    e.preventDefault();
    dispatch(delAllCart())
    // window.localStorage.removeItem('carrito')
  }
  let total = 0;
  let totalQuantity = 0;
  cart.length>0 && cart.map(e => {
    total = total + (e.price * e.quantity);
    totalQuantity = Number(totalQuantity) + Number(e.quantity)
  })
// let precioUnitario = "";
// cart.length>0 && cart.map(i =>{
//   precioUnitario = ""+ precioUnitario + (i.price * i.quantity)
// })
// let pr = precioUnitario.split()
//   console.log("este es la line 38 del carting", precioUnitario )
                                                            

  if ( cart.length === 0 && carrito) {
    dispatch(setCart(carrito))
  }
        
  useEffect(() => {
    cart.length>0?
    window.localStorage.setItem('carrito', JSON.stringify(cart))
    : JSON.stringify(window.localStorage.getItem('carrito'))
},[cart])

useEffect(() => {                                                                                                                    
  dispatch(getId(orders));
}, [orders]);


const handleClick = (e) => {
  if (user.name) {
    e.preventDefault()
    dispatch(createOrder(user.id, {totalPrice: total, quantity: totalQuantity }))
    history.push('/order')
    window.localStorage.removeItem('carrito')
    dispatch(setCart([]))
  } else {
    // if (user) {
      history.push('/users/google')
      swal("You need to sign in to proceed with this purchase", {
        buttons: false,
        icon: 'error',
        timer: 1500,
      });
    // }
  }

}

const formato = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})

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
  <h1>TOTAL = US{formato.format(total)}</h1>
  <div>
    <button onClick={() => history.push('/beers')}>Back to Home</button>
  </div>
  <div>
          <button onClick={(e) => handleClick(e)}>Checkout</button>
  </div>
  </div>
          )
}
