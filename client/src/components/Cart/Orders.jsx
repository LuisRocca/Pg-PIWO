import React, { useEffect, useState } from "react";
import { getOrder, getId, setMp} from "../../Redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Checkout from "../mercadopago/Checkout";
import NavBar from "../NavBar.jsx";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const user = JSON.parse(window.localStorage.getItem("login"));
  const history = useHistory();
  const mp = useSelector((state) => state.mpData);


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
  
  let ordenMp = orders ;


  const handleClick = (e) => {
    e.preventDefault()
    let data = ordenMp;
    // console.log(data)
    dispatch(getId(data));
  }
  const handleHome = (e) => {
    dispatch(setMp([]))
    history.push('/beers')
  }
  useEffect(() => { 
    dispatch(getOrder(user.id));
  }, []);
  
  if (Array.isArray(orders && orders.carrito)) {
    let total = 0;
    var t = 0
    total = orders.carrito.map((e) => Number(e.price) *  Number(e.quantity))
    for (let i = 0; i < total.length; i++) {
      t = t + total[i]
    }
  }


  return (
    <div>
      <NavBar/>
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
              <button className="btn btn-warning btn-lg" onClick={(e) => handleShowOrder(e)}>Hide order</button>
              </div>
              : <button className="btn btn-warning btn-lg" onClick={(e) => handleShowOrder(e)}>View order</button>
            }   
     
      <div>
        <button className="btn btn-warning btn-lg" onClick = {(e) => handleClick(e)}>Ready to pay?</button>
      </div>
      <div>
        
        { 
        mp.length === 0 ? 
         <p>Aguarde un momento...</p>
         : 
         <Checkout productos={orders} data={{id: mp.data.init_point}} />
         }
      
          <button className="btn btn-warning btn-lg" onClick={(e) => handleHome(e)}>Back Home</button>
      </div>
      <div></div>
    </div>
  );
}