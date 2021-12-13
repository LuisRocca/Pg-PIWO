import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, editOrder} from "../../Redux/actions";
import styles from '../../css/EditOrder.module.css'

const EditOrderFull = ({props}) => {
  const dispatch = useDispatch();
  console.log('PROPS', props)
  let order  = useSelector(state => state.orders)
  console.log('ordenes ',  order)
  order = order.filter(el => el.id == props)
  
  const {id, totalPrice, status ,address, email} = order[0]
  const [values, setInput] = useState({
    id: `${id}`,
    totalPrice: totalPrice? `${totalPrice}`: '', 
    status: `${status}`,
    address: `${address}`, 
    email: `${email}`, 
  });

  const handleChange = e => {
    setInput({
      ...values,
      [e.target.name]: e.target.value
    });
  };
  
  /*const handleChange = ({target: {email, value }}) => {
    setInput({
      ...values,
      [email]: value,
    });
    console.log('Estado:', values)
  }; */
      
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
    // useEffect(() => {
    //   dispatch(getOrders());
    // }, [dispatch]);
    
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
            <div className={styles.container__form__input}>
            <label htmlFor="id" className={styles.container__form__input__label}>
              ID
            </label>
            <input
              type="text"
              name="id"
              id="id"
              value={values.id}
              onChange={handleChange}
              className={styles.container__form__input__input}
            />
          </div>
          <div className={styles.container__form__input}>
            <label htmlFor="totalPrice" className={styles.container__form__input__label}>
              Total Price
            </label>
            <input
              type="text"
              name="totalPrice"
              id="totalPrice"
              value={values.totalPrice}
              onChange={handleChange}
              className={styles.container__form__input__input}
            />
          </div>
          <div className={styles.container__form__input}>
            <label htmlFor="status" className={styles.container__form__input__label}>
              Status
            </label>
            <input
              type="text"
              name="status"
              id="status"
              value={values.status}
              onChange={handleChange}
              className={styles.container__form__input__input}
            />
          </div>
          <div className={styles.container__form__input}>
            <label htmlFor="address" className={styles.container__form__input__label}>
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleChange}
              className={styles.container__form__input__input}
            />
          </div>
          <div className={styles.container__form__input}>
            <label htmlFor="email" className={styles.container__form__input__label}>
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              className={styles.container__form__input__input}
            />
          </div>
          <button className={styles.button}>Edit Order</button>
          </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditOrderFull;