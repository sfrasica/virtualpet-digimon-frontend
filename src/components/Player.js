import React, { Fragment } from 'react'
import virus from '../assets/virus.png'
import vaccine from '../assets/vaccine.png'
import data from '../assets/data.png'

const Player = ({weapon}) => {




    return (
        <Fragment>
        <div className="player">
        
            <img src=
            { weapon === "virus" ? virus : weapon === "vaccine" ? vaccine : data}  alt="virus vaccine data types" />
        </div>
        </Fragment>
    )
}

export default Player
