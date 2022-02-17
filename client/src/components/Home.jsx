import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperament, selectFiltered, filterCreated, orderByName, orderByWeight } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import SearchBar from "./SearchBar";
import Paginated from "./Paginated";

//styles
import styles from './Home.module.css'
// import style from './Card.module.css'

export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    const temperament = useSelector((state => state.temperament))
    const [currentPage, setCurrentPage] = useState(1)
    const [orden, setOrden] = useState('')
    const [dogPerPage] = useState(8)
    const indexForLastDog = currentPage * dogPerPage
    const indexFortFirstDog = indexForLastDog - dogPerPage
    const currentDogs = allDogs.slice(indexFortFirstDog, indexForLastDog)

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperament())
    },[dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs())
    }

    function handleSelectFiltered(e) {
        e.preventDefault()
        dispatch(selectFiltered(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }
    
    function handleWeight(e) {
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    const paginated = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }

    function handleSort(e) {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div className={styles.container}>
            <nav>
            <Link to='/dog' className={styles.link}>Crear raza</Link>


<button className={styles.button} onClick={e => {handleClick(e)}}>
    cargar perros
</button>



        <div className={styles.contentSelect}>
    <select onChange={e => handleSort(e)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
    </select>
        </div>

    
<div className={styles.contentSelect}>
<select onChange={e => handleFilterCreated(e)}>
    <option value="All">Todos</option>
    <option value="created">Creados</option>
    <option value="Api">Existente</option>
</select>
</div>


<div className={styles.contentSelect}>
<select onChange={e => handleWeight(e)}>
    <option value='asc'>Perro grande</option>
    <option value='desc'>Perro chico</option>
</select>
</div>

<div className={styles.contentSelect}>
<select onChange={e => handleSelectFiltered(e)}>
{temperament.map((temp) => (
            
            <option value={temp.name} key={temp.id}>{temp.name}</option>
))}
</select>
</div>


<SearchBar />
            </nav>
            <hr className={styles.hr} />
            
            <div>
            <h1>Listado de perros</h1>


            

            <Paginated
                dogPerPage={dogPerPage}
                allDogs={allDogs.length}
                paginated={paginated}
                />

                {
                    currentDogs?.map((c) => {
                        return (
                            <div className={styles.cards}>
                                <Link to={"/home/" + c.id}>
                                    <Card name={c.name} 
                                    image={c.image} 
                                    heightMin={ c.heightMin} 
                                    heightMax={c.heightMax} 
                                    weightMin={c.weightMin}
                                    weightMax={c.weightMax} 
                                    temperament={c.temperament} 
                                    key={c.id} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}