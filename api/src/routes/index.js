const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperament } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            height: el.height,
            weight: el.weight,
            timLife: el.ife_span,
            image: el.image,
            temperament: el.temperament
        };
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

//rutas
router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let dogsTotal = await getAllDogs();
    if(name) {
        dogName = dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send("Perro no encontrado"); 
    }else {
        res.status(200).send(dogsTotal);
    }
})

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params;
    const dogsTotal = await getAllDogs();
    if(id) {
        let dogId = await dogsTotal.filter(el => el.id == id)
        dogId ?
        res.status(200).send(dogId) :
        res.status(404).send("No se encontro el perro")
    }
})

router.get('/temperament', async (req, res) => {
    const temperamentApi = await axios.get('https://api.thedogapi.com/v1/breeds')
    let temperament = await temperamentApi.data.map(el => el.temperament).toString();
    temperament = await temperament.split(',');
    const temp_Space = await temperament.map(el => {
        if(el[0] == ' ') {
            return el.split('');
        }
        return el;
    })
    const tempSpace = await temp_Space.map(el => {
        if(Array.isArray(el)) {
            el.shift();
            return el.join('');
        }
        return el;
    })
     tempSpace.forEach(el => {
        if(el != '') {
            Temperament.findOrCreate({
                where: {
                    name: el
                }
            })
        }
    })
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments);
})

router.post('/dog', async (req, res) => {
    let {
        name,
        height,
        weight,
        timeLife,
        createdInDb,
        image,
        temperament,
    } = req.body

    let dogCreated = await Dog.create({
        name,
        height,
        weight,
        timeLife,
        image,
        createdInDb
    })
    let temperamentDb = await Temperament.findAll({
        where: { name : temperament }
    })
    dogCreated.addTemperament(temperamentDb)
    res.send("Perro creado con exito!")
})




module.exports = router;
