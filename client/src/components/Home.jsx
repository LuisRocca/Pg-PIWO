import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBeers, getStylesOfBeers, orderCategory, orderAlcohol, orderBeer, orderPrice, orderIBU  } from "../Redux/actions";
import Beers from "./Beers.jsx";
import Search from './search.jsx';
import styles from '../css/Home.module.css';
import NavBar from './NavBar';

export default function Home () { 
    const dispatch = useDispatch();
    const { beers, stylesBeer, searchBeer }= useSelector((state) => state)
    const history = useHistory()

    // POR ACA DEJO LA "LOGICA" DEL ORDENADO 

    const [orderBeers, setorderBeers] = useState('')
    const [order_Category, setorderCategory] = useState('')
    const [orderA_lcohol, setorderAlcohol] = useState('')
    const [order_Price, setorderPrice] = useState('')
    const [order_IBU, setorderIBU] = useState('')


     const handleOrderCategory = (e) => {
        e.preventDefault()
        dispatch(orderCategory(e.target.value))
        setorderCategory(`Orden ${e.target.value}`)
     }
     
     const handleOrderAlcohol = (e) => {
        e.preventDefault()
        dispatch(orderAlcohol(e.target.value))
        setorderAlcohol(`Orden ${e.target.value}`)
     }
     
     const handleOrderBeers = (e) => {
        e.preventDefault()
        dispatch(orderBeer(e.target.value))
        setorderBeers(`Orden ${e.target.value}`)
     }

     const handleOrderPrice = (e) => {
        e.preventDefault()
        dispatch(orderPrice(e.target.value))
        setorderPrice(`Orden ${e.target.value}`)
     }

     const handleOrderIBU = (e) => {
        e.preventDefault()
        dispatch(orderIBU(e.target.value))
        setorderIBU(`Orden ${e.target.value}`)
     }

    useEffect(() => {
        dispatch(getBeers())
        stylesBeer.length>0? console.log(stylesBeer) :dispatch(getStylesOfBeers())
    }, [dispatch, stylesBeer])

    return (
        <div>
            <NavBar />
         {/* ESTOS SON LOS BOTONES QUE EL DOCTOR SILVIO DEBERIA DE PONER EN EL SIDEBAR */}
          <div className='row'>

           <div className='col-sm-1'>
                  <select className="form-select bg-secondary" aria-label="Default select example" onChange={handleOrderBeers} >
                      <option value="asc" >Asc</option>
                      <option value="des" >Des</option>
                  </select>
            </div>
            <div className='col-sm-1 '>
                  <select className="form-select bg-secondary" aria-label="Default select example" onCHange={e => handleOrderIBU(e)} >
                      <option value="asc" >IBU +</option>
                      <option value="des" >IBU -</option>
                  </select>
            </div>
            <div className='col-sm-1 '>
                  <select className="form-select bg-secondary" aria-label="Default select example" onChange={e => handleOrderPrice(e)} >
                      <option value="asc" >price +</option>
                      <option value="des" >price -</option>
                  </select>
            </div>
            <div className='col-sm-2'>
                  <select className="form-select bg-secondary" aria-label="Default select example" onChange={e => handleOrderAlcohol(e)} >
                      <option value="asc" >Asc alcohol</option>
                      <option value="des" >Des alcohol</option>
                  </select>
            </div>
            <div className='col-sm-2'>
                  <select className="form-select bg-secondary" aria-label="Default select example" onChange={e => handleOrderCategory(e)} >
                      <option value="asc" >Asc category</option>
                      <option value="des" >Des category</option>
                  </select>
            </div>
          </div>

            <div>
                {searchBeer && searchBeer.length<30 &&
                <section className={styles.select}>
                    <h3>Results:</h3>
                    <div className={styles.containerBeer}>
                    {searchBeer.map( el => {
                        return (   
                            <div key={el.id}>
                                    <Beers
                                    id = {el.id}
                                    name = {el.name}
                                    IBU = {el.IBU}
                                    ABV = {el.ABV}
                                    image = {el.image}
                                    price = {el.price}
                                    stock = {el.stock}
                                    examples = {el.examples}
                                    />
                                </div>)
                        }
                        )}
                    </div>
                </section>}

                {stylesBeer && stylesBeer.map( s =>s.beers.length>0?
                <section className={styles.select}>
                    <h3>{s.name}</h3>
                    <div className={styles.containerBeer}>
                    {s.beers ? s.beers.map((e) => {
                        // console.log(e)
                        return (   
                            <div key={e.id}>
                                <Beers
                                id = {e.id}
                                name = {e.name}
                                IBU = {e.IBU}
                                ABV = {e.ABV}
                                image = {e.image}
                                price = {e.price}
                                stock = {e.stock}
                                examples = {e.examples}
                                />
                            </div>
                        )
                    }): <h1>No beers</h1>}
                    </div>
                </section>
                :<h1>Nohay</h1>)}
            </div>
        </div>
    )      
}   