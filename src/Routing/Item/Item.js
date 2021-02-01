import React, { useState, useRef } from 'react';
//--------------------COMPONENTS--------------------//
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Manufacturer from "../Manufacturer/Manufacturer.js";
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Item.scss';

//////////////////////////////////////////////////////////////////
//                              ITEM                            //
//Table row component                                           //
//Presents all involved data from a product as a table row      //
//When clicked, it shows the data of correspondent manufacturer //
//Contains:                                                     //
//  Manufacturer: component that represents a row of data of    //
//                selected product                              //
//////////////////////////////////////////////////////////////////
const Item = ({data}) => {
  //HOOKS
  const [showManufacturer, setShowManufacturer] = useState(false);  //Flag to manage the manufacturer´s data rendering
  const [showMessage, setShowMessage] = useState(false);            //Flag to set the showing state of message box

  const manufacturerData = useRef(undefined);               //Data set of manufacturer´s data
  const messageBoxCfg   = useRef({title : "", body : ""});  //Data configuration of popup message box

  //////////////////////////////////////////////
  //Functions to handle the popup message box //
  //                                          //
  //Displays a message box with notifications //
  //about app situation                       //
  //////////////////////////////////////////////
  const handleClose = () => {
    setShowMessage(false);
  }//handleClose

  const modal = () => {
    return (
        <Modal  show={showMessage} onHide={handleClose}
                backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{messageBoxCfg.current.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {messageBoxCfg.current.body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Entendido
                </Button>
            </Modal.Footer>
        </Modal>);
  }//modal

  //////////////////////////////////////////////////////////////////////////
  //Handler of on click event on the Item                                 //
  //                                                                      //
  //This function is fired every time the user clicks the Item            //
  //It fetches the manufacturer´s data corresponding on clicked product   //
  //and renders the Manufacturer component passing its data as prop json  //
  //                                                                      //
  //Input: void                                                           //
  //Output: void                                                          //
  //////////////////////////////////////////////////////////////////////////
  const OnSelectItem = () => {
    if (showManufacturer)
    {
      //Toggle manufacturer data row if shown
      setShowManufacturer(false);
    }//if
    else
    {
      //Ask the endpoint for data
      fetch(`${process.env.REACT_APP_URLBACK}requestManufacturer/${data.ARTID}`)
      .then(res => res.json()).then(data => {
        if (!data.ret)
        {
          //INFORM ABOUT FAILURE
          messageBoxCfg.current = {title : "Error", body : data.caption};
          setShowMessage(true);
        }//if
        else
        {
          //Store the data set to be sent to Manufacturer component
          manufacturerData.current = data.caption;
          //Change state and render
          setShowManufacturer(true);
        }//else
      });  
    }//else
  };//OnSelectItem

  return (
    <div className="itemContainer" onClick={OnSelectItem}>
      {modal()}
      <p className="artID">{data.ARTID}</p>
      <p className="nombre">{data.NOMBRE}</p>
      <p className="relevancia">{data.RELEVANCIA}</p>
      <p className="precio">{data.PRECIO}€</p>
      {showManufacturer ? <Manufacturer data = {manufacturerData.current}/> : <></>}
    </div>
  );
}

export default Item;
