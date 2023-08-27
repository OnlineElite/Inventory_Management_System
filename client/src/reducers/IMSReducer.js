
const userReducer = (state, action)=>{
    switch(action.type){
        case 'REGISTER_USER':
            return {...state, RegisterRespond : action.payload}

        case "SET_TOKEN":
            return {...state, token : action.payload}

        case "SET_AUTHENTICATED":
            return {...state, isAuthenticated: action.payload };

        case 'ERROR_MESSAGE':
            return {...state, error : action.payload}

        case 'AUTHONTICATION':
            return {...state, admission : action.payload}

        case 'IS_ADMIN':
            return {...state, isAdmin : action.payload}

        default:
            return state;
    }
}

export  {userReducer}