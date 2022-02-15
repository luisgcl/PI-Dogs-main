import React from 'react';
import styles from './Paginated.module.css'

export default function Paginated ({dogPerPage, allDogs, paginated}) {
    const pageNumbers = [] 
    for (let i=1; i<=Math.ceil(allDogs/dogPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className={styles.pagination}>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li key={number}>
                            <a href='#' onClick={() => paginated(number)}>{number}</a>
                        </li>   
                    ))
                }
            </ul>
        </nav>
    )
}