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
                    const selectFiltered = action.payload === state.temperament.name ? state.temperament.filter(el => el.temperament.name) : state.temperament
                    return {
                        ...state,
                        temperament: selectFiltered
                    }

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
                              if(a.weight.metric > b.weight.metric || b.weight) return 1
                              if(b.weight.metric > a.weight.metric || a.weight) return -1
                              return 0
                          }) :
                          state.dogs.sort((a, b) => {
                              if(a.weight.metric > b.weight.metric || b.weight) return -1
                              if(b.weight.metric > a.weight.metric || a.weight) return 1
                              return 0
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