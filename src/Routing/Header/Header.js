import React, { useContext } from 'react';
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
    //Use the callback from the context to pass all data to Home component
    callback({  field : event.currentTarget.getAttribute("data-field"), //selected sorting field
                direction : event.currentTarget.getAttribute("data-direction"), //selected sorting direction
                range : undefined});  //pagination range (not used in Header)
  };//FieldOrder

  return (
    <div className="headerContainer">
      <div key="ID" className="fieldContainer">
        <p className="title">ID</p>
      </div>
      <div key="NOMBRE" className="fieldContainer">
        <p className="title">NOMBRE</p>
        <div key="ASC" data-field="NOMBRE" data-direction="ASC" className="icon" onClick = {FieldOrder}>
          <FontAwesomeIcon key="nombre-asc" icon={faAngleUp} size = "2x" />
        </div>
        <div key="DESC" data-field="NOMBRE" data-direction="DESC" className="icon" onClick = {FieldOrder}>
            <FontAwesomeIcon key="nombre-desc" icon={faAngleDown} size = "2x" />
        </div>
      </div>
      <div key="RELEVANCIA" className="fieldContainer">
        <p className="title">RELEVANCIA</p>
        <div key="ASC" data-field="RELEVANCIA" data-direction="ASC" className="icon" onClick = {FieldOrder}>
          <FontAwesomeIcon key="relevancia-asc" icon={faAngleUp} size = "2x" />
        </div>
        <div key="DESC" data-field="RELEVANCIA" data-direction="DESC" className="icon" onClick = {FieldOrder}>
            <FontAwesomeIcon key="relevancia-desc" icon={faAngleDown} size = "2x" />
        </div>
      </div>
      <div key="PRECIO" className="fieldContainer">
        <p className="title">PRECIO</p>
        <div key="ASC" data-field="PRECIO" data-direction="ASC" className="icon" onClick = {FieldOrder}>
          <FontAwesomeIcon key="precio-asc" icon={faAngleUp} size = "2x" />
        </div>
        <div key="DESC" data-field="PRECIO" data-direction="DESC" className="icon" onClick = {FieldOrder}>
            <FontAwesomeIcon key="precio-desc"  icon={faAngleDown} size = "2x" />
        </div>
      </div>
    </div>
  );
}

export default Header;
