import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { deleteBeer, getBeers, getBeersDetails, getImgs } from '../../Redux/actions'
import styles from '../../css/Admin.module.css'
import NavBar from '../NavBar'
// import {lapi}

const Admin = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { beers } = useSelector(state => state)
    console.log('beers', beers)
const handleClickEdit = (beer) => {
    dispatch(getBeersDetails(beer.id))
    history.push(`/admin/editBeer/${beer.id}`)
}
const handleClickDelete = (beer) => dispatch(deleteBeer(beer.id))


useEffect(() => {
    dispatch(getBeers());
    dispatch(getImgs())
    }, [dispatch]);
    return (
        <div>
        <NavBar/>
            <Link to="/admin/createCa">
          <button>Admin Panel Ca</button>
            </Link>
            <Link to="/admin/createBeer">
          <button>Admin Panel Beer</button>
            </Link>
            <section className={styles.section}>
                <h3>Probando</h3>
                <div className={styles.containerBeer}>
                {beers ? beers.map((e) => {
                    // console.log(e)
                    return (   
                        <div className={styles.beer} key={e.id}>
                            <div onClick={() => handleClickDelete(e)} className={styles.icon1}></div>
                            <div onClick={() => handleClickEdit(e)} className={styles.icon2}></div>
                            <img className={styles.img} src={`${e.image}`} alt="" />
                            <div>
                            <h6 className={styles.h6}>name = {e.name}</h6>
                            <h6 className={styles.h6}>IBU = {e.IBU}</h6>
                            <h6 className={styles.h6}>ABV = {e.ABV}</h6>
                            <h6 className={styles.h6}>price = {e.price}</h6>
                            <h6 className={styles.h6}>stock = {e.stock}</h6>
                            </div>
                        </div>
                    )
                }): <h1>No beers</h1>}
                </div>
            </section>
        </div>
    )
}

export default Admin
