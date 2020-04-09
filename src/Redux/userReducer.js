let initialState = {
    username: "",
    user_digimons: [],
    token: ""
}

let userReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_USER_INFORMATION":
            return {
                ...state,
                username: action.payload.user.username,
                user_digimons: action.payload.user.user_digimons,
                token: action.payload.token
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
                    user_digimons: state.user_digimons.filter(user_digimon => user_digimon.id !== action.payload)
                }

            case "UPDATE_DIGIMON_ENERGY":
                // debugger
          
                
                    let updatedArray = state.user_digimons.map(user_digimon => {if (user_digimon.id === action.payload.userDigiInfo) {
                        return action.payload.uDigiObj
                    }
                             else {
                            return user_digimon }})

                return {...state, 
                    user_digimons: updatedArray
           
                }
        
            
            default:
                return state
     
                }
            }  

          

export default userReducer