import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import {addDigimonToTeam} from '../Redux/actions'
import { Button, Card, Container, Column, Row, CardImg, Alert } from 'react-bootstrap'
import { opacify } from 'polished'
const DigimonCard = (props) => {
    
    
    let handleAddDigimonToTeam = (e) => {
        // console.log(props.user.user_digimons)
        props.user.user_digimons.length <= 5 ? props.addDigimonToTeam(props): alert("The maximum number of Digimon allowed on your team is 6.")
    //    console.log(props.user.user_digimons)
        
        
            }
        
       
  

    
    let {name, level, energy, sprite} = props.digimon 
    return (
        // {`${name}`.toLowerCase()}
    <Fragment>
        <Card style={{background: opacify(0.27, 'rgba(255, 255, 255, 0.1)')}}>
       <strong>{name}</strong>
       <CardImg variant="top" src={sprite}/>
       {/* <strong>Energy: {energy === undefined ? 0 : energy}</strong> */}
       <Button variant="primary" className={`${name}`.toLowerCase()}  onClick={handleAddDigimonToTeam}>Raise {name}</Button>
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
