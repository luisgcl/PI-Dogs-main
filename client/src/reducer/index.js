const inicialState = {
    dogs: [],
    allDogs: [],
    temperament: []
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

                case 'SELECT_FILTERED':
                    // const filterDogs = state.allDogs
                    // const selectFiltered = action.payload === state.temperament.name ? state.temperament.filter(el => el.temperament.name) : state.temperament
                    // return {
                    //     ...state,
                    //     temperament: selectFiltered
                    // }

                //creado por axel
                    const allDogs = state.allDogs; // Al usar state.allDogs en lugar de state.dogs, cada vez que aplique un filtro, state.dogs va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allDogs, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.
            const temperamentFiltered = action.payload === 'all' ? allDogs : allDogs.filter(el => {
                if (typeof (el.temperament) === 'string') return el.temperament.includes(action.payload);
                if (Array.isArray(el.temperament)) {
                    let temps = el.temperament.map(el => el.name);
                    return temps.includes(action.payload);
                }
                return true;
            });
            return {
                ...state,
                dogs: temperamentFiltered
            }

        //     const allDogs = state.allDogs
        //     const temperamentFiltered = action.payload === 'All' ? allDogs : allDogs.filter(e => e.temperament === action.payload)    
        // return{
        //     ...state,
        //     dogs: temperamentFiltered
        //     }

                case 'POST_DOG':
                    return {
                        ...state
                    }
                    case 'GET_TEMPERAMENT':
                        return {
                            ...state,
                            temperament: action.payload
                        }
                        case 'ORDER_BY_NAME':
                          let sortedArr = action.payload === 'asc' ? state.dogs.sort((a, b) => {
                              if(a.name > b.name) return 1
                              if(b.name > a.name) return -1
                              return 0
                          }) :
                          state.dogs.sort((a, b) => {
                              if(a.name > b.name) return -1
                              if(b.name > a.name) return 1
                              return 0
                          })
                          return {
                              ...state,
                              dogs: sortedArr
                          }
                        case 'ORDER_BY_WEIGHT':   
                        let sortedWeight = action.payload === 'asc' ? state.dogs.sort((a,b) => { 
                              
                              return (parseInt(b.weightMin) - parseInt(a.weightMin) ) 
                             
                          }) :
                          state.dogs.sort((a, b) => {
                            return (parseInt(b.weightMax) - parseInt(a.weightMax) )
                          })
                            return{
                                ...state,
                                dogs: sortedWeight
                            }
                          
            default:
                return state;
    }
}

export default rootReducer;