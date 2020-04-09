let initialState = {
    all: [],
    searchTerm: ""
}

let digimonReducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {

        case "SET_ALL_DIGIMONS":

        return {
            ...state,
            all: action.payload
        }

        case "FILTER_SEARCH_DIGIMON":
            return {
                ...state,
                searchTerm: action.payload
            }

        default:
            return state
    }
}



export default digimonReducer