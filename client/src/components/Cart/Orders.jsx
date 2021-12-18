import React, { useEffect, useState } from "react";
import { getOrder, getId, setMp } from "../../Redux/actions/index.js";
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

  const formato = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  let [showOrder, setShowOrder] = useState(false);

  const handleShowOrder = (e) => {
    e.preventDefault();
    if (showOrder === false) {
      setShowOrder(true);
    } else {
      setShowOrder(false);
    }
  };

  let ordenMp = orders;

  const handleClick = (e) => {
    e.preventDefault();
    let data = ordenMp;
    // console.log(data)
    dispatch(getId(data));
  };
  const handleHome = (e) => {
    dispatch(setMp([]));
    history.push("/beers");
  };
  useEffect(() => {
    dispatch(getOrder(user.id));
  }, []);

  if (Array.isArray(orders && orders.carrito)) {
    let total = 0;
    var totalPrice = 0;
    total = orders.carrito.map((e) => Number(e.price) * Number(e.quantity));
    for (let i = 0; i < total.length; i++) {
      totalPrice = totalPrice + total[i];
    }
  }

  return (
      
      
      <div  className="container " >
      {showOrder ? (
        <div className="row text-right">
          {/* <h1>Total: US${ orders.carrito.map((e) => Number(e.price) * Number(e.quantity))}</h1> */}
          {/* <h1>Beers: {orders.carrito.map((e) =>
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
              <h1>Total Price: US{formato.format(totalPrice)}</h1>
              <button className="btn btn-warning btn-lg" onClick={(e) => handleShowOrder(e)}>Hide order</button> */}
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>
                    <h4>Servicio</h4>
                  </th>
                  <th>
                    <h4>Descripción</h4>
                  </th>
                  <th>
                    <h4>Hrs / Cantidad</h4>
                  </th>
                  <th>
                    <h4>Tarifa / Precio</h4>
                  </th>
                  <th>
                    <h4>Sub-Total</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.carrito.map((e) => (
                    <tr>
                      <td>Artículo</td>
                      <td>
                        <a href="#"> {e.name}</a>
                      </td>
                      <td className=" text-right ">{e.quantity}</td>
                      <td className=" text-right ">{e.price}</td>
                      <td className=" text-right ">{formato.format(e.quantity * e.price)}</td>
                    </tr>
                  ))}

                <div class="row text-right">
                  <div class="col-xs-3 col-xs-offset-7">
                    <strong>Total: {formato.format(totalPrice)}</strong>
                  </div>
                </div>
              </tbody>
            </table>
          </div>

          <button
            className="btn btn-warning btn-lg"
            onClick={(e) => handleShowOrder(e)}
          >
            Hide order
          </button>
        </div>
      ) : (
        <button
          className="btn btn-warning btn-lg"
          onClick={(e) => handleShowOrder(e)}
        >
          View order
        </button>
      )}

      
    
    
        <button
          className="btn btn-warning btn-lg"
          onClick={(e) => handleClick(e)}
        >
          Ready to pay?
        </button>
      
        {mp.length === 0 ? (
          <p>Precione para ver el boton de mercadoPagos...</p>
        ) : (
          <Checkout productos={orders} data={{ id: mp.data.init_point }} />
        )}

        <button
          className="btn btn-warning btn-lg"
          onClick={(e) => handleHome(e)}
        >
          Back Home
        </button>
      
      </div>
    
  );
}
