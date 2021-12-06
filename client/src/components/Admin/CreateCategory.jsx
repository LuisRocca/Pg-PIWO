import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBeers, postProduct, addBeersOfCategory, delBeersCategory } from "../../Redux/actions";
import style from "../../css/CreateCa.module.css";
import NavBar from "../NavBar";

export default function Admin() {
  const dispatch = useDispatch();
  
  const {beers, beersOfCategory} = useSelector((state) => state);
  
  // const [errors, setErrors] = useState({});

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
}; //   }
  //   setErrors(validate({ ...input, username: e.target.value }));
  // }

  // function handleCheckAge(e) {
  //   if (e.target.checked) {
  //     setInput({ ...input, age: e.target.value });
  //   }
  //   setErrors(validate({ ...input, age: e.target.value }));
  // }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name !== "" && input.beer !== "") {
      dispatch(postProduct({...input, beersOfCategory}));
      alert("Successfully added Beer Products!!!");
      setInput({ 
        name: "",
        beer: '',
      });
    } else {
      alert(
        "You must complete all the fields to add the beer !!!"
      );
    }
  }
  function handleAddBeer(e){
    e.preventDefault()
    // console.log(input.beer)
    dispatch(addBeersOfCategory(input.beer))
  }
  function elimBeer(e){
    dispatch(delBeersCategory(e))
  }
  useEffect(() => {
    dispatch(getBeers());
  }, [dispatch]);

  return (
    <div>
      <NavBar/>
      {/* <div>
        <Link to="/admin">
          <button className={style.button}>Back</button>
        </Link>

        <div className={style.form}>
        <h2 className={style.h9}>ADMIN PANEL</h2>
          <h1 className={style.h10}>Create Category</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className={style.label}>Name: </label>
              <input className={style.inputform} type="text" value={input.name} name="name" autoComplete='off' onChange={handleChange}/>
            </div>         

            <label className={style.label}>Beers: </label>
            <select name='beer' onChange={handleChange}>
              <option value="">Select Beers</option>
              {beers.map((beer) => ( <option key={beer.name} value={beer.name}>{beer.name}</option>))}
            </select>

            <div className={style.buttoncreate}>
              <button className={style.button} type="submit">Create</button>
            </div>
          </form>
          <button onClick={handleAddBeer}>+</button>
          <div className={style.remove}>
            {beersOfCategory.map((beer) => <li key={beer} value={beer} onClick={() => elimBeer(beer.name)} className={style.delete}>{beer}</li>)}
          </div>
        </div>
      </div> */}

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

  // function handleCheckUsername(e) {
  //   if (e.target.checked) {
  //     setInput({ ...input, username: e.target.value });
 

// function validate(input) {
//   let errors = {};
//   if (!input.name) {
//     errors.name = "Complete the Name Field of the Beer";
//   }
//   if (input.beers.length === 0) {
//     errors.beers = "Select the corresponding beers(sub-categories)";
//   }
//   return errors;
// }