// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Beers from "./store/components/Beers.jsx";
import Home from "./store/components/Home.jsx";
import DetailBeer from "./store/components/DetailBeer.jsx";
import Admin from "./store/components/Admin.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path = '/beers' component = {Home}></Route>
          <Route path= "/user" component= {Admin}/>
          <Route exact path = '/beers/:id' render = {({match}) => <DetailBeer props={match.params.id}/>}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
