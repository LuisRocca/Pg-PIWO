import React from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBeers, getStylesOfBeers, delAllCart, addCart} from "../Redux/actions";
import Beers from "./Beers.jsx";
import Search from './search.jsx';
import styles from '../css/Home.module.css';

// import Beer from './Beers.jsx';

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
    console.log(stylesBeer)
    return (
        <div>
            <Link to="/admin/createCa">
          <button className={styles.button}>Admin Panel Ca</button>
            </Link>
            <Link to="/admin/createBeer">
          <button className={styles.button}>Admin Panel Beer</button>
            </Link>
            <div>
                <h1>PIWO BEER MARKET</h1>
            </div>
               <Search/> 
            <button onClick={() => history.push('/order')}>Orders</button>
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
                :<h1>Nohay</h1>)}
            </div>
                {/* <Paged beersPerPage = {beersPerPage} beers = {beers.length} paged = {paging}/> */}
        </div>

        
    )      
}   