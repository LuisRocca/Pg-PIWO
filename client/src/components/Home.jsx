import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBeers, getStylesOfBeers} from "../Redux/actions";
import Beers from "./Beers.jsx";
import Paged from "./Paging.jsx";
import Search from './search.jsx';
import styles from '../css/Home.module.css'

// import Beer from './Beers.jsx';

export default function Home () { 
    const dispatch = useDispatch();
    const { beers, stylesBeer }= useSelector((state) => state)
    const [currentPage, setCurrentPage] = useState(1);
    const beersPerPage = 9;

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const indexOfLastBeer = currentPage * beersPerPage;
    const indexOfFirstBeer = indexOfLastBeer - beersPerPage;
    const currentBeer = beers.slice(indexOfFirstBeer, indexOfLastBeer);

    useEffect(() => {
        dispatch(getBeers())
        stylesBeer.length>0? console.log(stylesBeer) :dispatch(getStylesOfBeers())
    }, [])


    


    console.log(beers)
    console.log('Styles' ,stylesBeer)
    return (
        <div>
            <div>
                <h1>BEER E-COM</h1>
            </div>

            <div>
               <Search>
            
               </Search>
            </div>
            <div>
                {stylesBeer && stylesBeer.map( s =>(
                <section className={styles.select}>
                    <h3>{s.name}</h3>
                    <div className={styles.containerBeer}>
                    {/* {currentBeer ? currentBeer.filter( el =>  */}
                    {currentBeer ? beers.filter( el =>
                    el.ID.length < 3 ? el.ID[0] === s.id : el.ID.slice(0, 2) == s.id
                    ).map((e) => {
                        return (
                            <div key={e.ID}>
                                <Beers
                                ID = {e.ID}
                                name = {e.name}
                                // impression = {e.impression}
                                // aroma = {e.aroma}
                                // ingredients = {e.ingredients}
                                // flavor = {e.flavor}
                                IBU = {e.IBU}
                                ABV = {e.ABV}
                                // history = {e.history}
                                image = {e.image}
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