import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBeers, editBeer} from "../../Redux/actions";
import styles from '../../css/CreateBeer.module.css'

const EditBeer = ({props}) => {
  const dispatch = useDispatch();
  // dispatch(getBeersDetails(props))
  console.log('PROPS', props)
  let beer  = useSelector(state => state.beers)
  beer = beer.filter(el => el.id === props)
  const { name , id, price , stock , impression , aroma , img , IBU , ABV , history , ingredients , examples} = beer[0]
  const [values, setInput] = useState({
    name: `${name}`, 
    price: `${price}`,
    id: id,
    stock: `${stock}`, 
    impression: `${impression}`, 
    aroma: `${aroma}`, 
    img: `${img}`, 
    IBU: `${IBU}`, 
    ABV: `${ABV}`, 
    history: `${history}`, 
    ingredients: `${ingredients}`, 
    examples: `${examples}`
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
        dispatch(editBeer(values));
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
          <Link to="/admin">
            <button className={styles.button}>Back</button>
          </Link>
  
          <div className={styles.divForm}>
          <h2 className={styles.h9}>ADMIN PANEL</h2>
            <h1 className={styles.h10}>Edit Beer</h1>
            <form onSubmit={handleSubmit}>
                <label >Name</label>
                <input className={styles.inputform} name='name' onChange={handleChange} autoComplete='off' type='text' value={values.name}/>
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
                <button>Edit Beer</button>
            </form>
            {/* <div className={styles.remove}>
              {beersOfCategory.map((beer) => <li key={beer} value={beer} onClick={elimBeer} className={style.delete}>{beer}</li>)}
            </div> */}
          </div>
        </div>
      </div>
    );
  }

export default EditBeer
