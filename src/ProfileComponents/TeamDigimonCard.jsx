import React, { Fragment, useState } from 'react'
import {connect} from 'react-redux'
import {addDigimonToTeam, deleteDigimonFromTeam, updateDigimonEnergy, decreaseUserPoints, updateToChamp} from '../Redux/actions'
import { Button, Card, CardImg, Row } from 'react-bootstrap'
const TeamDigimonCard = (props) => {
    const [clicked, handleClick] = useState(false)


    let {user_digimon} = props
   let {  digimon_information, digimon_id } = props.user_digimon
   let { name, sprite, level, energy, evo1, evo2, evo3, evo_id } = digimon_information
 
    let handleDeleteDigimonFromTeam = (e) => {
        console.log(digimon_information)
        // console.log(props.energy)
        props.deleteDigimonFromTeam(props.user_digimon.digimon_information.id)
    }

    let handleUpdateDigimonEnergy = () => {
    //fetch to decrease user's point_collection && increase digimon energy    
        let id = props.user_digimon.digimon_information.id
        console.log(user_digimon.digimon_information.id)
        let increaseEnergy = digimon_information.energy + 5
        let decreasePointAmount = props.user.point_collection - 7

        props.user.point_collection >= 7 
        
        ?

    fetch(`http://localhost:3000/users/${props.user.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.token}`
            
            },
            body: JSON.stringify(
                {point_collection: decreasePointAmount}
            )
        })
        .then(resp => resp.json())
        .then(userObj => {
            props.decreaseUserPoints(userObj)
        fetch(`http://localhost:3000/user_digimons/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.token}`
            },
            body: JSON.stringify(
                {...user_digimon, energy: increaseEnergy}
            )
        })
        .then(resp => resp.json())
        .then(uDigiObj => {
            console.log(uDigiObj)
            props.updateDigimonEnergy(uDigiObj.id, increaseEnergy, uDigiObj) 
        
            })
        })
        
        :
                
        alert("You don't have enough digipoints. Go play the game to get more.")

             
     }

     let handleUpdateToChamp = () => {
        let id = props.user_digimon.id
        let digimon = props.user_digimon.digimon
         console.log("Digivolve to Champion")
         fetch(`http://localhost:3000/digivolve_to_champ`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.token}`
            },
            body: JSON.stringify({...user_digimon, digimon_id : evo_id}
            )
        })
        .then(resp => resp.json())
        .then(uDigiObj => {
            console.log(uDigiObj, uDigiObj.digimon)
            props.updateToChamp(uDigiObj.id, uDigiObj.digimon,  uDigiObj) 
        
            })
         
     }
    





    console.log(digimon_id)
    console.log(name)
    return (
        // onClick={() => handleClick(clicked + 1)} /> 
    <Fragment>

        <Card style={{background: (0, 0, 0, 0)}}>
       <strong>Name: {name}</strong><br/>
       <strong>Level: {level}</strong><br/>
       <strong>Energy: {energy === null ? 0 : energy}</strong>
       <CardImg variant="top" src={sprite}/>
       {/* <Button variant="primary" className="gabumon" onClick={handleAddDigimonToTeam}>{name}</Button> */}
       <Button variant="dark" onClick={handleDeleteDigimonFromTeam}>Delete {name} from your team</Button>
       <Button variant='outline-secondary' className={`${name}`.toLowerCase()} onClick={handleUpdateDigimonEnergy}>Increase {name} energy level</Button>
     
           <div>
                { clicked 
                
                    ?

                    <div className="meta">
                    <Row>
                    <CardImg variant="top" src={evo1}/>
                    <CardImg variant="top" src={evo2}/>
                    <CardImg variant="top" src={evo3}/>
                    </Row>
                    </div>
                    
                    :

                    null
                    
                     }
                
                </div>
                <Button variant='primary' className={`${name}`.toLowerCase()} onClick={() => handleClick(!clicked)}> View Evolution Path</Button> 
            {level === "Rookie" && energy >= 50 ? <Button variant='primary' className={`${name}`.toLowerCase()} onClick={handleUpdateToChamp}> Digivolve to Champion!</Button> : null}
     
       </Card>
 </Fragment>
       
    )
};


const getDigimon = (reduxState) => {
    // console.log(reduxState.user.user_digimons)
    return {
        user: reduxState.user
    }
}

const mapDispatchToProps = {
    addDigimonToTeam,
    deleteDigimonFromTeam,
    updateDigimonEnergy,
    decreaseUserPoints,
    updateToChamp
}

export default connect(getDigimon, mapDispatchToProps)(TeamDigimonCard);
