import React from "react";
import { useEffect } from "react";
import { getBeersDetails, getReviews } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../css/DetailBeer.module.css";

export default function DetailBeer({ props }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(props));
    dispatch(getBeersDetails(props));
  }, [dispatch, props]);

  const review = useSelector((state) => state.reviews);
  const beersDetail = useSelector((state) => state.beerId);

  console.log(beersDetail);

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
                  src={e.image}
                  alt="img not found"
                  width="200px"
                  height="200px"
                  style={{ borderRadius: "20px" }}
                />
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
                <div className="product-price">
                  <a href="#" className="cart-btn">
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

