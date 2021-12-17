import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editOrder, getOrders} from "../../Redux/actions";
import styles from '../../css/EditOrder.module.css'
import swal from 'sweetalert';


const EditOrderFull = ({props}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log('PROPS', props)
  let allOrders  = useSelector(state => state.allOrder)
  console.log('ordenes ',  allOrders)
  let order = allOrders && allOrders.filter(el => el.id !== props)
  console.log('esta es la orden',order)
  
  // const {id, quantity, totalPrice, unity_price, status ,address, email, payment_id, payment_status, merchant_order_id, title} = order
  const [values, setInput] = useState({
    id: `${order[0].id}`,
    // quantity: `${order[0].quantity}`,
    // totalPrice: order[0].totalPrice? `${order[0].totalPrice}`: '',
    // unity_price: `${order[0].unity_price}`, 
    status: `${order[0].status}`,
    address: `${order[0].address}`, 
    email: `${order[0].email}`,
    payment_id: `${order[0].payment_id}`,
    payment_status: `${order[0].payment_status ? order[0].payment_status : 'Not paid'}`,
    merchant_order_id: `${order[0].merchant_order_id}`,
    title: `${order[0].title}`, 
  });

  const handleChange = e => {
    setInput({
      ...values,
      [e.target.name]: e.target.value
    });
  };

    function handleSubmit(e) {
      e.preventDefault();
      if (values.totalPrice !== "" && values.email !== "") {
        dispatch(editOrder(values));
        swal("Successfully Edited Order", {
          buttons: false,
          icon: 'success',
          timer: 1500,
          }
          )
        history.push("/admin/orderList");
      } else {
        swal("You must complete all the fields to add the order ", {
          buttons: false,
          icon: 'error',
          timer: 1500,
          }
          )
      }
    }


    useEffect(() => {
      dispatch(getOrders())
    }, [])
    
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
          {/* <div className={styles.container__form__input}>
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
          </div> */}
          {/* <div className={styles.container__form__input}>
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
          </div> */}
          {/* <div className={styles.container__form__input}>
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
          </div> */}
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