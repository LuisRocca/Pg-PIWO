// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Beers from "./store/components/Beers.jsx";
import Home from "./store/components/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path = '/beers' component = {Home}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
