
//--------------------COMPONENTS--------------------//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Header.scss';

const Header = ({ callback }) => {
  
  const FieldOrder = (event) => {
    callback(event.currentTarget.getAttribute("data-field"), event.currentTarget.getAttribute("data-direction"));
  };//FieldOrder

  return (
    <div className="headerContainer">
      <p>ID</p>
      <div key="NOMBRE" className="fieldContainer">
        <p className="title">NOMBRE</p>
        <div key="ASC" data-field="NOMBRE" data-direction="ASC" className="icon" onClick = {FieldOrder}>
          <FontAwesomeIcon icon={faAngleUp} size = "2x" />
        </div>
        <div key="DESC" data-field="NOMBRE" data-direction="DESC" className="icon" onClick = {FieldOrder}>
            <FontAwesomeIcon icon={faAngleDown} size = "2x" />
        </div>
      </div>
      <div key="RELEVANCIA" className="fieldContainer">
        <p className="title">RELEVANCIA</p>
        <div key="ASC" data-field="RELEVANCIA" data-direction="ASC" className="icon" onClick = {FieldOrder}>
          <FontAwesomeIcon icon={faAngleUp} size = "2x" />
        </div>
        <div key="DESC" data-field="RELEVANCIA" data-direction="DESC" className="icon" onClick = {FieldOrder}>
            <FontAwesomeIcon icon={faAngleDown} size = "2x" />
        </div>
      </div>
      <div key="PRECIO" className="fieldContainer">
        <p className="title">PRECIO</p>
        <div key="ASC" data-field="PRECIO" data-direction="ASC" className="icon" onClick = {FieldOrder}>
          <FontAwesomeIcon icon={faAngleUp} size = "2x" />
        </div>
        <div key="DESC" data-field="PRECIO" data-direction="DESC" className="icon" onClick = {FieldOrder}>
            <FontAwesomeIcon icon={faAngleDown} size = "2x" />
        </div>
      </div>
    </div>
  );
}

export default Header;
