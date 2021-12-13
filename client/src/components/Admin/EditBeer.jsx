import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBeers, editBeer} from "../../Redux/actions";
import NavBar from "../NavBar";

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
      <div>
      <NavBar/>
    {/* <div>
      <Link to="/admin">
      </Link>
        <button className={styles.button}>Back</button>
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
        </form> */}
        {/* <div className={styles.remove}>
          {beersOfCategory.map((beer) => <li key={beer} value={beer} onClick={elimBeer} className={style.delete}>{beer}</li>)}
        </div> */}
      {/* </div>
    </div> */}
{/* <div class='container-lg'>
<div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">Email address</label>
<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
<div class="mb-3">
<label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
</div> */}

<div class="body-background">
  <div class="container-fluid d-flex justify-content-center align-items-center h-100">
      <div class="card p-3 text-center py-4">
          <h4>Edit Beer</h4>
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
          <div class="mt-3 d-grid px-3"> <button class="btn btn-primary btn-block btn-signup text-uppercase"> <span>Save</span> </button> </div>
          </form>
      </div>
  </div>
</div>
  </div>
    );
  }

export default EditBeer
