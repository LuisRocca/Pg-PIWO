import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { useHistory } from 'react-router'
import { getBeers, getImgs } from '../../Redux/actions'
import BeersAdmin from './BeersAdmin'
import styles from '../../css/Admin.module.css'
import NavBar from '../NavBar'

const Admin = () => {
    const dispatch = useDispatch()
    // const history = useHistory()
    const { beers } = useSelector(state => state)
<<<<<<< HEAD
    console.log('beers', beers)
    
const handleClickEdit = (beer) => {
    dispatch(getBeersDetails(beer.id))
    history.push(`/admin/editBeer/${beer.id}`)
}
const handleClickDelete = (beer) => dispatch(deleteBeer(beer.id))
=======
    console.log('beers en Admin', beers)
>>>>>>> 2a676164c2d83eea7f9dcf28957ce50ce6e9bb49


useEffect(() => {
    dispatch(getBeers())
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
                    <h3>Results:</h3>
                    <div className={styles.containerBeer}>
                    {beers.map( el => 
                        <BeersAdmin
                        id = {el.id}
                        name = {el.name}
                        IBU = {el.IBU}
                        ABV = {el.ABV}
                        image = {el.image}
                        price = {el.price}
                        stock = {el.stock}
                        examples = {el.examples}
                        />)}
                    </div>
                </section>
        </div>
    )
}

export default Admin
