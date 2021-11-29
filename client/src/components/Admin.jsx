import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getBeers, postProduct } from "../Redux/actions";
import style from "../css/Admin.module.css";

export default function Admin() {
  const dispatch = useDispatch();
  
  const allBeers = useSelector((state) => state.beers);
  
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    id: "",
    name: "",
    notes: "",
    beers: [],
  });

  function handleChangeName(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handleChangeId(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handleCheckUsername(e) {
    if (e.target.checked) {
      setInput({ ...input, username: e.target.value });
    }
    setErrors(validate({ ...input, username: e.target.value }));
  }

  function handleCheckAge(e) {
    if (e.target.checked) {
      setInput({ ...input, age: e.target.value });
    }
    setErrors(validate({ ...input, age: e.target.value }));
  }

  function handleSelectBeer(e) {
    setInput({
      ...input,
      beers: [...input.beers, e.target.value],
    });
    setErrors(
      validate({ ...input, beers: [...input.beers, e.target.value] })
    );
  }

  function handleRemoveBeer(e) {
    setInput({
      ...input,
      beers: input.beers.filter((beer) => beer !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.id !== "" &&
      input.name !== "" &&
      input.notes !== "" &&
      input.beers.length !== 0 
    ) {
      dispatch(postProduct(input));
      alert("Successfully added Beer Products!!!");
      setInput({
        id: "", 
        name: "",
        notes: "",
        beers: [],
      });
    } else {
      alert(
        "You must complete all the fields to add the beer !!!"
      );
    }
  }

  useEffect(() => {
    dispatch(getBeers());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={style.create}>
      <div>
        <Link to="/beers">
          <button className={style.button}>Back</button>
        </Link>

        <div className={style.form}>
        <h2 className={style.h9}>ADMIN PANEL</h2>
          <h1 className={style.h10}>BEER PRODUCTS</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label className={style.label}>Add Products: </label>
              <input
                className={style.inputform}
                type="text"
                value={input.name}
                name="name"
                autoComplete="off"
                onChange={(e) => handleChangeName(e)}
              />
              {errors.name && <p className={style.error}>{errors.name}</p>}
            </div>

            <div>
              <label className={style.label}>ID </label>
              <input className={style.id}
                type="number"
                value={input.id}
                name="id"
                autoComplete="off"
                onChange={(e) => handleChangeId(e)}
              />{" "}

              {errors.id && (
                <p className={style.error}>{errors.id}</p>
              )}
            </div>            

            <div>
              <label className={style.label}>Notes:</label>
              <input
                className={style.inputnotes}
                type="text"
                value={input.notes}
                name="notes"
                autoComplete="off"
                onChange={(e) => handleChangeName(e)}
              />
              {errors.notes && <p className={style.error}>{errors.notes}</p>}
            </div>   
            <label className={style.label}>Sub-Category: </label>
            <select onChange={(e) => handleSelectBeer(e)}>
              <option value="">Select a Beer</option>
              {allBeers && allBeers.sort((a, b) => {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  })?.map((beer) => (
                <option key={beer.id} value={beer.id}>
                  {beer.name}
                </option>
              ))}</select>
            {errors.beers && (
              <p className={style.error}>{errors.beers}</p>
            )}            
            <div className={style.buttoncreate}>
              <button className={style.button} type="submit">
                Create Beer Products
              </button>
            </div>
          </form>
          
          <div className={style.remove}>
            {input.beers.map((beer) => (
              <div className={style.delete}>
                <p>
                  {beer}{" "}
                  <button
                    className={style.button}
                    onClick={() => handleRemoveBeer(beer)}
                  >
                    {" "}
                    X{" "}
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Complete the Name Field of the Beer";
  }
  if (!input.id) {
    errors.id = "Complete the ID field";
  }
  if (!input.ifff) {
    errors.ifffff = "Check a box corresponding to the % AVB";
  }
  if (!input.idgred) {
    errors.idddss = "Check a box corresponding to the ingredients";
  }
  if (input.beers.length === 0) {
    errors.beers = "Select the corresponding beers(sub-categories)";
  }
  return errors;
}