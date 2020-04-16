import React, { Component } from 'react';
import TeamDigimonCard from './TeamDigimonCard'
import {connect} from 'react-redux'
import {Container, Row, CardColumns} from 'react-bootstrap'

class TeamContainer extends Component {

    render() {
       
        return (
            <div className="team">
            <Container >
             {localStorage.token ? <><h2>{this.props.user.username}'s DigiTeam</h2>
                <h3>Total DigiPoints: {this.props.user.point_collection ? this.props.user.point_collection : 0 }</h3><h3>Digimon on Team: {this.props.user.user_digimons.length > 0 ? this.props.user.user_digimons.length : "None - Go to the DigiFarm" }</h3></> : <h2>Please register or log in</h2> }
                {/* <h2>{this.props.user.username}'s DigiTeam</h2>
                <h3>Total DigiPoints: {this.props.user.point_collection ? this.props.user.point_collection : 0 }</h3> */}

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