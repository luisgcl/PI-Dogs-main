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

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}