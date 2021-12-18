// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Beers from "./store/components/Beers.jsx";
import Home from "./components/Home";
import DetailBeer from "./components/DetailBeer";
import CreateCategory from "./components/Admin/CreateCategory";
import LandingPage from './components/landingPage';
import CreateBeer from "./components/Admin/CreateBeer";
// import Cart from './components/Cart/Cart.jsx';
import Carting from './components/Cart/Carting.jsx';
import CreateUser from './components/Users/CreateUser';
import Admin from './components/Admin/Admin';
import EditBeer from './components/Admin/EditBeer';
import EditOrder from './components/Admin/EditOrder';
import EditOrderFull from './components/Admin/EditOrderFull'
import UserList from './components/Admin/UserList';
//import PasswordReset from './components/Users/CreateUser'//
import Login from './components/Login/Login.jsx'
import Mercadopago from './components/mercadopago/Mercadopago'
import Orders from './components/Cart/Orders.jsx';
import UserCard from './components/UserCard/UserCard.jsx';
import NavBar from './components/NavBar';


function App() {
  return (
    <BrowserRouter>
      
        <Switch>
          <Route exact path = '/' component = {LandingPage} />
          <Route path="/" >
          <NavBar />
          <Route exact path = '/cart' component = {Carting} />
          <Route exact path = '/beers' component = {Home} />
          <Route exact path = '/admin' component = {Admin} />
          <Route exact path = '/admin/createCa' component = {CreateCategory} />
          <Route exact path = '/admin/createBeer' component = {CreateBeer} />
          <Route exact path = '/admin/editBeer/:id' render = {({match}) => <EditBeer props={match.params.id}/>} />
          <Route exact path = '/admin/orderList'  component={EditOrder} />
          <Route exact path = '/admin/userList'  component={UserList} />
          <Route exact path = '/admin/editOrderFull/:id' render = {({match}) => <EditOrderFull props={match.params.id}/>} />                    
          <Route exact path = '/beers/:id' render = {({match}) => <DetailBeer props={match.params.id}/>} />
          <Route exact path = '/users' component = {CreateUser} />
          <Route exact path = '/users/google' component = {Login} />
          <Route path='/createuser' render={() => <CreateUser />}  />
          <Route exact path ="/mercadopago" component = {Mercadopago} />
          <Route exact path = '/order' component = {Orders} />
          <Route exact path = '/me' component = {UserCard} />
          </Route>
        </Switch>
      
    </BrowserRouter>
  );
}

export default App;
