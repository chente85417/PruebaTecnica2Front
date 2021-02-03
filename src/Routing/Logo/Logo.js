import React, {useState, useEffect} from 'react';
import { Redirect, withRouter } from "react-router-dom";
//--------------------COMPONENTS--------------------//
//----------------------ASSETS----------------------//
import thebridgelogo from '../../assets/theBridge.png';
import mongoicon from '../../assets/mongodb.svg';
import reacticon from '../../assets/react.png';
import nodeicon from '../../assets/node.jpg';
import expressicon from '../../assets/express.png';
import sassicon from '../../assets/sass.jpg';
import bootstrapicon from '../../assets/bootstrap.png';
import mariadbicon from '../../assets/mariadb.png';
import jsicon from '../../assets/javascript.webp';
//----------------------STYLES----------------------//
import './Logo.scss';

const Logo = () => {
    const [launchHome, setlaunchHome] = useState(false);
  
    useEffect(() => {
        setTimeout(() => setlaunchHome(true), 6000);
    }, []);

    return (
        <div id = "logoContainer">
            {launchHome ?
                <Redirect to="/home" /> :
                <>
                    <div id="theBridgeContainer">
                        <img id="bridge" src={thebridgelogo} alt="logo de The Bridge"/>
                    </div>
                    <div id="titleContainer">
                        <p>PRUEBA TÉCNICA</p>
                        <p>TIENDA ONLINE</p>
                    </div>
                    <div id="mongoContainer" class="container">
                        <img id="mongo" src={mongoicon} alt="icono de MongoDB"/>
                    </div>
                    <div id="nodeContainer" class="container">
                        <img id="node" src={nodeicon} alt="icono de Node.js"/>
                    </div>
                    <div id="expressContainer" class="container">
                        <img id="express" src={expressicon} alt="icono de Express"/>
                    </div>
                    <div id="sassContainer" class="container">
                        <img id="sass" src={sassicon} alt="icono de Sass"/>
                    </div>
                    <div id="bootstrapContainer" class="container">
                        <img id="bootstrap" src={bootstrapicon} alt="icono de Bootstrap"/>
                    </div>
                    <div id="reactContainer" class="container">
                        <img id="react" src={reacticon} alt="icono de React"/>
                    </div>
                    <div id="mariadbContainer" class="container">
                        <img id="mariadb" src={mariadbicon} alt="icono de MariaDB"/>
                    </div>
                    <div id="jsContainer" class="container">
                        <img id="js" src={jsicon} alt="icono de Javascript"/>
                    </div>
                </>}
                {/* <img id="mongo" src={mongoicon} alt="icono de MongoDB"/>}*/}
                {/* <img id="App-logo" src={logo} alt="logo indicativo de la prueba técnica"/>} */}
        </div>
    );
};//Logo

export default withRouter(Logo);
