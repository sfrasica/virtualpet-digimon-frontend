//function definitions whose only jobs are to return an action (POJO)



//Digimon actions
export const setAllDigimons = (digimonsArr) => {
    return {
        type: "SET_ALL_DIGIMONS",
        payload: digimonsArr
    }
}

export const filterDigimons = (searchInput) => {
    console.log(searchInput)
    return {
        type: "FILTER_SEARCH_DIGIMON",
        payload: searchInput
    }
}

//User actions
export const setUserInformation = (responseFromFetch) => {
    return {
        type: "SET_USER_INFORMATION",
        payload: responseFromFetch
    }
}

export const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export const increasePoints = userObj => {
    return {
        type: "INCREASE_POINTS",
        payload: userObj
    }
}

export const decreaseUserPoints = (userObj) => {
return {
    type: "DECREASE_POINTS",
    payload: userObj

    }
}

//User Digimon actions
export const addDigimonToTeam = (props) => {
    console.log(props.digimon)
    let {user, digimon} = props
        return (dispatch) => {
            fetch('http://localhost:3000/user_digimons', {
                method: 'POST',
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${localStorage.token}`
                },
                body: JSON.stringify({
                    digimon_id: digimon.id
                   
                })
            })
            .then(resp => resp.json())
            .then(digiResp => {
                console.log(digiResp)
                dispatch(digimonData(digiResp))
            })
            
        
           
    
    }
}

export const digimonData = (digimonObj) => {

    
    return {
    type: "ADD_DIGIMON_TO_TEAM",
    payload: digimonObj
    }
}


export const deleteDigimonFromTeam = (id) => {
    console.log(id)
    return (dispatch) => {
        fetch(`http://localhost:3000/user_digimons/${id}`, {
            method: 'DELETE',
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(digiResp => {
            console.log(digiResp)
            dispatch(deletedDigimon(id))
        })
}
}

export const deletedDigimon = (id) => {
     return {
     type: "DELETE_DIGIMON_FROM_TEAM",
     payload: id
 }
}








// export const updateDigimonEnergy = (id) => {
//     return (dispatch) => {
//         
//     }
// }

export const updateDigimonEnergy = (id, increaseEnergy, uDigiObj) => {
    console.log(increaseEnergy)
    return {
        type: "UPDATE_DIGIMON_ENERGY",
        payload: {id, increaseEnergy, uDigiObj}
    }
}

export const updateToChamp = (userDigiId, digiId, userDigiObj ) => {
    console.log(userDigiId)

    return {
        type: "UPDATE_TO_CHAMP",
        payload: {userDigiId, digiId, userDigiObj}
    }
}

export const updateToUlt = (userDigiId, digiId, userDigiObj ) => {
    console.log(userDigiId)

    return {
        type: "UPDATE_TO_ULTIMATE",
        payload: {userDigiId, digiId, userDigiObj}
    }
}

export const updateToMega = (userDigiId, digiId, userDigiObj ) => {
    console.log(userDigiId)

    return {
        type: "UPDATE_TO_MEGA",
        payload: {userDigiId, digiId, userDigiObj}
    }
}

export const updateWarp = (userDigiId, digiId, userDigiObj ) => {
    console.log(userDigiId)

    return {
        type: "UPDATE_WARP_TO_MEGA",
        payload: {userDigiId, digiId, userDigiObj}
    }
}


