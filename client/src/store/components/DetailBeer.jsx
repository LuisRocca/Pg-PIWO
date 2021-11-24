import React from 'react'
import { useEffect } from "react";
import { getBeerDetails } from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
export default function DetailBeer({props}) {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getBeerDetails(props))
    }, [dispatch])
    
    const beersDetail = useSelector((state) => state.beerId)
    console.log(beersDetail);

    return (
        <div>
            {
                Array.isArray(beersDetail) ? beersDetail.map ((e) => {

                    return (

                    <div key = {e.ID}>
                        <div>
                            <img src={e.image} alt="img not found" width="200px" height="200px" style={{borderRadius: '20px'}}/>
                        </div>
                        <div>
                            <h1>Name: {e.name}</h1>
                        </div>
                        <div>
                            <h3>ABV: {e.ABV}</h3>
                        </div>
                        <div>
                            <h3>IBU: {e.IBU}</h3>
                        </div>
                        <div>
                            <p>history: {e.history}</p>
                        </div>
                        <div>
                            <p>impression: {e.impression}</p>
                        </div>
                        <div>
                            <p>aroma: {e.aroma}</p>
                        </div>
                        <div>
                            <p>flavor: {e.flavor}</p>
                        </div>
                        <div>
                            <p>ingredients: {e.ingredients}</p>
                        </div>
                    </div>
                    
                    ) 
                }) : <p>Wait for changes</p>
            }
            <div>
                <Link to= '/beers'>
                    <button>Back to the main page</button>
                </Link>
            </div> 
        </div>
    )
}

