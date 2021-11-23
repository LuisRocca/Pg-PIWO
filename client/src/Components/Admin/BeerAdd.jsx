import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBeer, postUser } from "../../redux/actions";


export default function BeerAdd() {
  const dispatch = useDispatch();
    const allBeer = useSelector((state) => state.beers);
  
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  function handleChangeName(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handleChangeDuration(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handleCheckDifficulty(e) {
    if (e.target.checked) {
      setInput({ ...input, difficulty: e.target.value });
    }
    setErrors(validate({ ...input, difficulty: e.target.value }));
  }

  function handleCheckSeason(e) {
    if (e.target.checked) {
      setInput({ ...input, season: e.target.value });
    }
    setErrors(validate({ ...input, season: e.target.value }));
  }

  function handleSelectCountry(e) {
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });
    setErrors(
      validate({ ...input, countries: [...input.countries, e.target.value] })
    );
  }

  function handleRemoveCountry(e) {
    setInput({
      ...input,
      countries: input.countries.filter((ctry) => ctry !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.name !== "" &&
      input.difficulty !== "" &&
      input.duration !== "" &&
      input.season !== "" &&
      input.countries.length !== 0 
    ) {
      dispatch(postActivity(input));
      alert("Successfully added activity!!!");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });
    } else {
      alert(
        "You must complete all the fields to add the activity !!!"
      );
    }
  }

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className={style.create}>
      <div>
        <Link to="/countries">
          <button className={style.button}>Back</button>
        </Link>

        <div className={style.form}>
          <h1 className={style.h10}>ADD TOURIST ACTIVITY!</h1>
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
              <label className={style.label}>Duration: </label>
              <input className={style.duration}
                type="number"
                value={input.duration}
                name="duration"
                autoComplete="off"
                onChange={(e) => handleChangeDuration(e)}
              />{" "}
              hours.
              {errors.duration && (
                <p className={style.error}>{errors.duration}</p>
              )}
            </div>

            <div className={style.check}>
              <label className={style.label}>Difficulty:</label>
              <label>
                <input
                  type="checkbox"
                  value="1"
                  name="1"
                  onChange={(e) => handleCheckDifficulty(e)}
                />
                1
              </label>
              <label>
                <input
                  type="checkbox"
                  value="2"
                  name="2"
                  onChange={(e) => handleCheckDifficulty(e)}
                />
                2
              </label>
              <label>
                <input
                  type="checkbox"
                  value="3"
                  name="3"
                  onChange={(e) => handleCheckDifficulty(e)}
                />
                3
              </label>
              <label>
                <input
                  type="checkbox"
                  value="4"
                  name="4"
                  onChange={(e) => handleCheckDifficulty(e)}
                />
                4
              </label>
              <label>
                <input
                  type="checkbox"
                  value="5"
                  name="5"
                  onChange={(e) => handleCheckDifficulty(e)}
                />
                5
              </label>
              {errors.difficulty && (
                <p className={style.error}>{errors.difficulty}</p>
              )}
            </div>

            <div>
              <label className={style.label}>Season:</label>
              <label>
                <input
                  type="checkbox"
                  value="Autumn"
                  name="Autumn"
                  onChange={(e) => handleCheckSeason(e)}
                />
                Autumn
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Winter"
                  name="Winter"
                  onChange={(e) => handleCheckSeason(e)}
                />
                Winter
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Spring"
                  name="Spring"
                  onChange={(e) => handleCheckSeason(e)}
                />
                Spring
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Summer"
                  name="Summer"
                  onChange={(e) => handleCheckSeason(e)}
                />
                Summer
              </label>
              {errors.season && <p className={style.error}>{errors.season}</p>}
            </div>

            <label className={style.label}>Countries: </label>
            <select onChange={(e) => handleSelectCountry(e)}>
              {allCountries &&
                allCountries
                  .sort((a, b) => {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  })
                  ?.map((ctry) => (
                    <option value={ctry.id}>{ctry.name}</option>
                  ))}
            </select>
            {errors.countries && (
              <p className={style.error}>{errors.countries}</p>
            )}            
            <div className={style.buttoncreate}>
              <button className={style.button} type="submit">
                Add Activity
              </button>
            </div>
          </form>
          
          <div className={style.remove}>
            {input.countries.map((ctry) => (
              <div className={style.delete}>
                <p>
                  {ctry}{" "}
                  <button
                    className={style.button}
                    onClick={() => handleRemoveCountry(ctry)}
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
    errors.name = "Complete the Name Field of the Activity";
  }
  if (!input.duration) {
    errors.duration = "Complete the Activity Duration field";
  }
  if (!input.difficulty) {
    errors.difficulty = "Check a box corresponding to the difficulty";
  }
  if (!input.season) {
    errors.season = "Check a box corresponding to the season";
  }
  if (input.countries.length === 0) {
    errors.countries = "Select the corresponding country / countries";
  }
  return errors;


