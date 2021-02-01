
//--------------------COMPONENTS--------------------//
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Manufacturer.scss';

//////////////////////////////////////////////////////////////////////////
//                             MANUFACTURER                             //
//Manufacturer´s data row component                                     //
//It is just a rendering component that receives the data as a data set // 
//via props and renders as an adjacent row just below the product one   //
//////////////////////////////////////////////////////////////////////////
const Manufacturer = ({data}) => {
  return (
    <div className="manufacturerContainer">
      <div id="header">
        <p>ID</p>
        <p>NOMBRE</p>
        <p>CIF</p>
        <p>DIRECCION</p>
      </div>
      <div id="fabData">
        <p>{data[0].FABID}</p>
        <p>{data[0].NOMBRE}</p>
        <p>{data[0].CIF}</p>
        <p>{data[0].DIRECCION}</p>
      </div>
    </div>
  );
}

export default Manufacturer;