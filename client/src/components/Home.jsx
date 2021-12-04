import React from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBeers, getStylesOfBeers, delAllCart, addCart} from "../Redux/actions";
import Beers from "./Beers.jsx";
import Search from './search.jsx';
import styles from '../css/Home.module.css';


export default function Home () { 
    const dispatch = useDispatch();
    const { beers, stylesBeer }= useSelector((state) => state)
    const history = useHistory()
    useEffect(() => {
        dispatch(getBeers())
        stylesBeer.length>0? console.log(stylesBeer) :dispatch(getStylesOfBeers())
    }, [dispatch, stylesBeer])
    // console.log(beers[0])
    // console.log('Styles' ,stylesBeer)
    // console.log(stylesBeer)
    return (
        <div>
            <Link to="/admin/createCa">
                <button className={styles.button}>Admin Panel Ca</button>
            </Link>
            <Link to="/admin/createBeer">
          <     button className={styles.button}>Admin Panel Beer</button>
            </Link>
            <Link to ="/users/google">
                <button className={styles.button}>User Login</button>
            </Link>
            <Link to = "/order">
                <button className={styles.button}>Orders</button>
            </Link>
            <Link to = "/cart">
                <button className={styles.button}>Cart</button>
            </Link>
            <div>
                <h1>PIWO BEER MARKET</h1>
            </div>
               <Search/> 
            <div>
                {stylesBeer && stylesBeer.map( s =>s.beers.length>0?
                <section className={styles.select}>
                    <h3>{s.name}</h3>
                    <div className={styles.containerBeer}>
                    {s.beers ? s.beers.map((e) => {
                        // console.log(e)
                        return (   
                            <div key={e.id}>
                                <Beers
                                id = {e.id}
                                name = {e.name}
                                IBU = {e.IBU}
                                ABV = {e.ABV}
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
                :<h1>Nohay</h1>)}
            </div>
        </div>

        
    )      
}   