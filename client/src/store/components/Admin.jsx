import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getBeers, postUser } from "../actions";
import style from "./Admin.module.css";

export default function Admin() {
  const dispatch = useDispatch();
  
  const allBeers = useSelector((state) => state.beers);
  
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    age: "",
    beers: [],
  });

  function handleChangeName(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handleChangeIbu(e) {
    setInput({ ...input, [e.target.email]: e.target.value });
    setErrors(validate({ ...input, [e.target.email]: e.target.value }));
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
      input.name !== "" &&
      input.username !== "" &&
      input.email !== "" &&
      input.age !== "" &&
      input.beers.length !== 0 
    ) {
      dispatch(postUser(input));
      alert("Successfully added Beer!!!");
      setInput({
        name: "",
        username: "",
        email: "",
        age: "",
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
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={style.create}>
      <div>
        <Link to="/beers">
          <button className={style.button}>Back</button>
        </Link>

        <div className={style.form}>
        <h2 className={style.h9}>ADMIN PANEL</h2>
          <h1 className={style.h10}>ADD BEER FAVORITE !</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label className={style.label}>Name: </label>
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
              <label className={style.label}>IBU: </label>
              <input className={style.duration}
                type="number"
                value={input.duration}
                name="ibu"
                autoComplete="off"
                onChange={(e) => handleChangeIbu(e)}
              />{" "}
              (amargor)
              {errors.email && (
                <p className={style.error}>{errors.email}</p>
              )}
            </div>

            <div className={style.check}>
              <label className={style.label}>% AVB:</label>
              <label>
                <input
                  type="checkbox"
                  value="1"
                  name="1"
                  onChange={(e) => handleCheckUsername(e)}
                />
                0
              </label>
              <label>
                <input
                  type="checkbox"
                  value="2"
                  name="2"
                  onChange={(e) => handleCheckUsername(e)}
                />
                3
              </label>
              <label>
                <input
                  type="checkbox"
                  value="3"
                  name="3"
                  onChange={(e) => handleCheckUsername(e)}
                />
                5
              </label>
              <label>
                <input
                  type="checkbox"
                  value="4"
                  name="4"
                  onChange={(e) => handleCheckUsername(e)}
                />
                7
              </label>
              <label>
                <input
                  type="checkbox"
                  value="5"
                  name="5"
                  onChange={(e) => handleCheckUsername(e)}
                />
                10
              </label>
              {errors.difficulty && (
                <p className={style.error}>{errors.difficulty}</p>
              )}
            </div>

            <div>
              <label className={style.label}>Ingredients:</label>
              <label>
                <input
                  type="checkbox"
                  value=""
                  name="Cebada"
                  onChange={(e) => handleCheckAge(e)}
                />
                Cebada
              </label>
              <label>
                <input
                  type="checkbox"
                  value=""
                  name="Trigo"
                  onChange={(e) => handleCheckAge(e)}
                />
                Trigo
              </label>
              <label>
                <input
                  type="checkbox"
                  value=""
                  name="Maiz"
                  onChange={(e) => handleCheckAge(e)}
                />
                Maiz
              </label>
              <label>
                <input
                  type="checkbox"
                  value="16"
                  name="Frutal"
                  onChange={(e) => handleCheckAge(e)}
                />
                Frutal
              </label>
              {errors.season && <p className={style.error}>{errors.season}</p>}
            </div>

            <label className={style.label}>Sub-Category: </label>
            <select onChange={(e) => handleSelectBeer(e)}>
              <option value="">Select a Beer</option>
              {allBeers && allBeers?.map((beer) => (
                <option key={beer.id} value={beer.id}>
                  {beer.name}
                </option>
              ))}</select>
            {errors.beers && (
              <p className={style.error}>{errors.beers}</p>
            )}            
            <div className={style.buttoncreate}>
              <button className={style.button} type="submit">
                Create Beer Favorite
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
  if (!input.ibu) {
    errors.username = "Complete the Activity IBU field";
  }
  if (!input.AVB) {
    errors.AVB = "Check a box corresponding to the % AVB";
  }
  if (!input.ingredients) {
    errors.age = "Check a box corresponding to the ingredients";
  }
  if (input.beers.length === 0) {
    errors.beers = "Select the corresponding beers";
  }
  return errors;
}