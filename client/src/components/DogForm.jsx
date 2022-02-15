import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {postDog, getTemperament} from '../actions/index'
import { useDispatch, useSelector } from 'react-redux';
import styles from './DogForm.module.css'

export default function DogForm() {
    const dispatch = useDispatch();
    const temperament = useSelector(state => state.temperament);

    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        timeLife: "",
        imge: "",
        temperament: []

    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }



    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postDog(input))
        alert("Personaje creado con exito!!")
        setInput({
            name: "",
            height: "",
            weight: "",
            timeLife: "",
            image: "",
            temperament: []
        })
    }

    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)
        })
    }

    useEffect(() => {
        dispatch(getTemperament())
    },[dispatch])

    return (
        <div className={styles.container}>
            <Link to= '/home'><button>Volver</button></Link>
            <h1>Crea tu raza</h1>
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                <div>
                    <label htmlFor="">Nombre:</label>
                    <input 
                    type="text"
                    value={input.name}
                    name='name'
                    onChange={e => handleChange(e)}
                    />
        </div>
                <div>
                <label htmlFor="">Altura min/max:</label>
                    <input 
                    type="text"
                    value={input.height.metric}
                    name='height'
                    onChange={e => handleChange(e)}
                    />
                </div>

              

                <div>
                <label htmlFor="">Peso min/max:</label>
                    <input 
                    type="text"
                    value={input.weight.metric}
                    name='weight'
                    onChange={e => handleChange(e)}
                    />
                </div>

               

                <div>
                <label htmlFor="">Tiempo de vida:</label>
                    <input 
                    type="text"
                    value={input.timeLife}
                    name='timeLife'
                    onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                <label htmlFor="">Imagen:</label>
                    <input 
                    type="text"
                    value={input.image}
                    name='image'
                    onChange={e => handleChange(e)}
                    />
                </div>

                <select onChange={e => handleSelect(e)}>
                    {temperament.map((temp) => (
                        <option value={temp.name}>{temp.name}</option>
    ))}
                </select>
                
                <button type='submit'>Crear raza</button>
            </form>

            {
                input.temperament.map(el => 
                    <div>
                        <p>{el}</p>
                        <button onClick={() => handleDelete(el)}>X</button>
                    </div>
                    )
            }

        </div>
    )
}