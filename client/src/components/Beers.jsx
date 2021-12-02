import React from 'react';
import {Link} from 'react-router-dom';
import '../css/Beers.css'

export default function Beers ({id, name, impression, aroma, ingredients, flavor, IBU, ABV, history, image, examples, price, stock}) {

    return (
        <div className="box">
            <div class="product">
            <img class='imgbeer'src={image} alt=" " />
			    <div class="buttons">
			        <a class="buy" href=" ">Add to cart</a>
                    <Link to={`/beers/${id}`}>
                        <a class="preview" href=" ">View item</a>
                    </Link>
		        </div>
	        </div>
            <div className='info'>
            <Link to={`/beers/${id}`}>
                <h4>{name}</h4>
            </Link>
                <span className='description'> 
                    IBU: {IBU} <br/>
                    ABV: {ABV} <br/>
                </span>
                <span className='price'>US${price}</span>
            <a class='buy_now' href=' '>Buy Now</a>
            </div>
            <div className='details'>
                <span className='stock'>
                    Stock: {stock} <br/>
                </span>
            </div>
        </div>
    )
}