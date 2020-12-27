import React, {useEffect} from 'react';
//--------------------COMPONENTS--------------------//
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Table.scss';

const Table = () => {

  useEffect(() => {
    console.log(`${process.env.REACT_APP_URLBACK}requestArticles/orderColumn/NOMBRE/orderDirection/ASC/startRow/0/endRow/9`);
    fetch(`${process.env.REACT_APP_URLBACK}requestArticles/orderColumn/NOMBRE/orderDirection/ASC/startRow/0/endRow/9`)
    .then(res => res.json()).then(data => {
      console.log(data);
      if (!data.ret)
      {
          //INFORMAR DE QUE NO SE HA PODIDO COMPLETAR LA CONSULTA
          //this.messageBoxCfg = {title : "Error", body : data.caption};
          //this.setState({showMessage : true});
      }//if
      else
      {
          //PINTAR LOS RESULTADOS
      }//else
  });        
  }, []);

  return (
    <div className="Table">
      <Header />
      <Footer />
    </div>
  );
}

export default Table;
