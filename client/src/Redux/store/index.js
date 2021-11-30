import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk"; //maneja todas las acciones que seas asincronicas, 
import { combineReducers } from "redux";
import rootReducer from "../reducer/index.js";
import reducerCart from "../reducer/cartReducer.js";

// const reducer = combineReducers({reducer1: rootReducer, reducer2: reducerCart})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));