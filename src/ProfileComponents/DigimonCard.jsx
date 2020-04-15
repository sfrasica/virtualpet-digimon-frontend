import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import {addDigimonToTeam} from '../Redux/actions'
import { Button, Card, Container, Column, Row, CardImg, Alert } from 'react-bootstrap'
const DigimonCard = (props) => {
    
    
    let handleAddDigimonToTeam = (e) => {
        // console.log(props.user.user_digimons)
        props.user.user_digimons.length <= 5 ? props.addDigimonToTeam(props): alert("The maximum number of Digimon allowed on your team is 6.")
    //    console.log(props.user.user_digimons)
        
        
            }
        
       
  

    
    let {name, level, energy, sprite} = props.digimon 
    return (
       
    <Fragment>
        <Card style={{background: 0}}>
       {name}
       <CardImg variant="top" src={sprite}/>
       <p>Energy: {energy === undefined ? 0 : energy}</p>
       <Button variant="primary" className={`${name}`.toLowerCase()}  onClick={handleAddDigimonToTeam}>Add {name} to your Team</Button>
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
