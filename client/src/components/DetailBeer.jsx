import React from 'react'
import { useEffect } from "react";
import { getBeersDetails, getReviews } from '../Redux/actions';  
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import "../css/DetailBeers.css"

export default function DetailBeer({props}) {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getReviews(props))
        dispatch(getBeersDetails(props))
    }, [dispatch])
   
    const review = useSelector((state) => state.reviews )
    const beersDetail = useSelector((state) => state.beerId)

     console.log(beersDetail);

    return (   
        <div  >
            {
                Array.isArray(beersDetail) ? beersDetail.map ((e) => {

                    return (
                    <div key = {e.ID} className="container" >
                        <div className="left-column"> 
                            <img  src={e.image} alt="img not found" width="200px" height="200px" style={{borderRadius: '20px'}}/>
                        </div>
                     <div className="right-column">   
                        <div>
                            <h1> {e.name}</h1>
                        </div>
                        <div>
                            <h3>ABV: {e.ABV}</h3>
                        </div>
                        <div>
                            <h3>IBU: {e.IBU}</h3>
                        </div>
                        {/* <div>
                            <h4>HISTORY: {e.history}</h4>
                        </div> */}
                        <div>
                            <h4>IMPRESSION: {e.impression}</h4>
                        </div>
                        {/* <div>
                            <p>aroma: {e.aroma}</p>
                        </div> */}
                        {/* <div>
                            <p>flavor: {e.flavor}</p>
                        </div> */}
                        <div>
                            <h4>INGREDIENTS: {e.ingredients}</h4>
                        </div>
                        <div class="product-price">
                                 <a href="#" class="cart-btn">Add to cart</a>
                         </div>
                    </div>
                    </div>
                    
                    ) 
                }) : <p>Wait for changes</p>
            }
            <div>
                <div className="contenedor-review">
                    {
                        review && review.map( re => (
                            <div>
                                <p>
                                    UserName: {re.user.username}
                                </p>
                                <p>
                                    Comentario: {re.review.commentary}
                                </p>
                                <p>
                                    Comentario: {re.review.calification}
                                </p>
                                
                            </div>
                        ))
                    }
                </div>
                <Link to= '/beers'>
                    <button>Back to home</button>
                </Link>
            </div> 
        </div>
    )
}

