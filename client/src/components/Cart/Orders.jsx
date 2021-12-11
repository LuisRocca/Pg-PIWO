import React, {useEffect, useState } from 'react'
import {getOrder, getId} from '../../Redux/actions/index.js';
import { useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Checkout from '../mercadopago/Checkout'
import axios from 'axios';

export default function Orders () {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders)
    const user = JSON.parse(window.localStorage.getItem('login'))
    const carrito = useSelector(state => state.cart)
    const [datos, setDatos] = useState('')
    console.log("linea 14 order", carrito)
    console.log(orders);
    //  const data = useSelector((state) => state.mpData)
    //  console.log(datos, '13 de orders')
    
    useEffect(()=>{
        // axios.get("http://localhost:3001/mercadopago", carrito )
        // .then((datos) => {
        //     setDatos(datos.data)
        // })
        // .catch(err => console.error(err))
        dispatch(getId(carrito))
       },[])

    return (
    <div>
        {
           orders ? orders.map(e => {
               return (
            <div>
                <h1>Total: US${e.totalPrice}</h1>
                <h1>Address: {e.address}</h1>
                <h1>Status: {e.status}</h1>
                <h1>Email: {e.email}</h1>
                <h1>Quantity: {e.quantity}</h1>
            </div>
           )})
           : <h1>No orders</h1> 
        }
                <div>
                <Checkout productos={orders} data={datos}/>
                    <Link to="/beers">
                        <button >Back Home</button>
                    </Link>
                </div>
            <div>
       
        </div>
    </div>
      
    
    )
}