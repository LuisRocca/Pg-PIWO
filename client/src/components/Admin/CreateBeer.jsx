import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBeers, postBeer} from "../../Redux/actions";
import NavBar from "../NavBar";
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';

const CreateBeer = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [values, setInput] = useState({
        name: "", 
        style: "", 
        price: "", 
        stock: "", 
        impression: "", 
        aroma: "", 
        img: "https://i.pinimg.com/originals/9d/55/ec/9d55ec3f79262f9d08f69374450393a5.jpg", 
        IBU: "", 
        ABV: "", 
        history: "", 
        ingredients: "", 
        examples: "NONE"
    });
  
    const handleChange = ({target: {name, value }}) => {
      setInput({
          ...values,
          [name]: value,
      });
      console.log('Estado:', values)
  };
  
    function handleSubmit(e) {
      e.preventDefault();
      if (values.name !== "" && values.style !== "") {
        dispatch(postBeer(values));
        swal("Successfully added Beer", {
          buttons: false,
          icon: 'success',
          timer: 1500,
          }
          )
        setInput({ 
          name: "",
          style: '',
        });
        history.push('/admin')
      } else {
        swal("You must complete all the fields to add the beer", {
          buttons: false,
          icon: 'error',
          timer: 1500,
          }
          )
      }
    }
    useEffect(() => {
      dispatch(getBeers());
    }, [dispatch]);
  
    return (
      <div>
          <NavBar/>

  <div class="body-background">
      <div class="container-fluid d-flex justify-content-center align-items-center h-100">
          <div class="card p-3 text-center py-4">
              <h4>Charge a new Beer</h4>
              <form onSubmit={handleSubmit}>
              <div class="mt-3 px-3"> <input class="form-control" name='name' placeholder="Name" onChange={handleChange} autoComplete='off' type='text' value={values.name}/> </div>
              <div class="mt-3 px-3"> <input class="form-control" name='style' placeholder="Category" onChange={handleChange} autoComplete='off' type='text' value={values.style}/> </div>
              <div class="mt-3 px-3"> <input class="form-control" name='img' placeholder="Image" onChange={handleChange} autoComplete='off' type='text' value={values.img}/> </div>
              <div class="input-group px-3 mt-3"> 
                <input type="text" class="form-control" name='IBU' placeholder="IBU" aria-label="IBU" onChange={handleChange} autoComplete='off' value={values.IBU}/> <span></span> 
                <input type="text" class="form-control" name='ABV' placeholder="ABV" aria-label="ABV" onChange={handleChange} autoComplete='off' value={values.ABV}/> 
              </div>
              <div class="input-group px-3 mt-3"> 
                <input type="text" class="form-control" name='price' placeholder="Price" aria-label="Price" onChange={handleChange} autoComplete='off' value={values.price}/> <span></span> 
                <input type="text" class="form-control" name='stock' placeholder="Stock" aria-label="Stock" onChange={handleChange} autoComplete='off' value={values.stock}/> 
              </div>
              <label class="mt-1 mb-1">Impression</label>
              <textarea class="form-control mt-1 mb-3" name='impression' id="exampleFormControlTextarea1" rows="2" onChange={handleChange} autoComplete='off' type='text' value={values.impression}></textarea>
              <label class="mt-1 mb-1">Aroma</label>
              <textarea class="form-control mt-1 mb-3" name='aroma' id="exampleFormControlTextarea1" rows="2" onChange={handleChange} autoComplete='off' type='text' value={values.aroma}></textarea>
              <label class="mt-1 mb-1">History</label>
              <textarea class="form-control mt-1 mb-3" name='history' id="exampleFormControlTextarea1" rows="2" onChange={handleChange} autoComplete='off' type='text' value={values.history}></textarea>
              <label class="mt-1 mb-1">Ingredients</label>
              <textarea class="form-control mt-1 mb-3" id="exampleFormControlTextarea1" name='ingredients' rows="2" onChange={handleChange} autoComplete='off' type='text' value={values.ingredients}></textarea>
              <div class="mt-3 d-grid px-3"> <button class="btn btn-primary btn-block btn-signup text-uppercase"> <span>charge beer</span> </button> </div>
              </form>
          </div>
      </div>
  </div>
      </div>
    );
  }

export default CreateBeer
