import React, { useState, Fragment, Component} from 'react'
import Player from './Player'
import { connect} from 'react-redux'
import { Button, Container } from 'react-bootstrap'
import { increasePoints } from '../Redux/actions';

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
            return "You tied with the DigiComputer!!"
        } else if ((playerOne === "virus" && playerTwo === "data") ||
        (playerOne === "data" && playerTwo === "vaccine") || (playerOne === "vaccine" && playerTwo === "virus")) {
            // this.setState({
            //     win: true
            // })
            return "You win! You earned 6 digipoints"
        } else {
            return "You lost to the DigiComputer :(((("
        }
        // if (selectWinner() === "You win! You earned 15 digipoints") {
        //     this.handleIncreasePoints()
        // }

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
    
        let increasePointAmount = point_collection + 6
    
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
            <Container >
          
              
               <h2>Total Points: {this.props.user.point_collection ? this.props.user.point_collection : 0}</h2>
      
           
             
                {this.props.user.username}
                <Player weapon={this.state.playerOne}/>
                <Player weapon={this.state.playerTwo}/>
               
                Evil DigiComputer
                
              
                 <br/>
                <Button variant='outline-dark' onClick={() => this.selectWeapon("virus")}>Virus</Button>
                <Button variant='outline-dark' onClick={() => this.selectWeapon("data")}>Data</Button>
                <Button variant='outline-dark' onClick={() => this.selectWeapon("vaccine")}>Vaccine</Button>
                <div>
                { this.state.winner ? this.selectWinner() : null }
               
                </div>
                <>
                { this.state.winner === "You win! You earned 6 digipoints" ? <Button onClick={this.handleIncreasePoints}>Collect your digipoints!</Button> : null}
                </>

                <Button variant="dark" onClick={this.startGame}>BATTLE!</Button>

            </Container>
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