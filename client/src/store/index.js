import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {userReducer} from '../reducers/IMSReducer'

const initialState = {
  RegisterRespond: null,
  RegisterError: null,
  error: null,
  isAdmin: localStorage.getItem("isAdmin") || false,
  isAuthenticated: !!localStorage.getItem("token"), //true or false (if local storage empty or not)
  token: localStorage.getItem("token") || "",
  userEmail: null,
  userfullName: localStorage.getItem("username")
    ? localStorage.getItem("username").split(",")
    : "",
  products: [],
  categories: [],
  brands: [],
  addMsg: null,
  deleteMsg: null,
  updateMsg: null,
  sendOrderMsg: null,
  errorOrderMsg: null,
  users: [],
  incart: [],
  infavories: [],
  states: [],
  isLoading: true,
  orders: [],
  status: [],
  orderProducts: [],
};

export  const store = createStore(userReducer, initialState, applyMiddleware(thunk))


