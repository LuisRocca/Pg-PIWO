import React, {useEffect} from 'react'
import {getOrder} from '../../Redux/actions/index.js';
import { useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

export default function Orders () {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders)
    const user = JSON.parse(window.localStorage.getItem('login'))
    // console.log(orders);

    
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
                    <Link to="/beers">
                        <button >Back Home</button>
                    </Link>
                </div>
    </div>
      
    
    )
}