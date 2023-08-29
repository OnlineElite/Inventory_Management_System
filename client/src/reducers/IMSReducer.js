
const userReducer = (state, action)=>{
    switch(action.type){
        case 'REGISTER_USER':
            return {...state, RegisterRespond : action.payload}

        case "SET_TOKEN":
            localStorage.setItem("token", action.payload)
            return {...state, token : action.payload}

        case "SET_AUTHENTICATED":
            return {...state, isAuthenticated: action.payload };

        case 'ERROR_MESSAGE':
            return {...state, error : action.payload}

        case 'USER_EMAIL':
            return {...state, userEmail : action.payload}

        case 'USER_FULL_NAME':
            localStorage.setItem("username", action.payload)
            return {...state, userfullName : action.payload}

        case 'AUTHONTICATION':
            return {...state, admission : action.payload}

        case 'IS_ADMIN':
            return {...state, isAdmin : action.payload}

        case "LOGOUT":
            localStorage.removeItem("username")
            localStorage.removeItem("token");
            return {...state, isAuthenticated: false, token: "", userfullName: "" };

        default:
            return state;
    }
}

export  {userReducer}