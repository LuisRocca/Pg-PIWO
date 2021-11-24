import React from 'react';
import {Link} from 'react-router-dom';
import Style from './Beers.module.css'

export default function Beers ({ID,name, impression, aroma, ingredients, flavor, IBU, ABV, history, image}) {

    return (
        <div className={Style.box}>
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
                <img src={image} alt="No image found" weight='150px' height='150px'/>
            </div>
        </div>
    )
}