import React, { useState, useRef } from 'react';
//--------------------COMPONENTS--------------------//
import Manufacturer from "../Manufacturer/Manufacturer.js";
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Item.scss';

const Item = ({data}) => {

  const [showManufacturer, setShowManufacturer] = useState(false);
  const manufacturerData = useRef(undefined);

  const OnSelectItem = () => {
    if (showManufacturer)
    {
      setShowManufacturer(false);
    }//if
    else
    {
      fetch(`${process.env.REACT_APP_URLBACK}requestManufacturer/${data.ARTID}`)
      .then(res => res.json()).then(data => {
        if (!data.ret)
        {
            //INFORMAR DE QUE NO SE HA PODIDO COMPLETAR LA CONSULTA
            //this.messageBoxCfg = {title : "Error", body : data.caption};
            //this.setState({showMessage : true});
        }//if
        else
        {
          manufacturerData.current = data.caption;
          setShowManufacturer(true);
        }//else
      });  
    }//else
  };//OnSelectItem

  return (
    <div className="itemContainer" onClick={OnSelectItem}>
      <p className="artID">{data.ARTID}</p>
      <p className="nombre">{data.NOMBRE}</p>
      <p className="relevancia">{data.RELEVANCIA}</p>
      <p className="precio">{data.PRECIO}€</p>
      {showManufacturer ? <Manufacturer data = {manufacturerData.current}/> : <></>}
    </div>
  );
}

export default Item;
