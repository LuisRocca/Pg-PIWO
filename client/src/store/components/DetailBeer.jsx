import React from 'react'
import { useEffect } from "react";
import { getBeersDetails } from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
function DetailBeer(props) {
    const dispatch = useDispatch()
    const {id} = props.match.params
    const beersDetail = useSelector((state) => state.beerDetail)
    if(!beersDetail.length){
        dispatch(getBeersDetails(id))
    }
    return (
        <div>
            {beersDetail.map( e =>
                (<div>
                    <h2> {e.name} </h2>
                     <div>
                     <h4> {e.impression} </h4> 
                      <h4> {e.aroma} </h4>  
                     <h4> {e.ingredients} </h4> 
                     <h4> {e.flavor} </h4> 
                    <h4> {e.IBU} </h4> 
                     <h4> {e.ABV} </h4> 
                    <h4> {e.history} </h4> 
                    </div>
                  <img src={e.image} alt="no se encontro imagen" /> 
                    </div>
                
                ))}
                    <div>
                    <Link to= '/beers'>
                        <button> back </button>
                    </Link>
                    </div>
        </div>
    )
}

export default DetailBeer
