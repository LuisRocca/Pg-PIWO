// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Beers from "./store/components/Beers.jsx";
import Home from "./components/Home";
import DetailBeer from "./components/DetailBeer";
import LandingPage from './components/landingPage';
// import Cart from './components/Cart/Cart.jsx';
import Order from './components/Cart/Order.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path = '/' component = {LandingPage}></Route>
          <Route exact path = '/order' component = {Order}></Route>
          <Route exact path = '/beers' component = {Home}></Route>
          <Route exact path = '/beers/:id' render = {({match}) => <DetailBeer props={match.params.id}/>}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
