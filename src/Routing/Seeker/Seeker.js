import React, { useState, useRef } from 'react';
//--------------------COMPONENTS--------------------//
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//----------------------ASSETS----------------------//
import logoMariaDB from '../../assets/mariadb.svg';
import logoMongoDB from '../../assets/mongodb.svg';
//----------------------STYLES----------------------//
import './Seeker.scss';

//////////////////////////////////////////////////////////////////////////////
//                                 SEEKER                                   //
//Searching component                                                       //
//This component is in charge of attending user´s requests for searching of //
//products either by selecting one from a predictive list based on user´s   //
//input, or just by direct writing of the name of one element               //
//Contains:                                                                 //
//  Radio buttons to constraint the search on products or on manufacturers  //
//  Input text to write a hint of the desired element                       //
//  A button to execute the search directly from entered text               //
//////////////////////////////////////////////////////////////////////////////
const Seeker = ({callback}) => {
  //HOOKS
  const [showHints, setShowHints] = useState(false);    //Flag to control if predictive list must be rendered
  const [showMessage, setShowMessage] = useState(false);//Flag to set the showing state of message box
  
  const hintsData       = useRef(undefined);  //Contents of predictive list retrieved from the DB based on user´s input
  const seekerText      = useRef(undefined);  //Text of the searching input
  const selector        = useRef("product");  //Selected position of the radio button to constraint the search
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

  //////////////////////////////////////////////////////////////////////////////
  //Handler of on change event on input text                                  //
  //                                                                          //
  //This function is fired every time the contents of the input text changes  //
  //It retrieves all elements on the DB that match user´s input and orders    //
  //the render of predictive list                                             //
  //                                                                          //
  //Input: event | type: object                                               //
  //Output: void                                                              //
  //////////////////////////////////////////////////////////////////////////////
  const OnChangeInput = (event) => {
    event.preventDefault();
    //Reset predictive list from previous render
    setShowHints(false);

    if (event.currentTarget.value !== "")
    {
      //There is a non empty enter in search input text
      //Initialize a string for endpoint
      let searchSQL = undefined;
      if (selector.current === "product")
      {
        //Search over products selected, so request all products based on input text
        searchSQL = `${process.env.REACT_APP_URLBACK}requestProducts/${event.currentTarget.value}`;
      }//if
      else
      {
        //Search over manufacturers selected, so request all manufacturers based on input text
        searchSQL = `${process.env.REACT_APP_URLBACK}requestManufacturers/${event.currentTarget.value}`
      }//else

      //Ask the endpoint for data
      fetch(searchSQL)
      .then(res => res.json()).then(data => {
        if (!data.ret)
        {
          //INFORM ABOUT FAILURE
          messageBoxCfg.current = {title : "Error", body : data.caption};
          setShowMessage(true);
        }//if
        else
        {
          //Store retrieved data in the variable
          hintsData.current = data.caption;
          //Change state and order rendering of predictive list
          setShowHints(true);
        }//else
      });  
    }//if
    else
    {
      //Searching input is empty, so reset the list
      setShowHints(false);
    }//else
  };//OnChangeInput

  ////////////////////////////////////////////////////////////////////////////////////////////
  //Handler of on click event on an item of the predictive list                             //
  //                                                                                        //
  //This function is fired every time the user clicks one element of the predictive list    //
  //It fills the input text with one of the selected item and sends back to Home component  //
  //the data to perform the request to the DB                                               //
  //                                                                                        //
  //Input: event | type: object                                                             //
  //Output: void                                                                            //
  ////////////////////////////////////////////////////////////////////////////////////////////
  const ItemClicked = (event) => {
    //console.log(event.currentTarget);
    if (seekerText.current !== undefined)
    {
      //Fills the input text with selected element
      seekerText.current.value = event.currentTarget.innerText;
      //Hide the predictive list
      setShowHints(false);
    }//if
    //Use the callback from the context to pass all data to Home component
    callback({  selector : selector.current,  //position of radio button selector
                itemID : event.currentTarget.attributes["data-rb-event-key"].value, //ID of the element
                name : undefined}); //name of the element
  };//ItemClicked

  ////////////////////////////////////////////////////////////////////
  //Handler of on click event on the Ok button                      //
  //                                                                //
  //This function is fired every time the user clicks the Ok button //
  //It sends back to Home component all data to perform a query     // 
  //based on current contents of                                    //
  //the input text                                                  //
  //                                                                //
  //Input: void                                                     //
  //Output: void                                                    //
  ////////////////////////////////////////////////////////////////////
  const OnOk = () => {
    //Use the callback from the context to pass all data to Home component
    callback({  selector : selector.current,        //position of radio button selector
                itemID : undefined,                 //ID of the element
                name : seekerText.current.value});  //name of the element
  };//OnOk

  ////////////////////////////////////////////////////////////////////////////////
  //Handler of on click event on the radio buttons                              //
  //                                                                            //
  //This function is fired every time the user clicks one of the radio buttons  //
  //It changes the searching scope between products and manufacturers, cleans   //
  //the input text and reset the predictive list                                // 
  //                                                                            //
  //Input: event | type: object                                                 //
  //Output: void                                                                //
  ////////////////////////////////////////////////////////////////////////////////
  const OnClickedSelector = (event) => {
    selector.current = event.currentTarget.value; //updates the selector position variable
    seekerText.current.value = "";  //resets the input text
    setShowHints(false);  //resets the predictive list
  };//OnClickedSelector

  ////////////////////////////////////////////////////////////////////////////////
  //Handler of on click event on the DB Engine selector radio buttons           //
  //                                                                            //
  //This function is fired every time the user clicks one of the radio buttons  //
  //to select current DB Engine                                                 //
  //It switches current enabled DB Engine between MySQL and MongoDB             //
  //                                                                            //
  //Input: event | type: object                                                 //
  //Output: void                                                                //
  ////////////////////////////////////////////////////////////////////////////////
  const OnClickedDBEngineSelector = (event) => {
    //selector.current = event.currentTarget.value; //updates the selector position variable
    let endpoint = `${process.env.REACT_APP_URLBACK}setDBEngine/${event.currentTarget.value}`;
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
        //Load result status and order rendering
        //setShowResults(data.caption);
        seekerText.current.value = "";  //resets the input text
        setShowHints(false);  //resets the predictive list
      }//else
    });
  };//OnClickedSelector

  //////////////////////////////////////////////////////////////
  //Function to render all elements of the predictive list    //
  //                                                          //
  //It traverses the data set retrieved from the DB based on  //
  //user´s entry and creates a Bootstrap ListGroup component  //
  //with as much items as data in the data set                //
  //                                                          //
  //Input: void                                               //
  //Output: JSX node                                          //
  //////////////////////////////////////////////////////////////
  const InsertList = () => {
    //Array of items of the ListGroup
    let arrayItems = [];
    //Counter to set individual keys to items for React
    let cont = 0;

    //Data set traversing
    while(cont < hintsData.current.length)
    {
      //Insert one Item component into the ListGroup
      //eventKey attribute is set with the ID of the product or the manufacturer depending on current scope
      //this eventKey will be sent back the Home component when an Item is selected to know which element to query about
      arrayItems.push(<ListGroup.Item 
                        key = {cont}
                        eventKey = {(selector.current === "product") ? hintsData.current[cont].ARTID : hintsData.current[cont].FABID}
                        onClick = {ItemClicked} >
                          {hintsData.current[cont].NOMBRE}
                      </ListGroup.Item>);
      ++cont;
    }//while

    //Returns the ListGroup node with its Items to be inserted in rendering
    return (
        <ListGroup>
            {arrayItems}
        </ListGroup>
    );
};//InsertList

  return (
    <div className="seekerContainer">
      {modal()}
      <div id="DBEngineSelectors">
      <input type="radio" id="selectorMySQL" name="DBEngine" value="MySQL" defaultChecked onClick={OnClickedDBEngineSelector}/>
        <label htmlFor="selectorMySQL">
          <div id="MariaDBContainer">
            <img src={logoMariaDB} alt="logo MariaDB"/>
          </div>
        </label>
        <input type="radio" id="selectorMongoDB" name="DBEngine" value="MongoDB" onClick={OnClickedDBEngineSelector}/>
        <label htmlFor="selectorMongoDB">
          <div id="MongoDBContainer">
            <img src={logoMongoDB} alt="logo MongoDB"/>
          </div>
        </label>
      </div>
      <div id="selectors">
        <input type="radio" id="selectorProduct" name="searchType" value="product" defaultChecked onClick={OnClickedSelector}/>
        <label htmlFor="selectorProduct">Artículo</label>
        <input type="radio" id="selectorManufacturer" name="searchType" value="manufacturer" onClick={OnClickedSelector}/>
        <label htmlFor="selectorManufacturer">Fabricante</label>
      </div>
      <input  type="text" id="seekerText" name="seekerText" ref={seekerText}
              placeholder="Busque por producto o fabricante" tabIndex="1" autoFocus={true}
              onChange = {OnChangeInput}/>
      <Button variant="primary" onClick={OnOk}>Ok</Button>
      {showHints ? InsertList() : <></>}
    </div>
  );
}

export default Seeker;
