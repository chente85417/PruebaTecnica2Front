
//--------------------COMPONENTS--------------------//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Footer.scss';

const Footer = ({start, callback}) => {

  const GetPrevious = () => {
    console.log("pulsado hacia atrás");
    if (start > 1)
    {
      callback(start - 10);
    }//if      
  };//GetPrevious

  const GetNext = () => {
    console.log("pulsado hacia delante",start + 10);
    callback(start + 10);
  };//GetNext

  return (
    <div className="Footer">
      <div className="icon" onClick = {GetPrevious}>
        <FontAwesomeIcon icon={faArrowLeft} size = "2x" />
      </div>
      <p>{start + 1} - {start + 10}</p>
      <div className="icon" onClick = {GetNext}>
        <FontAwesomeIcon icon={faArrowRight} size = "2x" />
      </div>
    </div>
  );
}

export default Footer;
