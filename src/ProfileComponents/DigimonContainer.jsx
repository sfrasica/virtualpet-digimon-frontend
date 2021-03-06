import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import DigimonCard from './DigimonCard'
import {Container, Row, CardColumns} from 'react-bootstrap'

const DigimonContainer = (props) => {
    //display Digimons
    let rookieDigimons = props.digimons.filter(digiObj => {
        return digiObj.level === "Rookie" ?  digiObj : null 
    })



    let arrayOfDigimon = rookieDigimons.map(digiObj => {
        if (digiObj.name.toLowerCase().includes(props.searchTerm.toLowerCase())) {
    return <DigimonCard key={digiObj.id} digimon = {digiObj}/> 
}})

    console.log(props.searchTerm)
    return (
        <Fragment>
            <h2>Welcome to the Digimon Farm</h2>
            <h2>Create your Team!</h2>
            
            <Container>
            
                <Row>
                <CardColumns xs={4} md={6}>
                {arrayOfDigimon}
                </CardColumns>
                </Row>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        digimons: reduxState.digimons.all,
        searchTerm: reduxState.digimons.searchTerm
    }
    
}

export default connect(mapStateToProps, {})(DigimonContainer);