import React from 'react';

export default function Paged ({beersPerPage, beers, paged}) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(beers/beersPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <nav>
            <ul>
                {pageNumber && pageNumber.map(number => {
                    return (
                        <li key={number}>
                            <button onClick = {() => paged(number)}>{number}</button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}