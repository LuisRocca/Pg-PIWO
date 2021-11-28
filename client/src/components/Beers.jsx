import React from 'react';
import {Link} from 'react-router-dom';
import Style from '../css/Beers.module.css'

export default function Beers ({id, name, impression, aroma, ingredients, flavor, IBU, ABV, history, image, examples, price, stock}) {

    return (
        <div className={Style.box}>
            <Link to={`/beers/${id}`}>
            <div>
                <h3>
                    {name}
                </h3>
            </div>
            <div>
                <h5>IBU: {IBU}</h5>
            </div>
            <div>
                <h5>ABV: {ABV}</h5>
            </div>
            <div>
                <h5>Price: {price} USD</h5>
            </div>
            <div>
                <h5>Stock: {stock}</h5>
            </div>
            <div>
                <img src={image} alt="Not found" weight='150px' height='150px'/>
            </div>
            </Link>
        </div>
    )
}