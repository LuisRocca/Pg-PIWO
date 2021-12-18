import React from "react";
import { useEffect } from "react";
import { getBeersDetails, getReviews } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart, postReviewUser, putReviewUser } from '../Redux/actions/index.js';
import "../css/DetailBeers.css";
import swal from 'sweetalert';
import { useState } from 'react';
import NavBar from "./NavBar";

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
    // console.log('detail',beersDetail[0].image);
    
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
      
        {/* <Link to="/beers">
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
                  </div> */}
        {/* <div>
                              <h4>HISTORY: {e.history}</h4>
                          </div> */}
        {/* <div>
                    <h4 className="p">IMPRESSION: {e.impression}</h4>
                  </div> */}
        {/* <div>
                              <p>aroma: {e.aroma}</p>
                          </div> */}
        {/* <div>
                              <p>flavor: {e.flavor}</p>
                          </div> */}
        {/* <div>
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
        </div> */}
        <div class="container">
          <div class="card">
            <div class="card-body">
              {Array.isArray(beersDetail) ? (
                beersDetail.map((e) => {
                  return <h3 class="card-title">{e.name}</h3>;
                })
              ) : (
                <p>Wait for changes</p>
              )}
  
              <div class="row">
                {Array.isArray(beersDetail) ? (
                  beersDetail.map((e) => {
                    return (
                      <div class="col-lg-5 col-md-5 col-sm-6">
                        <div class="white-box text-center">
                          <img src={e.image} alt="img not found" />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Wait for changes</p>
                )}
                {Array.isArray(beersDetail) ? (
                  beersDetail.map((e) => {
                    return (
                      <div class="col-lg-7 col-md-7 col-sm-6">
                        <h4 class="box-title mt-5">Impression</h4>
                        <p>{e.impression}</p>
                        <h4 class="box-title mt-5">Ingredients</h4>
                        <p>{e.ingredients}</p>
                        <h2 class="mt-5">
                          US${e.price}
                          <small class="text-success">(36%off)</small>
                        </h2>
                        <br />
                        <a
                          class="btn btn-warning w-25"
                          href=" "
                          onClick={(e) => handleClick(e)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="white"
                            className="bi bi-cart4"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                          </svg>
                        </a>
  
                        <h3 class="box-title mt-5">Key Highlights</h3>
                        <ul class="list-unstyled">
                          <li>
                            <i class="fa fa-check text-success"></i>ABV: {e.ABV}
                          </li>
                          <li>
                            <i class="fa fa-check text-success"></i>IBU: {e.IBU}
                          </li>
                        </ul>
                      </div>
                    );
                  })
                ) : (
                  <p>Wait for changes</p>
                )}
                <br />
              </div>
            </div>
          </div>
        </div>
  
  
        <div class="container">
  <div class="be-comment-block">
    <div class="be-comment">
      <div class="be-comment-content">
      {review.length > 0 ?
              review.map((re) => (
                <div>
                      <div class="be-img-comment">	
        <a href="blog-detail-2.html">
          <img src={re.user.image ? re.user.image : "https://media.istockphoto.com/vectors/man-avatar-profile-male-face-icon-vector-illustration-vector-id1142192538"} alt="" class="be-ava-comment"/>
        </a>
      </div>
  
                <div className="review-colomn" >
                  <div  >
                    <h5>Calification: {re.review.calification ? re.review.calification : 0}</h5>
                  </div>
                <span class="be-comment-name">
                  <h4 href="blog-detail-2.html">Name: {re.user.username}</h4>
                </span>
                <p class="be-comment-text">Commentary: {re.review.commentary}</p>
                </div> 
              </div>
              )) 
            : <h2>No commentaries</h2>
            }
  
      </div>
    </div>
    <form class="form-block" onSubmit={(e) => handleSubmit(e)}>
      <div class="row">
        <div class="col-xs-12">									
          <div class="form-group">
          <input class="form-input" type='number' max={5} min={0} placeholder="valoration" value={input.calification} onChange={e => setInput({ ...input, calification: e.target.value })}></input>
            <textarea class="form-input" type='text' placeholder="commentary" value={input.commentary} onChange={e => setInput({ ...input, commentary: e.target.value })}></textarea>
          </div>
        </div>
        <button class="btn btn-primary pull-right">Submit</button>
      </div>
    </form>
  </div>
  </div>
  
      </div>
    );
}
