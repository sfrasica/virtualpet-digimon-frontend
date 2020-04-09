import React, { Component } from 'react';
import TeamDigimonCard from './TeamDigimonCard'
import {connect} from 'react-redux'
import {Container, Row, CardColumns} from 'react-bootstrap'

class TeamContainer extends Component {

    render() {
        console.log(this.props.user.user_digimons)
        return (
            <div>
                <h2>{this.props.user.username}'s Profile</h2>
                <h3>Digimon List</h3>

                <Container>
                    <Row>
                    <CardColumns>
                    {this.props.user.user_digimons.map((user_digimon) => {
                        return <TeamDigimonCard key={user_digimon.id} 
                                            digimon={user_digimon.digimon}
                                            // energy={user_digimon.digimon.energy}
                                            user_digimon={user_digimon} />
                    })
                    }
                    </CardColumns>
                    </Row>
                </Container>

            </div>
        );
    }

}

const getInfoPlease = (reduxState) => {
    return {
        user: reduxState.user
    }
}

export default connect(getInfoPlease, {})(TeamContainer);