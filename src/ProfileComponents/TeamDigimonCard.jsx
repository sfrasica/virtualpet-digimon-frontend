import React, { Fragment, useState } from 'react'
import {connect} from 'react-redux'
import {addDigimonToTeam, deleteDigimonFromTeam, updateDigimonEnergy, decreaseUserPoints, updateToChamp, updateToUlt, updateToMega, updateWarp} from '../Redux/actions'
import { Button, Card, CardImg, Row, ProgressBar, srOnly } from 'react-bootstrap'
import { opacify } from 'polished'
const TeamDigimonCard = (props) => {
    //first hook
    const [clicked, handleClick] = useState(false)
   

    let {user_digimon} = props
   let {  digimon_information, digimon_id } = props.user_digimon
   let { name, sprite, level, energy, evo1, evo2, evo3, evo_id } = digimon_information
 
    let handleDeleteDigimonFromTeam = (e) => {
        console.log(digimon_information)
        // console.log(props.energy)
        props.deleteDigimonFromTeam(props.user_digimon.digimon_information.id)
    }

    let handleUpdateDigimonEnergy = () => {
    //fetch to decrease user's point_collection && increase digimon energy    
        let id = props.user_digimon.digimon_information.id
        console.log(user_digimon.digimon_information.id)
        let increaseEnergy = digimon_information.energy + 5
        let decreasePointAmount = props.user.point_collection - 7

        props.user.point_collection >= 7 
        
        ?

    fetch(`http://localhost:3000/users/${props.user.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.token}`
            
            },
            body: JSON.stringify(
                {point_collection: decreasePointAmount}
            )
        })
        .then(resp => resp.json())
        .then(userObj => {
            props.decreaseUserPoints(userObj)
        fetch(`http://localhost:3000/user_digimons/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.token}`
            },
            body: JSON.stringify(
                {...user_digimon, energy: increaseEnergy}
            )
        })
        .then(resp => resp.json())
        .then(uDigiObj => {
            console.log(uDigiObj)
            props.updateDigimonEnergy(uDigiObj.id, increaseEnergy, uDigiObj) 
        
            })
        })
        
        :
                
        alert("You don't have enough digipoints. Go play the game to get more.")

             
     }

     let handleUpdateToChamp = () => {
        let id = props.user_digimon.id
        let digimon = props.user_digimon.digimon
         console.log("Digivolve to Champion")
         fetch(`http://localhost:3000/digivolve_to_champ`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.token}`
            },
            body: JSON.stringify({...user_digimon, digimon_id : evo_id}
            )
        })
        .then(resp => resp.json())
        .then(uDigiObj => {
            console.log(uDigiObj, uDigiObj.digimon)
            props.updateToChamp(uDigiObj.id, uDigiObj.digimon,  uDigiObj) 
        
            })
         
     }

     let handleUpdateToUlt = () => {
        let id = props.user_digimon.id
        let digimon = props.user_digimon.digimon
         console.log("Digivolve to Ultimate")
         fetch(`http://localhost:3000/digivolve_to_ult`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.token}`
            },
            body: JSON.stringify({...user_digimon, digimon_id : evo_id}
            )
        })
        .then(resp => resp.json())
        .then(uDigiObj => {
            console.log(uDigiObj, uDigiObj.digimon)
            props.updateToChamp(uDigiObj.id, uDigiObj.digimon,  uDigiObj) 
        
            })
         
     }

     let handleUpdateToMega = () => {
        let id = props.user_digimon.id
        let digimon = props.user_digimon.digimon
         console.log("Digivolve to Mega")
         fetch(`http://localhost:3000/digivolve_to_mega`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.token}`
            },
            body: JSON.stringify({...user_digimon, digimon_id : evo_id}
            )
        })
        .then(resp => resp.json())
        .then(uDigiObj => {
            console.log(uDigiObj, uDigiObj.digimon)
            props.updateToMega(uDigiObj.id, uDigiObj.digimon,  uDigiObj) 
        
            })
         
     }

     let handleUpdateWarp = () => {
        let id = props.user_digimon.id
        let digimon = props.user_digimon.digimon
         console.log("Digivolve to Champion")
         fetch(`http://localhost:3000/digivolve_to_champ`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.token}`
            },
            body: JSON.stringify({...user_digimon, digimon_id : evo_id + 2 }
            )
        })
        .then(resp => resp.json())
        .then(uDigiObj => {
            console.log(uDigiObj, uDigiObj.digimon)
            props.updateWarp(uDigiObj.id, uDigiObj.digimon,  uDigiObj) 
        
            })
         
     }
     
    





    console.log(digimon_id)
    console.log(name)
    return (
        // onClick={() => handleClick(clicked + 1)} /> 
    <Fragment>

        <Card style={{background: opacify(0.27, 'rgba(255, 255, 255, 0.1)')}}>
       <strong>Name: {name}</strong><br/>
       <strong>Level: {level}</strong><br/>
       <strong>Experience: {energy === null ? 0 : energy}</strong>
       <CardImg variant="top" src={sprite}/>
       {/* <Button variant="primary" className="gabumon" onClick={handleAddDigimonToTeam}>{name}</Button> */}
      <br/>
      {/* <div>{level === "Rookie" &&  energy >= 200 ? <strong>Max Energy</strong> : <Button variant='outline-secondary' className={`${name}`.toLowerCase()} onClick={handleUpdateDigimonEnergy}>Train with {name}</Button>}</div>
      <div>{level === "Champion" && energy >= 150 ? <strong>Max Energy</strong> : <Button variant='outline-secondary' className={`${name}`.toLowerCase()} onClick={handleUpdateDigimonEnergy}>Train with {name}</Button>}</div>*/}
      {/* <div>{ energy >= 325 && level === "Ultimate" ? <strong>Max Energy</strong>: <Button variant='outline-secondary' className={`${name}`.toLowerCase()} onClick={handleUpdateDigimonEnergy}>Train with {name}</Button>}</div>  */}
     
    
           <div>
                { clicked 
                
                    ?

                    <div className="meta">
                    <Row>
                    <CardImg variant="top" src={evo1}/>
                    <CardImg variant="top" src={evo2}/>
                    <CardImg variant="top" src={evo3}/>
                    </Row>
                    </div>
                    
                    :

                    null
                    
                     }
                
                </div>
                 {/* Using fn to change state created by hook  */}
            {level === "Rookie"  ?  <ProgressBar striped variant='primary' className={`${name}`.toLowerCase()} now={energy/50 * 100} label={`${Math.floor(energy/50 * 100)}%`} ></ProgressBar> : null }
            {level === "Champion"  ?  <ProgressBar striped variant='success' className={`${name}`.toLowerCase()} now={energy/150 * 100} label={`${Math.floor(energy/150 * 100)}%`}></ProgressBar> : null }
            {level === "Ultimate"  ?  <ProgressBar striped variant='danger' className={`${name}`.toLowerCase()} now={energy/325 * 100} label={`${Math.floor(energy/325 * 100)}%`}></ProgressBar> : null }
            {level === "Mega"  ?  <ProgressBar striped variant='warning' className={`${name}`.toLowerCase()} now={energy/500 * 100} label={`${Math.floor(energy/500 * 100)}%` } srOnly></ProgressBar> : null }
             <br/>
            <div>{energy >= 500 && level === "Mega"? <strong>Max Energy</strong>: <Button variant='outline-secondary' className={`${name}`.toLowerCase()} onClick={handleUpdateDigimonEnergy}>Train with {name}</Button>}</div>

            {level === "Rookie" &&  energy >= 25 ?  <Button variant='primary' className={`${name}`.toLowerCase()} onClick={() => handleClick(!clicked)}>Evolution Path</Button> : null }
            <br/>
            {level === "Rookie" && energy >= 50 ? <Button variant='secondary-color-primary' className={`${name}`.toLowerCase()} onClick={handleUpdateToChamp}>Digivolve!</Button> : null}
            {level === "Champion" && energy >= 150 ? <Button variant='primary' className={`${name}`.toLowerCase()} onClick={handleUpdateToUlt}>Digivolve!</Button> : null}
            {level === "Ultimate" && energy >= 325 ? <Button variant='primary' className={`${name}`.toLowerCase()} onClick={handleUpdateToMega}>Digivolve!</Button> : null}
            {level === "Rookie" && energy >= 200 ? <Button variant='primary' className={`${name}`.toLowerCase()} onClick={handleUpdateWarp}>Warp Digivolve!</Button> :  null}
            <br/>
            <Button variant="outline-dark" onClick={handleDeleteDigimonFromTeam}>Remove {name}</Button>
            
       </Card>
       <br/>
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
    updateDigimonEnergy,
    decreaseUserPoints,
    updateToChamp,
    updateToUlt,
    updateToMega,
    updateWarp

}

export default connect(getDigimon, mapDispatchToProps)(TeamDigimonCard);
