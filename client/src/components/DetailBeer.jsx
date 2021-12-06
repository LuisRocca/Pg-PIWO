import React from "react";
import { useEffect } from "react";
import { getBeersDetails, getReviews } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from '../Redux/actions/index.js';
import "../css/DetailBeers.css";
import swal from 'sweetalert';

export default function DetailBeer({ props }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(props));
    dispatch(getBeersDetails(props));
  }, [dispatch, props]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addCart(props))
    swal("Added to the cart successfully!", {
      buttons: false,
      icon: 'success',
      timer: 1500,
    });
}

  const review = useSelector((state) => state.reviews);
  const beersDetail = useSelector((state) => state.beerId);

  // console.log(beersDetail);

  return (
    <div>
         <Link to="/beers">
          <button className="cart-btn" >Back to home</button>
        </Link>
      {Array.isArray(beersDetail) ? (
        beersDetail.map((e) => {
          return (
            <div key={e.ID} className="container">
              <div className="left-column">
                <img
                  className="imagenDetail"
                  src={e.image}
                  alt="img not found"
                />
              </div>
              <div className="right-column">
                <div>
                  <h1 className="name"> {e.name}</h1>
                </div>
                <div>
                  <h3 className="p">ABV: {e.ABV}</h3>
                </div>
                <div>
                  <h3 className="p">IBU: {e.IBU}</h3>
                </div>
                {/* <div>
                            <h4>HISTORY: {e.history}</h4>
                        </div> */}
                <div>
                  <h4 className="p">IMPRESSION: {e.impression}</h4>
                </div>
                {/* <div>
                            <p>aroma: {e.aroma}</p>
                        </div> */}
                {/* <div>
                            <p>flavor: {e.flavor}</p>
                        </div> */}
                <div>
                  <h4 className="p">INGREDIENTS: {e.ingredients}</h4>
                </div>
                <div className="product-price">
                  <a href="#" className="cart-btn" onClick={(e) => handleClick(e)}>
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>Wait for changes</p>
      )}
      <div className="container-review" >
        <div >
          {review &&
            review.map((re) => (
              <div className="review-colomn" >
                <div  >
                  <h4>Calification: {re.review.calification}</h4>
                </div>
                <div  >
                <h4>UserName: {re.user.username}</h4>
                </div>
                <div  >
                  <h4>Comentario: {re.review.commentary}</h4>
                </div>
              </div>
            ))}
        </div>
        
      </div>
     
    </div>
  );
}
