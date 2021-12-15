import React, { useEffect, useState } from "react";
import { getOrder, getId, setMp} from "../../Redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Checkout from "../mercadopago/Checkout";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const cart = useSelector((state) => state.cart);
  const user = JSON.parse(window.localStorage.getItem("login"));
  // const order = useSelector((state) => state.order);
  const history = useHistory();
  const mp = useSelector((state) => state.mpData);
  // var aux = 1


  const formato = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

  let [showOrder, setShowOrder] = useState(false)

  const handleShowOrder = (e) => {
    e.preventDefault()
    if (showOrder === false) {
      setShowOrder(true)
    } else {
      setShowOrder(false)
    }
  }
  
  //  console.log(orders, '13 de orders')
   let arr = []
  let ordenMp = orders ? orders : orders[0];
  // console.log('ACA LLEGA LA ORDEN LUIS', ordenMp);
  // console.log('ESTA ES LA ORDEN', orders)
  // console.log('este es el url', mp.data.url) 

  const handleClick = (e) => {
    e.preventDefault()
    // dispatch(getOrder(user.id))
    let data = ordenMp;
    console.log(data)
    dispatch(getId(data));
    // console.log('este es el id', JSON.stringify(mp.data.url.split('=')[1]))
  }
  const handleHome = (e) => {
    dispatch(setMp([]))
    history.push('/beers')
  }
  useEffect(() => { 
    dispatch(getOrder(user.id));
  }, []);
  
  if (Array.isArray(orders.carrito)) {
    console.log('precio',orders.carrito[0].price);
    console.log('cantidad',orders.carrito[0].quantity);
    console.log(orders.carrito.forEach((e) => console.log('total', e.price * Number(e.quantity))));
  //   // var total = orders.carrito.forEach((e) => Number(e.price) * Number(e.quantity))
    let total = 0;
    var t = 0
    total = orders.carrito.map((e) => Number(e.price) *  Number(e.quantity))
    for (let i = 0; i < total.length; i++) {
      t = t + total[i]
    }
    console.log('este es el total', t)
  }


  return (
    <div>
     {      showOrder ?
            
              <div>

                {/* <h1>Total: US${ orders.carrito.map((e) => Number(e.price) * Number(e.quantity))}</h1> */}
                <h1>Beers: {orders.carrito.map((e) =>
                  <div>
                  <br/>
                  <h1>Name: {e.name}</h1> 
                  <h1>Price: US${e.price}</h1>
                  <h1>Quantity: {e.quantity}</h1>
                  <h1>Subtotal: US{formato.format(e.price * Number(e.quantity))}</h1>
                  <br/>
                </div>
              )}</h1>
              <h1>Address: {orders.address}</h1>
              <h1>Status: {orders.status}</h1>
              <h1>Email: {orders.email}</h1>
              <h1>Total Price: US{formato.format(t)}</h1>
              <button  onClick={(e) => handleShowOrder(e)}>Hide order</button>
              </div>
              : <button  onClick={(e) => handleShowOrder(e)}>View order</button>
            }   
     
      <div>
        <button onClick = {(e) => handleClick(e)}>Ready to pay?</button>
      </div>
      <div>
        
        { 
        mp.length === 0 ? 
         <p>Aguarde un momento...</p>
         : 
         <Checkout productos={orders} data={{id: mp.data.init_point}} />
         
         }
      
          <button onClick={(e) => handleHome(e)}>Back Home</button>
      </div>
      <div></div>
    </div>
  );
}