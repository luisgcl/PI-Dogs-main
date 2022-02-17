import React from "react";
import styles from './Card.module.css'

export default function Card({ name, image, heightMin, heightMax, weightMin, weightMax, temperament }) {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
            <h3>{name}</h3>
            <img src={image.url || image} alt="img not found" width="200px" height="250px" />
            <h4>Altura: { heightMin + ' - ' + heightMax}</h4>
            <h4>Peso: {weightMin} - {weightMax}</h4>
            <h5>Temperamento: {temperament}</h5>
            </div>
           
        </div>
    );
}