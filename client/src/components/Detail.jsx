import React from 'react'
import styles from './Detail.module.css'

export default function Detail({ name, image, height, weight, temperament }) {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
            <h3>{name}</h3>
            <img src={image.url || image} alt="img not found" width="200px" height="250px" />
            <h4>Altura: {height.metric || height}</h4>
            <h4>Peso: {weight.metric || weight}</h4>
            <h5>Temperamento: {temperament}</h5>
            </div>
           
        </div>
    );
}