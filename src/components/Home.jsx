import React from 'react'
import DigimonContainer from '../ProfileComponents/DigimonContainer'

const Home = () => (

        <div className="home">
            {/* <img src="https://wallpaperaccess.com/full/1186574.jpg" alt="Digidestined and their digimon"/> */}
         {localStorage.token ? <DigimonContainer/> : <h2>Please register or log in</h2> }   
        </div>
    );

export default Home;

