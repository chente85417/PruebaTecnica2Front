import React, { useState, useEffect, useRef } from 'react';
import TableContext from '../../Contexts/TableContext.js';
import FooterContext from '../../Contexts/FooterContext.js';
//--------------------COMPONENTS--------------------//
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Seeker from "../Seeker/Seeker.js";
import Table from "../Table/Table.js";
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Home.scss';

//////////////////////////////////////////////////////////////////////////////
//                                   HOME                                   //
//Main root component                                                       //
//Contains all the other components and performs the queries to the backend //
//Contains:                                                                 //
//  Seeker: component to attend the user search for a product               //
//  Table: component to show the records set retrieved from the DB          //
//////////////////////////////////////////////////////////////////////////////
const Home = () => {
  //HOOKS
  const [showResults, setShowResults] = useState(null); //Records set to show
  const [showMessage, setShowMessage] = useState(false);//Flag to set the showing state of message box

  const orderColumn     = useRef("NOMBRE"); //Name of the field currently selected for sorting
  const orderDirection  = useRef("ASC");    //Current direction of sorting
  const startRow        = useRef(0);        //Current starting ordinal of showing record group
  const endRow          = useRef(10);       //Current number of records to show
  const messageBoxCfg   = useRef({title : "", body : ""});  //Data configuration of popup message box

  //Hook to load initial records set with default values
  useEffect(() => {
    //Config endpoint
    let searchURL = `${process.env.REACT_APP_URLBACK}requestArticles/orderColumn/${orderColumn.current}/orderDirection/${orderDirection.current}/startRow/${startRow.current}/endRow/${endRow.current}`;
    //Ask endpoint for data
    RequestData(searchURL);
  }, []);

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

  //////////////////////////////////////////////
  //Function to ask an endpoint for data      //
  //                                          //
  //Input: endpoint to consume | type: string //
  //Output: void                              //
  //////////////////////////////////////////////
  const RequestData = (endpoint) => {
    fetch(endpoint)
    .then(res => res.json()).then(data => {
      if (!data.ret)
      {
        //INFORM ABOUT FAILURE
        messageBoxCfg.current = {title : "Error", body : data.caption};
        setShowMessage(true);
      }//if
      else
      {
        //console.log(data.caption);
        //Load result status and order rendering
        setShowResults(data.caption);
      }//else
    });
  };//RequestData

  //////////////////////////////////////////////////////////////////////////////////
  //Callback function sent to Header and Footer to notify                         //
  //the searching conditions selected by the user                                 //
  //                                                                              //
  //Input: searching constraints | type: JSON                                     //
  //       field: name of the new field to sort | type: string                    //
  //       direction: name of the new sorting direction | type: string (ASC|DESC) //
  //       range: number of the new starting record to show | type: number        //
  //                  (10 -> next 10 records; -10 -> previous 10 records)         //
  //Output: void                                                                  //
  //////////////////////////////////////////////////////////////////////////////////
  const CallbackHome = (constraints) => {
    //Destructuring constraints
    const {field, direction, range} = constraints;

    if (field !== undefined)
    {
      //field has changed, so update
      orderColumn.current = field;
    }//if

    if (direction !== undefined)
    {
      //direction has changed, so update
      orderDirection.current = direction;
    }//if

    if (range !== undefined)
    {
      //range has changed, so check the limits
      if ((range < 0) && (startRow.current > 9))
      {
        //the user wants to view previous 10 registers
        //only update if not showing the first 10
        startRow.current += range;
      }//if
      if (range > 0)
      {
        //the user wants to view next 10 registers, so update
        startRow.current += range;
      }//if
    }//if
    //Prepare the endpoint based on new parameters
    let searchURL = `${process.env.REACT_APP_URLBACK}requestArticles/orderColumn/${orderColumn.current}/orderDirection/${orderDirection.current}/startRow/${startRow.current}/endRow/${endRow.current}`;
    //console.log(searchURL);
    //Ask endpoint for data
    RequestData(searchURL);
  };//CallbackHome

  //////////////////////////////////////////////////////////////////////////////////////
  //Callback function passed to Seeker to attend user search                          //
  //                                                                                  //
  //Input: data of searching parameters | type: JSON                                  //
  //       selector: collection to search in | type: string (product | manufacturer)  //
  //       itemID: ID of the element | type: number                                   //
  //       name: name of the element | type: string                                   //
  //Output: void                                                                      //
  //////////////////////////////////////////////////////////////////////////////////////
  const NotifySearch = (data) => {
    //Destructuring the incoming data
    const {selector, itemID, name} = data;
    //Endpoint to configure
    let searchURL = undefined;

    if (name !== undefined)
    {
      //the user has clicked the Ok button to search
      if (selector === "product")
      {
        //configure endpoint for a product name
        searchURL = `${process.env.REACT_APP_URLBACK}getArticleFromName/${name}`;
      }//if
      else
      {
        //configure endpoint for a manufacturer name
        searchURL = `${process.env.REACT_APP_URLBACK}getArticlesFromManufacturerName/${name}`;
      }//else
    }//if
    else
    {
      //the user has used the predictive list
      if (selector === "product")
      {
        //configure endpoint for a product ID
        searchURL = `${process.env.REACT_APP_URLBACK}searchArticle/${itemID}`;
      }//if
      else
      {
        //configure endpoint for a manufacturer ID
        searchURL = `${process.env.REACT_APP_URLBACK}searchArticlesFromManufacturer/${itemID}`;
      }//else
    }//else

    if (searchURL !== undefined)
    {
      //console.log(searchURL);
      //Ask endpoint for data
      RequestData(searchURL);
    }//if
  };//NotifySearch

  return (
    <div className="homeContainer">
      {modal()}
      <Seeker callback={NotifySearch}/>
      <TableContext.Provider value = {CallbackHome}>
        <FooterContext.Provider value = {startRow.current}>
          <Table dataSet={showResults}/>
        </FooterContext.Provider>
      </TableContext.Provider>
    </div>
  );
}

export default Home;
