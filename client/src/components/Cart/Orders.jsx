import React, { useEffect, useState } from "react";
import { getOrder, getId } from "../../Redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Checkout from "../mercadopago/Checkout";
import axios from "axios";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const user = JSON.parse(window.localStorage.getItem("login"));
  // const order = useSelector((state) => state.order);
  const mp = useSelector((state) => state.mpData);


   console.log(Array.isArray(orders) && orders[0], '13 de orders')
  let ordenMp = Array.isArray(orders) && orders[0]
  // useEffect(() => { 
  //   dispatch(getId(orders));
  // }, []);
  
  // console.log('este es el url', mp.data.url)

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getId({...ordenMp}));
    // console.log('este es el id', JSON.stringify(mp.data.url.split('=')[1]))
  }
  // const data  = {id: mp.data.split('=')[1] };
  // console.log(data, "este hijo de puta es data")
  let data = 1
  return (
    <div>
      {orders ? (
        orders.map((e) => {
          return (
            <div>
              <h1>Total: US${e.totalPrice}</h1>
              <h1>Address: {e.address}</h1>
              <h1>Status: {e.status}</h1>
              <h1>Email: {e.email}</h1>
              <h1>Quantity: {e.quantity}</h1>
            </div>
          );
        })
      ) : (
        <h1>No orders</h1>
      )}
      <div>
        <button onClick = {(e) => handleClick(e)}>Ready to pay?</button>
      </div>
      <div>
        
        { 
        // mp ? 
        //  <p>Aguarde un momento...</p>
        //  : 
         <Checkout productos={orders} data={mp.data.url.split('=')[1]} />
         
         }

        <Link to="/beers">
          <button >Back Home</button>
        </Link>
      </div>
      <div></div>
    </div>
  );
}
