
//--------------------COMPONENTS--------------------//
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Item from '../Item/Item.js';
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Table.scss';

////////////////////////////////////////////////////////////////////////////////
//                                   TABLE                                    //
//Component to render the results                                             //
//Presents all the rows with all the products retrieved from the DB based     //
//based on user´s inputs                                                      //
//It is a render-only component without any logic, only recieves the data set //
//to render                                                                   //     
//Contains:                                                                   //
//  Header: component to manage the sorting and direction (ASC|DESC)          //
//  Set of Item components as rows of data                                    //
//  Footer: component to manage the pagination                                //
////////////////////////////////////////////////////////////////////////////////
const Table = ({dataSet}) => {
  ////////////////////////////////////////////////////////////////
  //Function to render all elements of the data set             //
  //                                                            //
  //It traverses the data set sent from the Home component and  //
  //creates as much Item components as presented                //
  //                                                            //
  //Input: void                                                 //
  //Output: JSX node                                            //
  ////////////////////////////////////////////////////////////////
  const InsertData = () => {
    if (dataSet !== null)
    {
      //In case of existing data traverse and insert all the rows as Item components
      //Each Item is keyd with the element ID and is passed all inner data as a prop json
      return (
        <>
            {dataSet.map(item => {
              return (
                <>
                  <Item key = {item.ARTID} data = {item} />
                </>
              );    
            })}
        </>
      );
    }//if
  };//InsertData

  return (
    <div className="Table">
      <Header/>
      {InsertData()}
      <Footer/>
    </div>
  );
}

export default Table;
