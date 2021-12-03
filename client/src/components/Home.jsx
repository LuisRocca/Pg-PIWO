import React from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBeers, getStylesOfBeers, delAllCart, addCart} from "../Redux/actions";
import Beers from "./Beers.jsx";
import Paged from "./Paging.jsx";
import Search from './search.jsx';
import styles from '../css/Home.module.css'
import Cart from './Cart/Cart.jsx';

// import Beer from './Beers.jsx';

export default function Home () { 
    const dispatch = useDispatch();
    const history = useHistory()
    let { beers, stylesBeer, cart }= useSelector((state) => state)
    window.localStorage.getItem('carrito')
    // console.log(beers);

    useEffect(() => {
        dispatch(getBeers())
        stylesBeer ? dispatch(getStylesOfBeers()) : console.log('No hay estilos')
        // console.log(window.localStorage.getItem('carrito'));
        if (cart.length === 0) {
            let localCart = window.localStorage.getItem('carrito')
        //    localCart = JSON.parse(localCart)
            console.log(localCart);

            // cart.map((e) => dispatch(addCart(e.id)))

            
        } else {
            window.localStorage.setItem('carrito', cart)
            
        }
        // cart ? window.localStorage.setItem('carrito', cart) : cart = window.localStorage.getItem('carrito');
    }, [])
    // console.log('beers:',beers)
    // console.log('Styles' ,stylesBeer)
    // const clickToDelete = (e) => {
    //     e.preventDefault();
    //     dispatch(delAllCart())
    //   }


    return (
        <div>
            <div>
                <h1>PIWO BEER MARKET</h1>
            </div>

            <div>
               <Search/>           
            </div>
            {/* <div>
                <button onClick={(e) => clickToDelete(e)}>CLEAR CART</button>
                {cart ? cart.map((e) => {
                    return (
                        <div>
                            <Cart 
                            id = {e.id}
                            name = {e.name}
                            price = {e.price}
                            image = {e.image}
                            // total = {e.price}
                            />
                            <h2>TOTAL ES {e.price}</h2>

                        </div>
                        )
                }): <h4>NO HAY NADA EN EL CARRITO</h4>}
                        
            </div> */}
            <button onClick={() => history.push('/order')}>Orders</button>
            <div>
                {stylesBeer && stylesBeer.map( s =>(
                <section className={styles.select}>
                    <h3>{s.name}</h3>
                    <div className={styles.containerBeer}>
                    {/* {currentBeer ? currentBeer.filter( el =>  */}
                    {beers ? beers.filter( el =>
                    el.id.length < 3 ? el.id[0] === s.id : el.id.slice(0, 2) == s.id
                    ).map((e) => {
                        
                        return (   
                            <div key={e.id}>
                                <Beers
                                id = {e.id}
                                name = {e.name}
                                // impression = {e.impression}
                                // aroma = {e.aroma}
                                // ingredients = {e.ingredients}
                                // flavor = {e.flavor}
                                IBU = {e.IBU}
                                ABV = {e.ABV}
                                // history = {e.history}
                                image = {e.image}
                                price = {e.price}
                                stock = {e.stock}
                                examples = {e.examples}
                                />
                            </div>
                        )
                    }): <h1>No beers</h1>}
                    </div>
                    
                </section>
                ))}
            </div>
                {/* <Paged beersPerPage = {beersPerPage} beers = {beers.length} paged = {paging}/> */}
        </div>

        
    )      
}   