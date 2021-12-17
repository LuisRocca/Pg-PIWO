import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBeers, postProduct, addBeersOfCategory, delBeersCategory } from "../../Redux/actions";
import style from "../../css/CreateCa.module.css";
import NavBar from "../NavBar";
import swal from 'sweetalert';

export default function Admin() {
  const dispatch = useDispatch();
  
  const {beers, beersOfCategory} = useSelector((state) => state);

  const [input, setInput] = useState({
    name: "",
    beer: '',
  });

  const handleChange = ({target: {name, value }}) => {
    setInput({
        ...input,
        [name]: value,
    });
    console.log('Estado:', input)
}; 
  function handleSubmit(e) {
    e.preventDefault();
    if (input.name !== "" && input.beer !== "") {
      dispatch(postProduct({...input, beersOfCategory}));
      swal("Successfully added Beer Category", {
        buttons: false,
        icon: 'success',
        timer: 1500,
        }
        )
      setInput({ 
        name: "",
        beer: '',
      });
    } else {
      swal("You must complete all the fields to add the beer category", {
        buttons: false,
        icon: 'error',
        timer: 1500,
        }
        )
    }
  }
  function handleAddBeer(e){
    e.preventDefault()
    // console.log(input.beer)
    dispatch(addBeersOfCategory(input.beer))
  }
  function elimBeer(e){
    dispatch(delBeersCategory(e.target.value))
  }
  useEffect(() => {
    dispatch(getBeers());
  }, [dispatch]);

  return (
    <div>
    <NavBar/>

    <form onSubmit={handleSubmit}>
    <div class="body-background">
  <div class="container-fluid d-flex justify-content-center align-items-center h-100">
      <div class="card p-3 text-center py-4">
          <h4>Create Beer's Category</h4>
          <div class="mt-3 px-3"> <input class="form-control" placeholder="Name" value={input.name} name="name" autoComplete='off' onChange={handleChange}/> </div><br />

          <select name='beer' onChange={handleChange} class="form-select" aria-label="Default select example">
            <option selected >Select Beers</option>
            {beers.map((beer) => ( <option key={beer.name} value={beer.name}>{beer.name}</option>))}
          </select>
          <div class="mt-3 d-grid px-3"> <button class="btn btn-primary btn-block text-uppercase" onClick={handleAddBeer}> <span>+</span> </button> </div>
          <div className={style.remove}>
          {beersOfCategory.map((beer) => <li key={beer} value={beer} onClick={() => elimBeer(beer.name)} >{beer}  </li>)}
        </div>

          <div class="mt-3 d-grid px-3"> <button class="btn btn-primary btn-block btn-signup text-uppercase" type="submit"> <span>Create Category</span> </button> </div>
      </div>
  </div>
</div>
  </form>

  </div>
  );
}