import React from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import '../css/Beers.css'
import { addCart } from '../Redux/actions/index.js';

export default function Beers ({id, name, impression, aroma, ingredients, flavor, IBU, ABV, history, image, examples, price, stock}) {

const dispatch = useDispatch()
const handleClick = (e) => {
    e.preventDefault();
    dispatch(addCart(id))
}
    return (
        <div className="box">
            <div class="product">
            <img src={image} alt=" " />
			    <div class="buttons">
			        <a class="buy" href=" " onClick={(e) => handleClick(e)}>Add to cart</a>
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