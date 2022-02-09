import React from 'react';

export default function Paginated ({dogPerPage, allDogs, paginated}) {
    const pageNumbers = [] 
    for (let i=1; i<=Math.ceil(allDogs/dogPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className='nose'>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li className='nose' key={number}>
                            <a className='' onClick={() => paginated(number)}>{number}</a>
                        </li>   
                    ))
                }
            </ul>
        </nav>
    )
}