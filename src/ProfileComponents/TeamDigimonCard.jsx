import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import {addDigimonToTeam, deleteDigimonFromTeam, updateDigimonEnergy} from '../Redux/actions'
import { Button, Card, CardImg } from 'react-bootstrap'
const TeamDigimonCard = (props) => {
    
    let {user_digimon} = props
   let { id, digimon } = props.user_digimon
   let {name, sprite, level, energy} = digimon
 
       
    let handleDeleteDigimonFromTeam = (e) => {
        console.log(props.user_digimon.id)
        // console.log(props.energy)
        props.deleteDigimonFromTeam(props.user_digimon.id)
    }

    let handleUpdateDigimonEnergy = () => {
        
        console.log(user_digimon.id)
        let increaseEnergy = digimon.energy + 5
        fetch(`http://localhost:3000/user_digimons/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${props.token}`
                // "Authorization": `bearer ${localStorage.token}`
            },
            body: JSON.stringify(
                {...digimon, energy: digimon.energy + increaseEnergy}
            )
        })
        .then(resp => resp.json())
        .then(uDigiObj => {
            console.log(uDigiObj)
            
            props.updateDigimonEnergy(id, increaseEnergy, uDigiObj)
            })
    }

    // state={
    //     objectKey: {name: "hello", weight: 20},
    //     string: "goodbye"
    //     }
    //     and you just want to change the state of weight, your setState would have to look like this:
    //     this.setState({
    //          objectKey: {...this.state.objectKey, weight: 25}
    //     })

    
    return (
       
    <Fragment>
        <Card>
       <li>Name: {name}</li>
       <li>Level: {level}</li>
       <li>Energy: {energy}</li>
       <CardImg variant="top" src={sprite}/>
       {/* <Button variant="primary" className="gabumon" onClick={handleAddDigimonToTeam}>{name}</Button> */}
       <Button variant="primary" className="gabumon" onClick={handleDeleteDigimonFromTeam}>Delete {name} from your team</Button>
       <Button variant='outline-secondary' className="agumon" onClick={handleUpdateDigimonEnergy}>Increase {name} energy level</Button>
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
    updateDigimonEnergy
}

export default connect(getDigimon, mapDispatchToProps)(TeamDigimonCard);
