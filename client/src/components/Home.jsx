import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, filterCreated } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import SearchBar from "./SearchBar";
import Paginated from "./Paginated";

export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    const [currentPage, setCurrentPage] = useState(1)
    const [dogPerPage] = useState(8)
    const indexForLastDog = currentPage * dogPerPage
    const indexFortFirstDog = indexForLastDog - dogPerPage
    const currentDogs = allDogs.slice(indexFortFirstDog, indexForLastDog)

    useEffect(() => {
        dispatch(getDogs())
    },[dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs())
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    const paginated = (pageNumbers) => {
        setCurrentPage(pageNumbers)
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

            <select name="" id="">
                <option value=""></option>
            </select>

           <select onChange={e => handleFilterCreated(e)}>
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="Api">Existente</option>
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
                                    <Card name={c.name} image={c.image} weight={c.weight} temperament={c.temperament} key={c.id} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}