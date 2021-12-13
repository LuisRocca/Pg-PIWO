import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, editOrder, deleteOrder} from "../../Redux/actions";
import styles from '../../css/EditOrder.module.css'
import NavBar from "../NavBar";
import { useHistory } from 'react-router'

const EditOrder = ({props}) => {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state);
    const history = useHistory()
    console.log('orders', orders)

const handleClickEdit = (order) => {        
        history.push(`/admin/editOrderFull/${order.id}`)
    }

const handleClickDelete = (order) => dispatch(deleteOrder(order.id))

    useEffect(() => {
        dispatch(getOrders());
        }, [dispatch]);    

    return (
        <div>
            <NavBar />
            <div className={styles.section}>
                <h1>Order List</h1>
                <div className={styles.containerOrder}>
                {orders ? orders.map((e) => {
                    return (
                        <div className={styles.order} key={e.id}>
                            <div onClick={() => handleClickDelete(e)} className={styles.icon1}></div>
                            <div onClick={() => handleClickEdit(e)} className={styles.icon2}></div>
                            <h6 className={styles.h6}>totalPrice = {e.totalPrice}</h6>
                            <h6 className={styles.h6}>status = {e.status}</h6>
                            <h6 className={styles.h6}>address = {e.address}</h6>
                            <h6 className={styles.h6}>email = {e.email}</h6>
                            <h6 className={styles.h6}>id = {e.id}</h6>
                            </div>
                    )
                }) : null}
                </div>
            </div>
        </div>
       );
};

export default EditOrder;





