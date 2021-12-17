import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editOrder} from "../../Redux/actions";
import styles from '../../css/EditOrder.module.css'


const EditOrderFull = ({props}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log('PROPS', props)
  let order  = useSelector(state => state.orders)
  console.log('ordenes ',  order)
  order = order.filter(el => el.id == props)
  
  const {id, quantity, totalPrice, unity_price, status ,address, email, payment_id, payment_status, merchant_order_id, title} = order[0]
  const [values, setInput] = useState({
    id: `${id}`,
    quantity: `${quantity}`,
    totalPrice: totalPrice? `${totalPrice}`: '',
    unity_price: `${unity_price}`, 
    status: `${status}`,
    address: `${address}`, 
    email: `${email}`,
    payment_id: `${payment_id}`,
    payment_status: `${payment_status}`,
    merchant_order_id: `${merchant_order_id}`,
    title: `${title}`, 
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
      
    /*function handleSubmit(e) {
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
    }*/
    // useEffect(() => {
    //   dispatch(getOrders());
    // }, [dispatch]);

    function handleSubmit(e) {
      e.preventDefault();
      if (values.totalPrice !== "" && values.email !== "") {
        dispatch(editOrder(values));
        alert("Successfully Edit Order!!!");
        history.push("/admin/orderList");

        /*setInput({
          id: `${id}`,
          quantity: `${quantity}`,
          totalPrice: totalPrice? `${totalPrice}`: '',
          unity_price: `${unity_price}`,
          status: `${status}`,
          address: `${address}`,
          email: `${email}`,
          payment_id: `${payment_id}`,
          payment_status: `${payment_status}`,
          merchant_order_id: `${merchant_order_id}`,
          title: `${title}`,
        });*/
      } else {
        alert(
          "You must complete all the fields to add the order !!!"
        );
      }
    }    
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
            <label htmlFor="quantity" className={styles.container__form__input__label}>
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              value={values.quantity}
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
            <label htmlFor="unity_price" className={styles.container__form__input__label}>
              Unity Price
            </label>
            <input
              type="text"
              name="unity_price"
              id="unity_price"
              value={values.unity_price}
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
          <div className={styles.container__form__input}>
            <label htmlFor="payment_id" className={styles.container__form__input__label}>
              Payment Id
            </label>
            <input
              type="text"
              name="payment_id"
              id="payment_id"
              value={values.payment_id}
              onChange={handleChange}
              className={styles.container__form__input__input}
            />
          </div>
          <div className={styles.container__form__input}>
            <label htmlFor="payment_status" className={styles.container__form__input__label}>
              Payment Status
            </label>
            <input
              type="text"
              name="payment_status"
              id="payment_status"
              value={values.payment_status}
              onChange={handleChange}
              className={styles.container__form__input__input}
            />
          </div>
          <div className={styles.container__form__input}>
            <label htmlFor="merchant_order_id" className={styles.container__form__input__label}>
              Merchant Order Id
            </label>
            <input
              type="text"
              name="merchant_order_id"
              id="merchant_order_id"
              value={values.merchant_order_id}
              onChange={handleChange}
              className={styles.container__form__input__input}
            />
          </div>
          <div className={styles.container__form__input}>
            <label htmlFor="title" className={styles.container__form__input__label}>
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={values.title}
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