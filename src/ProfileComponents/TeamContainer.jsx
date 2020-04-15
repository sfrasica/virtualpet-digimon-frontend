import React, { Component } from 'react';
import TeamDigimonCard from './TeamDigimonCard'
import {connect} from 'react-redux'
import {Container, Row, CardColumns} from 'react-bootstrap'

class TeamContainer extends Component {

    render() {
       
        return (
            <Container className="home">
                <h2>{this.props.user.username}'s DigiTeam</h2>
                <h3>Total digipoints: {this.props.user.point_collection}</h3>
                <h3>Digimon List</h3>

                <Container>
                    <Row>
                    <CardColumns width={6}>
                    {this.props.user.user_digimons.map((user_digimon) => {
                        return <TeamDigimonCard key={user_digimon.id} 
                                            digimon={user_digimon.digimon_information}
                                            // energy={user_digimon.digimon.energy}
                                            user_digimon={user_digimon} />
                    })
                    }
                    </CardColumns>
                    </Row>
                </Container>

                </Container>
        );
    }

}

const getInfoPlease = (reduxState) => {
    return {
        user: reduxState.user
    }
}

export default connect(getInfoPlease, {})(TeamContainer);