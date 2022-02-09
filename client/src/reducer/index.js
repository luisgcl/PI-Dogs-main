const inicialState = {
    dogs: [],
    allDogs: []
}

function rootReducer (state = inicialState, action) {
    switch(action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
            case 'GET_NAME_DOGS':
                return {
                    ...state,
                    dogs: action.payload
                }
                case 'FILTER_CREATED':
                
                const createdFilter = action.payload === 'created' ? state.allDogs.filter(el => el.createdInDb) : state.allDogs.filter(el => !el.createdInDb)

                return {
                    ...state,
                    dogs: createdFilter 
                }
            default:
                return state;
    }
}

export default rootReducer;