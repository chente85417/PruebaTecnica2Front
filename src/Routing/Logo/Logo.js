import React, {useState, useEffect} from 'react';
import { Redirect, withRouter } from "react-router-dom";
//--------------------COMPONENTS--------------------//
//----------------------ASSETS----------------------//
import logo from '../../assets/caratula.png';
//----------------------STYLES----------------------//
import './Logo.scss';

const Logo = () => {
    const [launchHome, setlaunchHome] = useState(false);
  
    useEffect(() => {
        setTimeout(() => setlaunchHome(true), 3000);
    }, []);

    return (
        <div id = "logoContainer">
            {launchHome ?
                <Redirect to="/home" /> :
                <img id="App-logo" src={logo} alt="logo indicativo de la prueba técnica"/>}
        </div>
    );
};//Logo

export default withRouter(Logo);
