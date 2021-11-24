import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBeers} from "../actions/index.js";
import Beers from "./Beers.jsx";
import Paged from "./Paging.jsx";

// import Beer from './Beers.jsx';

export default function Home () {
    const dispatch = useDispatch();
    const beers = useSelector((state) => state.beers)
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
    }, [])

    console.log(beers)

    return (
        <div>
            <div>
                <h1>PROBANDO</h1>
            </div>

            <div>
                <Paged
                beersPerPage = {beersPerPage}
                beers = {beers.length}
                paged = {paging}
                />
            </div>
            <div>
                {currentBeer ? currentBeer.map((e) => {
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
        </div>  

        
    )      

}