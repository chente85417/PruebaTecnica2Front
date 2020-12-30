import React, {useState, useEffect, useRef} from 'react';
//--------------------COMPONENTS--------------------//
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Loading from "../Loading/Loading.js";
import InfoPage from "../InfoPage/InfoPage.js";
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Table.scss';
import Item from '../Item/Item.js';

const Table = () => {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [endpoint, setEndPoint] = useState("");

  const currentData = useRef(undefined);
  const currentStart = useRef(undefined);

  useEffect(() => {
    const searchURL = `${process.env.REACT_APP_URLBACK}requestArticles/orderColumn/NOMBRE/orderDirection/ASC/startRow/0/endRow/10`;

    currentStart.current = 0;
    setEndPoint(searchURL);
    setDataAvailable(false);
    
    fetch(searchURL)
    .then(res => res.json()).then(data => {
      if (!data.ret)
      {
          //INFORMAR DE QUE NO SE HA PODIDO COMPLETAR LA CONSULTA
          //this.messageBoxCfg = {title : "Error", body : data.caption};
          //this.setState({showMessage : true});
      }//if
      else
      {
        currentData.current = data.caption;
        setDataAvailable(true);
      }//else
  });        
  }, []);

  const SetRange = (range) => {
    let strChunks = endpoint.split('/');
    let strEndPoint = `${strChunks[0]}//${strChunks[2]}/${strChunks[3]}/${strChunks[4]}/${strChunks[5]}/${strChunks[6]}/${strChunks[7]}/${strChunks[8]}/${range}/${strChunks[10]}/${strChunks[11]}`;

    currentStart.current = range;
    setEndPoint(strEndPoint);
    setDataAvailable(false);
    fetch(strEndPoint)
    .then(res => res.json()).then(data => {
      if (!data.ret)
      {
          //INFORMAR DE QUE NO SE HA PODIDO COMPLETAR LA CONSULTA
          //this.messageBoxCfg = {title : "Error", body : data.caption};
          //this.setState({showMessage : true});
      }//if
      else
      {
        currentData.current = data.caption;
        setDataAvailable(true);
      }//else
    });  
  };//SetRange

  const SetFieldAndOrder = (field, order) => {
    let strChunks = endpoint.split('/');
    let strEndPoint = `${strChunks[0]}//${strChunks[2]}/${strChunks[3]}/${strChunks[4]}/${field}/${strChunks[6]}/${order}/${strChunks[8]}/0/${strChunks[10]}/${strChunks[11]}`;

    currentStart.current = 0;
    setEndPoint(strEndPoint);
    setDataAvailable(false);
    fetch(strEndPoint)
    .then(res => res.json()).then(data => {
      if (!data.ret)
      {
          //INFORMAR DE QUE NO SE HA PODIDO COMPLETAR LA CONSULTA
          //this.messageBoxCfg = {title : "Error", body : data.caption};
          //this.setState({showMessage : true});
      }//if
      else
      {
        currentData.current = data.caption;
        setDataAvailable(true);
      }//else
    });  
  };//SetFieldAndOrder

  const InsertTable = () => {
    if (currentData.current !== undefined)
    {
      return (
        <>
            {currentData.current.map(item => {
              return (
                <>
                  <Item key = {item.ARTID} data = {item} />
                </>
              );    
            })}
        </>
      );
    }//if
    else
    {
      return (
        <InfoPage text1 = "No se han podido obtener datos de la BD" />
      );
    }//else
  };//InsertTable

  return (
    <div className="Table">
      <Header callback = {SetFieldAndOrder}/>
      {dataAvailable ? InsertTable() : <Loading />}
      <Footer start = {currentStart.current} callback = {SetRange}/>
    </div>
  );
}

export default Table;
