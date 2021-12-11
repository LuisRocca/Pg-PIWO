import React from "react";
import { useEffect } from "react";
import { getBeersDetails, getReviews } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart, postReviewUser, putReviewUser } from '../Redux/actions/index.js';
import "../css/DetailBeers.css";
import swal from 'sweetalert';
import { useState } from 'react';

export default function DetailBeer({ props }) {
  const dispatch = useDispatch();
  const [input,setInput] = useState({
    calification: '',
    commentary: '',
  });
  
    const review = useSelector((state) => state.reviews);
    const beersDetail = useSelector((state) => state.beerId);
    // console.log(beersDetail);
    const user = JSON.parse(localStorage.getItem('login'))
  //  console.log('user',user.id);
    // console.log('detail',beersDetail[0] && beersDetail[0].id);
    
    const handleClick = (e) => {
      e.preventDefault();
      dispatch(addCart(props))
      swal("Added to the cart successfully!", {
        buttons: false,
        icon: 'success',
        timer: 1500,
      });
    }
    
    // console.log(review[0].review.userId);
    // console.log(user.id);
    
    const handleSubmit = (e) => {
      if (user.name) {
        if (review && review.filter(e => e.review.userId === user.id).length > 0) {
          // e.preventDefault()
          // console.log(review.filter(e => e.review.userId === user.id));
          // console.log('1');
          dispatch(putReviewUser(beersDetail[0] && beersDetail[0].id, user.id, input));
          setInput({
            calification: '',
            commentary: '',
          })
        } else {
          // console.log('2');
          // console.log(review && review.map(e => e.review.userId === user.id));
          // e.preventDefault()
          dispatch(postReviewUser(beersDetail[0] && beersDetail[0].id,user.id, input))
          setInput({
            calification: '',
            commentary: '',
          })
        }
      } else {
        e.preventDefault()
        swal("You need to SignIn to leave a devolution", {
          buttons: false,
          icon: 'error',
          timer: 1500,
        })
      }
    }
    
    useEffect(() => {
      dispatch(getReviews(props));
      dispatch(getBeersDetails(props));
    }, [dispatch, props]);
    
    
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
        {review.length > 0 ?
            review.map((re) => (
              <div>
              <div className="review-colomn" >
                <div  >
                  <h4>Calification: {re.review.calification ? re.review.calification : 0}</h4>
                </div>
                <div  >
                <h4>UserName: {re.user.username}</h4>
                </div>
                <div  >
                  <h4>Commentary: {re.review.commentary}</h4>
                </div>
              </div> 
            </div>
            )) 
          : <h2>No commentaries</h2>
          }
        </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type='text' placeholder="commentary" value={input.commentary} onChange={e => setInput({ ...input, commentary: e.target.value })}></input>
                <input type='number' placeholder="valoration" value={input.calification} onChange={e => setInput({ ...input, calification: e.target.value })}></input>
                <button>Submit</button>
            </form>
      </div>
     
    </div>
  );
}
