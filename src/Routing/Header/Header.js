import React, { useState, useContext } from 'react';
import TableContext from '../../Contexts/TableContext.js';
//--------------------COMPONENTS--------------------//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Header.scss';

//////////////////////////////////////////////////////////////////////////////
//                                 HEADER                                   //
//Table header component                                                    //
//Handles the ordering and sorting capabilities based on user´s selections  //
//Each field column has button icons of sorting up and down                 //
//User interactions are packed and sent to Home component to recreate the   //
//query and generate a new data set to be rendered                          //
//////////////////////////////////////////////////////////////////////////////
const Header = () => {
  //HOOKS
  const [isNameAsc, setIsNameAsc] = useState(true); //Flag to set if current display for name field is ascendent
  const [isRelevanceAsc, setIsRelevanceAsc] = useState(true); //Flag to set if current display for relevance field is ascendent
  const [isPriceAsc, setIsPriceAsc] = useState(true); //Flag to set if current display for name price is ascendent
  const callback = useContext(TableContext);  //Context to receive the callback to notify the Home component
  
  ////////////////////////////////////////////////////////////////////////////////
  //Handler of on click event on header´s button icons                          //
  //                                                                            //
  //This function is fired every time the user clicks one of the sorting button //
  //icons and determines the sorting field and direction (ASC|DESC)             // 
  //                                                                            //
  //Input: event | type: object                                                 //
  //Output: void                                                                //
  ////////////////////////////////////////////////////////////////////////////////
  const FieldOrder = (event) => {
    let directionVal = undefined;
    switch (event.currentTarget.getAttribute("data-field"))
    {
      case "NOMBRE":
        {
          if (isNameAsc)
          {
            //Request ascendent order for NOMBRE
            directionVal = "ASC";
            //Toggle icon
            setIsNameAsc(false);
          }//if
          else
          {
            //Request descendent order for NOMBRE
            directionVal = "DESC";
            //Toggle icon
            setIsNameAsc(true);
          }//else
          break;
        }
        case "RELEVANCIA":
        {
          if (isRelevanceAsc)
          {
            //Request ascendent order for RELEVANCIA
            directionVal = "ASC";
            //Toggle icon
            setIsRelevanceAsc(false);
          }//if
          else
          {
            //Request descendent order for RELEVANCIA
            directionVal = "DESC";
            //Toggle icon
            setIsRelevanceAsc(true);
          }//else
          break;
        }
        case "PRECIO":
        {
          if (isPriceAsc)
          {
            //Request ascendent order for PRICE
            directionVal = "ASC";
            //Toggle icon
            setIsPriceAsc(false);
          }//if
          else
          {
            //Request descendent order for PRICE
            directionVal = "DESC";
            //Toggle icon
            setIsPriceAsc(true);
          }//else
          break;
        }
        default:
    }//switch
    //Use the callback from the context to pass all data to Home component
    callback({  field : event.currentTarget.getAttribute("data-field"), //selected sorting field
                direction : directionVal, //selected sorting direction
                range : undefined});  //pagination range (not used in Header)
  };//FieldOrder

  return (
    <div className="headerContainer">
      <div key="ID" className="fieldContainer">
        <p className="title">ID</p>
      </div>
      <div key="NOMBRE" className="fieldContainer">
        <p className="title">NOMBRE</p>
        <div key="NOMBRE" data-field="NOMBRE" className="icon" onClick = {FieldOrder}>
          <FontAwesomeIcon key="nombre-icon" icon={isNameAsc ? faAngleDown : faAngleUp} size = "2x" />
        </div>
      </div>
      <div key="RELEVANCIA" className="fieldContainer">
        <p className="title">RELEVANCIA</p>
        <div key="RELEVANCIA" data-field="RELEVANCIA" className="icon" onClick = {FieldOrder}>
          <FontAwesomeIcon key="relevancia-icon" icon={isRelevanceAsc ? faAngleDown : faAngleUp} size = "2x" />
        </div>
      </div>
      <div key="PRECIO" className="fieldContainer">
        <p className="title">PRECIO</p>
        <div key="PRECIO" data-field="PRECIO" className="icon" onClick = {FieldOrder}>
          <FontAwesomeIcon key="precio-icon" icon={isPriceAsc ? faAngleDown : faAngleUp} size = "2x" />
        </div>
      </div>
    </div>
  );
}

export default Header;
