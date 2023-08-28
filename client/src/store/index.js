import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {userReducer} from '../reducers/IMSReducer'

const initialState = {
    RegisterRespond : null,
    error : null,
    isAdmin : true,
    isAuthenticated: !!localStorage.getItem("token"),  //true or false (if local storage empty or not)
    token: localStorage.getItem("token") || "",
    userEmail :null,
    userfullName : null
}

export  const store = createStore(userReducer, initialState, applyMiddleware(thunk))


