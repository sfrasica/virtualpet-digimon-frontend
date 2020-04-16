let initialState = {
    id: "",
    username: "",
    user_digimons: [],
    point_collection: "",
    token: ""
}

let userReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_USER_INFORMATION":
            return {
                ...state,
                id: action.payload.user.id,
                username: action.payload.user.username,
                user_digimons: action.payload.user.user_digimons,
                token: action.payload.token,
                point_collection: action.payload.user.point_collection
            }

            case "LOG_OUT":
                return {
                    ...state,
                    ...initialState
                }

                
            case "ADD_DIGIMON_TO_TEAM":
                return {
                    ...state,
                    user_digimons: [...state.user_digimons, action.payload]
                }

            case "DELETE_DIGIMON_FROM_TEAM":
                return {
                    ...state,
                    user_digimons: state.user_digimons.filter(user_digimon => user_digimon.digimon_information.id !== action.payload)
                }

            case "INCREASE_POINTS":
                return {
                    ...state,
                    point_collection:  action.payload.point_collection
                }

            case "DECREASE_POINTS":
                return {
                    ...state,
                    point_collection:  action.payload.point_collection
                }

              




                
            case "UPDATE_DIGIMON_ENERGY":
                // debugger
          
                
                    let updatedArray = state.user_digimons.map(user_digimon => {if (user_digimon.id === action.payload.id) {
                        return action.payload.uDigiObj
                    }
                             else {
                            return user_digimon }})

                return {...state, 
                    user_digimons: updatedArray
                }

            case "UPDATE_TO_CHAMP":
            // debugger
        
            
                let digimonsArray = state.user_digimons.map(user_digimon => {if (user_digimon.id === action.payload.userDigiId) {
                    return action.payload.userDigiObj
                }
                            else {
                        return user_digimon }})

            return {...state, 
                user_digimons: digimonsArray
            }

                
        
            
            default:
                return state
     
                }
            }  

          

export default userReducer