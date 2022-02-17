import React from 'react'
import { useSelector } from 'react-redux';
import styles from './Detail.module.css'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';


export default function Detail() {
    let { id } = useParams();
    const dog = useSelector((state) => state.dogs).find(e => e.id === parseInt(id))
    console.log(id)
    const {name, image, heightMin, heightMax, weightMin, weightMax, temperament} = dog
   console.log(dog)
 
    return (
        <div className={styles.container}>
            <div className={styles.card}>
            <h3>{name}</h3>
            <img src={image.url || image} alt="img not found" width="200px" height="250px" />
            <h4>Altura: {heightMin} - {heightMax}</h4>
            <h4>Peso: {weightMin} - {weightMax}</h4>
            <h5>Temperamento: {temperament}</h5>
            </div>
           
            <Link to= '/home'><button>Volver</button></Link>
        </div>
    );
}