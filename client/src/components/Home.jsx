import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperament, selectFiltered, filterCreated, orderByName, orderByWeight } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import SearchBar from "./SearchBar";
import Paginated from "./Paginated";

export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    const temperament = useSelector((state => state.temperament))
    const [currentPage, setCurrentPage] = useState(1)
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
        dispatch(selectFiltered(e.target.value))
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }
    
    function handleWeight(e) {
        dispatch(orderByWeight(e.target.value))
    }

    const paginated = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }

    function handleButton(e) {
        dispatch(orderByName(e.target.value))
    }

    return (
        <div>

            <Link to='/dog'>Crear perro</Link>

            <h1>crea tu perro</h1>

            <button onClick={e => {handleClick(e)}}>
                volver a cargar todos los perros
            </button>

            <div>

            <SearchBar />

            <button onClick={e => handleButton(e)}>A - Z y Z -A</button>

           <select onChange={e => handleFilterCreated(e)}>
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="Api">Existente</option>
            </select>

            <select onChange={e => handleWeight(e)}>
                <option value='asc'>Ascen</option>
                <option value='desc'>Desc</option>
            </select>

            <select onChange={e => handleSelectFiltered(e)}>
            {temperament.map((temp) => (
                        <option value={temp.name}>{temp.name}</option>
            ))}
            </select>

            <Paginated
                dogPerPage={dogPerPage}
                allDogs={allDogs.length}
                paginated={paginated}
                />

                {
                    currentDogs?.map((c) => {
                        return (
                            <div>
                                <Link to={"/home/" + c.id}>
                                    <Card name={c.name} image={c.image} height={c.height} weight={c.weight} temperament={c.temperament} key={c.id} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}