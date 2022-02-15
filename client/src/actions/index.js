import axios from 'axios';

export function getDogs() {
    return async (dispatch) => {
        let json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getNameDogs(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({
                type: 'GET_NAME_DOGS',
                payload: json.data
            })
        }catch(error) {
            console.log(error)
        }
    }
}

export function getIdDogs(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/dogs/:' + id);
            return dispatch({
                type: 'GET_ID_DOGS',
                payload: json.data
            })
        }catch(error) {
            console.log(error)
        }
    }
}

export function filterCreated(payload) {
  
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function selectFiltered(payload) {
    console.log(payload)
    return {
        type: 'SELECT_FILTERED',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function postDog(payload) {
    return async function(dispatch) {
        const response = await axios.post("http://localhost:3001/dog", payload);
        console.log(response)
        return response;
    }
}

export function getTemperament() {
    return async function(dispatch) {
        var info = await axios.get("http://localhost:3001/temperament");
        return dispatch({
            type: 'GET_TEMPERAMENT',
            payload: info.data  
        })
    }
}