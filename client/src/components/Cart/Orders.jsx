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
  const mp = useSelector((state) => state.mpData);
  
  let ordenMp = orders;

  const handleClick = (e) => {
    e.preventDefault()
  
    let data = ordenMp;
    console.log(data)
    dispatch(getId(data));
    
  }

  return (
    <div>
      {
        orders ? <div>
             <h1>Total: US${orders.totalPrice}</h1>
              <h1>Address: {orders.address}</h1>
              <h1>Status: {orders.status}</h1>
              <h1>Email: {orders.email}</h1>
              <h1>Quantity: {orders.quantity}</h1>
        </div>: <h1> No orders </h1>
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

        <Link to="/beers">
          <button >Back Home</button>
        </Link>
      </div>
      <div></div>
    </div>
  );
}
