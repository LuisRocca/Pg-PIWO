import React from 'react'
import { useEffect } from "react";
import { getBeersDetails } from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
function DetailBeer(props) {
    const {id} = props.match.params
    const dispatch = useDispatch()
    const beersDetail = useSelector((state) => state.beerDetail)
    let {name, impression, aroma, ingredients, flavor, IBU, ABV, history, image} = beersDetail[0]
   
    useEffect(() => {
    dispatch(getBeersDetails(id))
   }, [dispatch, id])
    
    return (
        <div>
                <div>
                 
                    <h2> {name} </h2>
                     <div>
                     <p> {impression} </p> 
                      <p> {aroma} </p>  
                     <p> {ingredients} </p> 
                     <p> {flavor} </p> 
                    <p> {IBU} </p> 
                     <p> {ABV} </p> 
                    <p> {history} </p> 
                    </div>
                  {/* <img src={image} alt="no se encontro imagen" />  */}
                    </div>
                    <div>
          
                    <Link to= '/beers'>
                        <button> back </button>
                    </Link>
                    </div>
        </div>
    )
}

export default DetailBeer
