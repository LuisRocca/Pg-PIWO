import React from 'react'
import { useEffect, useState } from 'react'
import Checkout from './Checkout'
import axios from 'axios'
export default function Mercadopago() {
    const [datos, setDatos] = useState("")

  
  const productos = [
    {title: "Producto 1", quantity: 5, price: 10.52},
    {title: "Producto 2", quantity: 15, price: 100.52},
    {title: "Producto 3", quantity: 6, price: 200}
  ]
    return (
        <div>
        { !datos
          ? <p>Aguarde un momento....</p> 
          : <Checkout productos={productos} data={datos}/>
        }
      </div>
    )
}
