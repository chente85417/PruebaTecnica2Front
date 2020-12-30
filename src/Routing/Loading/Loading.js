
//--------------------COMPONENTS--------------------//
import Spinner from 'react-bootstrap/Spinner';
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './Loading.scss';

const Loading = () => {
    return (
        <div id = "loadingContainer">
            <div id="spinner">
                <Spinner animation="border" />
            </div>
        </div>
    );
}

export default Loading;
