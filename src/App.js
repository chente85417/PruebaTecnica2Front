import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
//--------------------COMPONENTS--------------------//
import Logo from "./Routing/Logo/Logo.js";
import Home from "./Routing/Home/Home.js";
//----------------------ASSETS----------------------//
//----------------------STYLES----------------------//
import './App.scss';

const App = () => {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Logo /> 
            </Route>
            <Route path="/home">
              {<Home />}
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
