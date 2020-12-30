//--------------------COMPONENTS--------------------//
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './InfoPage.scss';

const InfoPage = (props) => {
    return (
        <div id = "infoPageContainer">
            <p id="p1">{props.text1}</p>
            <p id="p2">{props.text2}</p>
            <p id="p3">{props.text3}</p>
        </div>
    );
};

export default InfoPage;
