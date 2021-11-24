// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Beers from "./store/components/Beers.jsx";
import Home from "./store/components/Home.jsx";
import DetailBeer from './store/components/DetailBeer';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path = '/beers' component = {Home}></Route>
          <Route exact path = '/beers/:id' component = {DetailBeer}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
