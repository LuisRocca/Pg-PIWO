import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, editOrder} from "../../Redux/actions";
import styles from '../../css/EditOrder.module.css'

const EditOrderFull = ({props}) => {
  const dispatch = useDispatch();
  console.log('PROPS', props)
  let order  = useSelector(state => state.orders)
  order = order.filter(el => el.id === props)
  
  const {totalPrice, status ,address, email} = order[0]
  const [values, setInput] = useState({
    totalPrice: `${totalPrice}`, 
    status: `${status}`,
    address: `${address}`, 
    email: `${email}`, 
  });
  
  const handleChange = ({target: {email, value }}) => {
    setInput({
      ...values,
      [email]: value,
    });
    console.log('Estado:', values)
  }; 
      
    function handleSubmit(e) {
        e.preventDefault();
        if (values.status !== "" && values.email !== "") {
        dispatch(editOrder(values));
        alert("Successfully Edit Order!!!");
        setInput({ 
          status: "",
          email: '',
        });
      } else {
        alert(
          "You must complete all the fields to add the beer !!!"
          );
        }
    }
    useEffect(() => {
      dispatch(getOrders());
    }, [dispatch]);
    
    return (
      <div className={styles.create}>
        <div>
          <Link to="/admin">
            <button className={styles.button}>Back</button>
          </Link>
  
          <div className={styles.divForm}>
          <h2 className={styles.h9}>ADMIN PANEL</h2>
            <h1 className={styles.h10}>Edit Order</h1>
            <form onSubmit={handleSubmit}>
                <label >Id</label>
                <input className={styles.inputform} name='id' onChange={handleChange} autoComplete='off' type='text' value={values.name}/>
                <label >totalPrice</label>
                <input className={styles.inputform} name='totalPrice' onChange={handleChange} autoComplete='off' type='text' value={values.totalPrice} />
                <label >Status</label>
                <input className={styles.inputform} name='status' onChange={handleChange} autoComplete='off' type='text' value={values.status} />
                <label >Address</label>
                <input className={styles.inputform} name='address' onChange={handleChange} autoComplete='off' type='text' value={values.address} />
                <label >Email</label>
                <input className={styles.inputform} name='email' onChange={handleChange} autoComplete='off' type='text' value={values.email} />                
                <button>Edit Order</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default EditOrderFull;