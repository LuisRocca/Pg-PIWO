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


   console.log(orders, '13 de orders')
   let arr = []
  let ordenMp = orders[0];
  console.log('ACA LLEGA LA ORDEN LUIS', ordenMp);
  // useEffect(() => { 
  //   dispatch(getId(orders));
  // }, []);
  
  // console.log('este es el url', mp.data.url) 

  const handleClick = (e) => {
    e.preventDefault()
  
    let data = ordenMp;
    console.log(data)
    dispatch(getId(data));
    // console.log('este es el id', JSON.stringify(mp.data.url.split('=')[1]))
  }
  // const data  = {id: mp.data.split('=')[1] };
  // console.log(data, "este hijo de puta es data")
  
  return (
    <div>
      {/* {orders ? (
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
      )} */}
      {
        orders ? <div>
             <h1>Total: US${orders[0].totalPrice}</h1>
              <h1>Address: {orders[0].address}</h1>
              <h1>Status: {orders[0].status}</h1>
              <h1>Email: {orders[0].email}</h1>
              <h1>Quantity: {orders[0].quantity}</h1>
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
