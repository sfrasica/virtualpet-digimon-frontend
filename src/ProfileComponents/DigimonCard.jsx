import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import {addDigimonToTeam} from '../Redux/actions'
import { Button, Card, Container, Column, Row, CardImg } from 'react-bootstrap'
const DigimonCard = (props) => {
    
    
    let handleAddDigimonToTeam = (e) => {
        // console.log(user)
       
       console.log(props.user.user_digimons)
        props.addDigimonToTeam(props)
            }
       
  

    
    let {name, level, energy, sprite} = props.digimon 
    return (
       
    <Fragment>
        <Card>
       <li>{name}</li>
       <CardImg variant="top" src={sprite}/>
       <p>Energy: {energy}</p>
       <Button variant="primary" className="gabumon" onClick={handleAddDigimonToTeam}>Add {name} to your Team</Button>
       </Card>
       {/* <Button variant="primary" className="gabumon" onClick={handleDeleteDigimonFromTeam}>{name}</Button> */}
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
    addDigimonToTeam
}

export default connect(getDigimon, mapDispatchToProps)(DigimonCard);
