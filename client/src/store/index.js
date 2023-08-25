import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {userReducer} from '../reducers/IMSReducer'

const initialState = {
    RegisterRespond : null,
    LoginRespond : null,
    error : null,
    admission : false,
    userEmail : null,
    isAdmin : false
}

export  const store = createStore(userReducer, initialState, applyMiddleware(thunk))


