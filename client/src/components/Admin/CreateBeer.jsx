import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBeers, postBeer} from "../../Redux/actions";
import styles from '../../css/CreateBeer.module.css'

const CreateBeer = () => {
    const dispatch = useDispatch();
    
    // const [errors, setErrors] = useState({});
  
    const [values, setInput] = useState({
        name: "", 
        style: "", 
        price: "", 
        stock: "", 
        impression: "", 
        aroma: "", 
        img: "https://i.pinimg.com/474x/06/0b/5a/060b5a631c7409459f7b0e029872c725.jpg", 
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
      if (values.name !== "" && values.style !== "") {
        dispatch(postBeer(values));
        alert("Successfully added Beer Products!!!");
        setInput({ 
          name: "",
          style: '',
        });
      } else {
        alert(
          "You must complete all the fields to add the beer !!!"
        );
      }
    }
    useEffect(() => {
      dispatch(getBeers());
    }, [dispatch]);
  
    return (
      <div className={styles.create}>
        <div>
          <Link to="/beers">
            <button className={styles.button}>Back</button>
          </Link>
  
          <div className={styles.divForm}>
          <h2 className={styles.h9}>ADMIN PANEL</h2>
            <h1 className={styles.h10}>Create Beer</h1>
            <form onSubmit={handleSubmit}>
                <label >Name</label>
                <input className={styles.inputform} name='name' onChange={handleChange} autoComplete='off' type='text' value={values.name}/>
                <label >Category</label>
                <input className={styles.inputform} name='style' onChange={handleChange} autoComplete='off' type='text' value={values.style}/>
                <label >Price</label>
                <input className={styles.inputform} name='price' onChange={handleChange} autoComplete='off' type='text' value={values.price} />
                <label >Stock</label>
                <input className={styles.inputform} name='stock' onChange={handleChange} autoComplete='off' type='text' value={values.stock} />
                <label >Impression</label>
                <input className={styles.inputform} name='impression' onChange={handleChange} autoComplete='off' type='text' value={values.impression} />
                <label >Aroma</label>
                <input className={styles.inputform} name='aroma' onChange={handleChange} autoComplete='off' type='text' value={values.aroma} />
                <label >Image</label>
                <input className={styles.inputform} name='img' onChange={handleChange} autoComplete='off' type='text' value={values.img} />
                <label >IBU</label>
                <input className={styles.inputform} name='IBU' onChange={handleChange} autoComplete='off' type='text' value={values.IBU} />
                <label >ABV</label>
                <input className={styles.inputform} name='ABV' onChange={handleChange} autoComplete='off' type='text' value={values.ABV} />
                <label >History</label>
                <input className={styles.inputform} name='history' onChange={handleChange} autoComplete='off' type='text' value={values.history} />
                <label >Ingredients</label>
                <input className={styles.inputform} name='ingredients' onChange={handleChange} autoComplete='off' type='text' value={values.ingredients} />
                <button>Create Beer</button>
            </form>
            {/* <div className={styles.remove}>
              {beersOfCategory.map((beer) => <li key={beer} value={beer} onClick={elimBeer} className={style.delete}>{beer}</li>)}
            </div> */}
          </div>
        </div>
      </div>
    );
  }

export default CreateBeer
