import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBeers, postProduct, addBeersOfCategory, delBeersCategory } from "../Redux/actions";
import style from "../css/Admin.module.css";

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
};

  // function handleCheckUsername(e) {
  //   if (e.target.checked) {
  //     setInput({ ...input, username: e.target.value });
  //   }
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
    dispatch(delBeersCategory(e.target.value))
  }
  useEffect(() => {
    dispatch(getBeers());
  }, [dispatch]);

  return (
    <div className={style.create}>
      <div>
        <Link to="/beers">
          <button className={style.button}>Back</button>
        </Link>

        <div className={style.form}>
        <h2 className={style.h9}>ADMIN PANEL</h2>
          <h1 className={style.h10}>Create Category</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className={style.label}>Name: </label>
              <input className={style.inputform} type="text" value={input.name} name="name" autoComplete='off' onChange={handleChange}/>
              {/* {errors.name && <p className={style.error}>{errors.name}</p>} */}
            </div>         

            <label className={style.label}>Beers: </label>
            <select name='beer' onChange={handleChange}>
              <option value="">Select Beers</option>
              {beers.map((beer) => ( <option key={beer.name} value={beer.name}>{beer.name}</option>))}
            </select>{/* {errors.beer && (<p className={style.error}>{errors.beer}</p>)}*/}

            <div className={style.buttoncreate}>
              <button className={style.button} type="submit">Create</button>
            </div>
          </form>
          <button onClick={handleAddBeer}>+</button>
          
          <div className={style.remove}>
            {beersOfCategory.map((beer) => <li key={beer} value={beer} onClick={elimBeer} className={style.delete}>{beer}</li>)}
          </div>
        </div>
      </div>
    </div>
  );
}

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