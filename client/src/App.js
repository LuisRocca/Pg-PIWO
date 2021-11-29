// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Beers from "./store/components/Beers.jsx";
import Home from "./components/Home";
import DetailBeer from "./components/DetailBeer";
import Admin from "./components/Admin";
import LandingPage from './components/landingPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path = '/' component = {LandingPage}></Route>
          <Route exact path = '/beers' component = {Home}></Route>
          <Route exact path = '/admin' component = {Admin}></Route>
          <Route exact path = '/beers/:id' render = {({match}) => <DetailBeer props={match.params.id}/>}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
