import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBeers, getStylesOfBeers, orderCategory, orderAlcohol, orderBeer, orderPrice, orderIBU, styleFilter, getOrder, setCart } from "../Redux/actions";
import Beers from "./Beers.jsx";
import styles from '../css/Home.module.css';
import NavBar from './NavBar';

export default function Home () { 
    const dispatch = useDispatch();
    const { beers, stylesBeer, allStyles, orders }= useSelector((state) => state)
    const user = window.localStorage.getItem('login')

    // POR ACA DEJO LA "LOGICA" DEL ORDENADO 

     const handleOrderStyle = (e) => {
        e.preventDefault()
        dispatch(orderCategory(e.target.value))
     }
     const handleStyleFilter = (e) => {
        e.preventDefault()
        dispatch(styleFilter(e.target.value))
     }
     
     const handleOrderAlcohol = (e) => {
        e.preventDefault()
        dispatch(orderAlcohol(e.target.value))
     }
     
     const handleOrderBeers = (e) => {
        e.preventDefault()
        dispatch(orderBeer(e.target.value))
     }

     const handleOrderPrice = (e) => {
        e.preventDefault()
        dispatch(orderPrice(e.target.value))
     }

     const handleOrderIBU = (e) => {
        e.preventDefault()
        dispatch(orderIBU(e.target.value))
     }

    useEffect(() => {
        beers.length>0?console.log()
        :dispatch(getBeers())
        dispatch(getStylesOfBeers())
        dispatch(getOrder(user.id))
        if (orders && orders.carrito) dispatch(setCart(orders.carrito))
    }, [dispatch, beers, user])

    return (
  
        <div>
         <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://i.postimg.cc/VkxHpmWB/piwo-banner1.jpg" class="d-block w-100 " alt="..."/>
                    </div>
                    <div class="carousel-item">
                        <img src="https://i.postimg.cc/DZ8JGkRH/piwo-banner2.jpg" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                        <img src="https://i.postimg.cc/XvsP7mMp/piwo-banner3.jpg" class="d-block w-100" alt="..."/>
                    </div>
                </div>
            </div>
        <br />
         <div>
          <div className='row'>
           <div className='col-sm-1'>
                  <select className="m-3 form-select bg-warning form-select-sm " aria-label="Default select example" value='-' onChange={handleOrderBeers} >
                      <option value="-">Beers</option>
                      <option value="asc" >Asc</option>
                      <option value="des" >Des</option>
                  </select>
            </div>
            <div className='col-sm-1'>
                  <select className="m-3 form-select bg-warning form-select-sm" aria-label="Default select example" value='-' onChange={handleOrderIBU} >
                      <option value="-">IBU</option>
                      <option value="asc" >IBU Asc</option>
                      <option value="des" >IBU Des</option>
                  </select>
            </div>
            <div className='col-sm-1'>
                  <select className="m-3 form-select bg-warning form-select-sm" aria-label="Default select example" value='-' onChange={handleOrderPrice} >
                      <option value="-">Price</option>
                      <option value="asc" >price Asc</option>
                      <option value="des" >price Des</option>
                  </select>
            </div>
            <div className='col-sm-2'>
                  <select className="m-3 form-select bg-warning form-select-sm" aria-label="Default select example" value='-' onChange={handleOrderAlcohol} >
                      <option value="">Alcohol</option>
                      <option value="asc" >Asc alcohol</option>
                      <option value="des" >Des alcohol</option>
                  </select>
            </div>
          </div>
                         

            <div>
            {beers.length>0 &&
                <section className={styles.select}>
                    <h3>Beers:</h3>
                    <div className={styles.containerBeer}>
                    {beers.map( el => {
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
                                </div>
                            )}
                        )}
                    </div>
                </section>}
                  <br></br>
                <h1 className='' > Categories </h1>
                <br/>
                <div className='row'>
                    <div className='col-sm-2'>
                        <select className="m-3 form-select bg-warning form-select-sm" aria-label="Default select example" value='-' onChange={handleStyleFilter} >
                            <option value="-">Style filter</option>
                            <option value="all">All styles</option>
                            {allStyles.map(el => <option value={el.name}>{el.name}</option>)}
                        </select>
                    </div>
                    { stylesBeer.length>1 && 
                    <div className='col-sm-2'>
                        <select className="m-3 form-select bg-warning form-select-sm" aria-label="Default select example" value='-' onChange={handleOrderStyle} >
                            <option value="-">Style order</option>
                            <option value="asc" >Asc style</option>
                            <option value="des" >Des style</option>
                        </select>
                    </div>}
                </div>
                {stylesBeer && stylesBeer.map( s =>s.beers.length>0?
                <section className={styles.select}>
                    <h3>{s.name}</h3>
                    <div className={styles.containerBeer}>
                    {s.beers ? s.beers.map((e) => {
                        return (   
                            <div key={e.name}>
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
                :null)}
            </div>
        </div>
        </div>
    )      
}   
