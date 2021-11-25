import React from 'react';
import styles from '../css/Paging.module.css'

export default function Paged ({beersPerPage, beers, paged}) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(beers/beersPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <nav className={styles.paginado}>
                {pageNumber && pageNumber.map(number => <button onClick = {() => paged(number)}>{number}</button>)}
        </nav>
    )
}