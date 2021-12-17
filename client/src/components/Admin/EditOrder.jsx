import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, deleteOrder,} from "../../Redux/actions";
import styles from '../../css/EditOrder.module.css'
import NavBar from "../NavBar";
import { useHistory } from 'react-router'
import swal from "sweetalert";

const EditOrder = ({props}) => {
    const dispatch = useDispatch();
    const { allOrder } = useSelector(state => state);
    const history = useHistory()
    // console.log('orders', orders)

const handleClickEdit = (order) => {        
        history.push(`/admin/editOrderFull/${order.id}`)
    }

const handleClickDelete = (order) => {
    dispatch(deleteOrder(order.id))
    swal("Successfully deleted order", {
        buttons: false,
        icon: 'success',
        timer: 1500,
        }
        ).then(() => {
            window.location.reload()
        })
}

    useEffect(() => {
        dispatch(getOrders());
        }, [dispatch]);    

const totalPrice = () => {
    if (allOrders) {
        
        let total = 0;
        var t = 0
        total = allOrders.map((e) => Number(e.price) *  Number(e.quantity))
        for (let i = 0; i < total.length; i++) {
            t = t + total[i]
        }
    } else {
        t = 0
    }
}

    return (
        <div>
            <NavBar />
            <div className={styles.section}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                <h1>Order List</h1>
                            </div>
                <div className={styles.containerOrder}>
                  
                {allOrder ? allOrder.map((e) => {
                    return (
                        <div className={styles.order} key={e.id}>
                            <div onClick={() => handleClickDelete(e)} className={styles.icon1}></div>
                            <div onClick={() => handleClickEdit(e)} className={styles.icon2}></div>
                                                    
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Order ID:</label>
                                            <input type="text" className="form-control" value={e.id} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>User ID:</label>
                                            <input type="text" className="form-control" value={e.userId} disabled />
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Quantity:</label>
                                            <input type="text" className="form-control" value={e.carrito.quantity} disabled />
                                        </div>
                                    </div>
                                </div> */}
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <div className="form-group">
//                                             <label>Total Price:</label>
//                                             <input type="text" className="form-control" value={e.t} disabled />
//                                         </div>
//                                     </div>
//                                 </div>
                                {/* <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Unity Price:</label>
                                            <input type="text" className="form-control" value={e.carrito.price} disabled />
                                        </div>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Status:</label>
                                            <input type="text" className="form-control" value={e.status} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Address:</label>
                                            <input type="text" className="form-control" value={e.address} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Email:</label>
                                            <input type="text" className="form-control" value={e.email} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Payment Id:</label>
                                            <input type="text" className="form-control" value={e.payment_id} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Payment Status:</label>
                                            <input type="text" className="form-control" value={e.payment_status} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Merchant Order Id:</label>
                                            <input type="text" className="form-control" value={e.merchant_order_id} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Title:</label>
                                            <input type="text" className="form-control" value={e.title} disabled />
                                        </div>
                                    </div>
                                </div>                        
                            </div>
                        </div>
                        )
                }) : null}
                </div>
            </div>
        </div>
    </div>
</div>
</div>
        </div>
    )
};

export default EditOrder;





