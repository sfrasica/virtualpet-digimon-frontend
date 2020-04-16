import React, { useState, Fragment, Component} from 'react'
import Player from './Player'
import { connect} from 'react-redux'
import { Button, Container } from 'react-bootstrap'
import { increasePoints } from '../Redux/actions';
import rules from '../assets/rules.png'
const weapons = ["virus", "data", "vaccine"];
class Game extends Component {
    //add a state of won
    state = {
      playerOne: weapons[0],
      playerTwo: weapons[0],
      winner: "",
      win: false
    };
  
    startGame = () => {

        console.log("digibattle!")
      let counter = 0;
      let gameInterval = setInterval(() => {
        counter++;
        this.setState({
          playerTwo: weapons[Math.floor(Math.random() * weapons.length)],
          winner: ""
        });
        if (counter > 5) {
          clearInterval(gameInterval);
          this.setState({
            winner: this.selectWinner()
          });
        }
      }, 100);
    };

    //main logic fn of the game
    selectWinner = () => {
        let { playerOne, playerTwo } = this.state;
        if (playerOne === playerTwo) {
            return "You tied with the DigiComputer!"
        } else if ((playerOne === "virus" && playerTwo === "data") ||
        (playerOne === "data" && playerTwo === "vaccine") || (playerOne === "vaccine" && playerTwo === "virus")) {
          
            return "You win! You earned digipoints"
        } else {
            return "You lost to the DigiComputer!"
        }

    }

    selectWeapon = (weapon) => {
        this.setState({
            playerOne: weapon,
            winner: ""
        })
    }


    handleIncreasePoints = () => {
        let {point_collection} = this.props.user
        let {id} = this.props.user
    
        let increasePointAmount = point_collection + 1000
    
        fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.token}`
           
            },
            body: JSON.stringify(
                {point_collection: increasePointAmount}
            )
        })
        .then(resp => resp.json())
        .then(userObj => {
            console.log(userObj)
        // if ()
           this.props.increasePoints(userObj)
            })

            this.setState({
                winner: ""
            })
        
    }



    // onClick={() => handleClick(!clicked)}
    render() {
        console.log(this.state.playerOne)
       console.log(this.props.user)
        return (
            <div>
                {localStorage.token ? 
            <div className="game">
            
            <Container>
              <>
               <h2 style={{color:"white"}}>Total DigiPoints: {this.props.user.point_collection ? this.props.user.point_collection : 0}</h2>
                <h4 style={{color:"white"}}>Rules: Select your type and battle! Vaccine beats Virus, Virus beats Data, Data beats Vaccine</h4>
           
             
                <Container>
                <strong style={{color:"white"}}>Player: {this.props.user.username}</strong>
                <Player weapon={this.state.playerOne}/>
                <Player weapon={this.state.playerTwo}/>
               
                <strong style={{color:"white"}} >DigiComputer</strong>
                </Container>
                <strong style={{color:"white"}} >Select type</strong>
                 <br/>
                <Button variant='primary' onClick={() => this.selectWeapon("vaccine")}>Vaccine</Button>
                <Button variant='danger' onClick={() => this.selectWeapon("virus")}>Virus</Button>
                <Button variant='success' onClick={() => this.selectWeapon("data")}>Data</Button>
                <br/>
                <Button variant="dark" onClick={this.startGame}>BATTLE!</Button>
                <>
                <div>
                <h4 style={{color:"white"}}>
                { this.state.winner ? this.selectWinner() : null }
                </h4>
                </div>
                </>
                { this.state.winner === "You win! You earned digipoints" ? <Button variant="warning"onClick={this.handleIncreasePoints}>Collect your digipoints!</Button> : null}
                </> 
            </Container>

            </div>
            : <h2 >Please register or log in</h2> }
            </div>
        )
    }

}

const mapStateToProps = (reduxState) => {
    return {
        user: reduxState.user,
        points: reduxState.user.point_collection
    }
}




export default connect(mapStateToProps, {increasePoints})(Game);