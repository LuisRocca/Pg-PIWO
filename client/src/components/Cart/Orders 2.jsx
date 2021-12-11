import React from 'react'

export default function Orders () {
    let order = JSON.parse(window.localStorage.getItem('carrito'))
    console.log(order);
    return (
        <h1>Aca van las ordenes</h1>
    )
}