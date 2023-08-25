
const userReducer = (state, action)=>{
    switch(action.type){
        case 'REGISTER_USER':
            return {...state, RegisterRespond : action.payload}

        case 'LOGIN_USER':
            return {...state, LoginRespond : action.payload}

        case 'ERROR_MESSAGE':
            return {...state, error : action.payload}

        case 'AUTHONTIFICATION':
            return {...state, admission : action.payload}

        case 'USER_EMAIL':
            return {...state, userEmail : action.payload}

        case 'IS_ADMIN':
            return {...state, isAdmin : action.payload}

        default:
            return state;
    }
}

export  {userReducer}