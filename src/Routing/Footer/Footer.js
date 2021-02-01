import React, { useContext } from 'react';
import TableContext from '../../Contexts/TableContext.js';
import FooterContext from '../../Contexts/FooterContext.js';
//--------------------COMPONENTS--------------------//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Footer.scss';

////////////////////////////////////////////////////////////////////
//                              FOOTER                            //
//Table footer component                                          //
//Handles the pagination capabilities based on user´s selections  //
//Has a pair of button icons for forward and backward pagination  //
//User interactions are packed and sent to Home component to      //
//recreate the query and generate a new data set to be rendered   //
////////////////////////////////////////////////////////////////////
const Footer = () => {
  //HOOKS
  const callback      = useContext(TableContext);   //Context to receive the callback to notify the Home component
  const initialRange  = useContext(FooterContext);  //Context to receive current pagination range

  ////////////////////////////////////////////////////////////////////
  //Handler of on click event on go to previous page button icon    //
  //                                                                //
  //This function is fired every time the user clicks on the        //
  //previous page button icon and sets the data to notify the Home  //
  //component to perform a backward pagination if possible          // 
  //                                                                //
  //Input: void                                                     //
  //Output: void                                                    //
  ////////////////////////////////////////////////////////////////////
  const GetPrevious = () => {
    //Use the callback from the context to pass all data to Home component
    callback({  field : undefined,      //sorting field (not used in Footer)
                direction : undefined,  //sorting direction (not used in Footer)
                range : -10});          //backward range pagination required
  };//GetPrevious

  ////////////////////////////////////////////////////////////////
  //Handler of on click event on go to next page button icon    //
  //                                                            //
  //This function is fired every time the user clicks on the    //
  //next page button icon and sets the data to notify the Home  //
  //component to perform a forward pagination                   // 
  //                                                            //
  //Input: void                                                 //
  //Output: void                                                //
  ////////////////////////////////////////////////////////////////
  const GetNext = () => {
    callback({  field : undefined,      //sorting field (not used in Footer)
                direction : undefined,  //sorting direction (not used in Footer)
                range : 10});           //forward range pagination required
  };//GetNext

  return (
    <div className="Footer">
      <div className="icon" onClick = {GetPrevious}>
        <FontAwesomeIcon key="previous" icon={faArrowLeft} size = "2x" />
      </div>
      <p>{initialRange + 1} - {initialRange + 10}</p>
      <div className="icon" onClick = {GetNext}>
        <FontAwesomeIcon key="next" icon={faArrowRight} size = "2x" />
      </div>
    </div>
  );
}

export default Footer;
