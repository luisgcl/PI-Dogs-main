import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameDogs } from '../actions';
import styles from './SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameDogs(name))
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
            <input 
                className={styles.search}
                type="text"
                placeholder='Buscar...'
                onChange={e => handleInputChange(e)}
            />
            <button className={styles.button} type='submit'>Buscar</button>
            </form>
        </div>
    )
}