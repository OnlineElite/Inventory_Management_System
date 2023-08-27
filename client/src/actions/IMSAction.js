
const registerUser = (answer)=>{

    return{
        type : 'REGISTER_USER',
        payload : answer
    }
}

const setAuthenticated = (isAuthenticated) =>{
    return {
        type: "SET_AUTHENTICATED",
        payload: isAuthenticated
    }
}
  
const setToken = (token) =>{
    return {
        type: "SET_TOKEN",
        payload: token
    }
}
  
const logout = () => {
    return {
        type: "LOGOUT"
    }
}
  


const isAdmin =(value)=>{

    return{
        type: 'IS_ADMIN',
        payload: value
    }
}

const handellError = (message)=>{
    return{
        type : 'ERROR_MESSAGE',
        payload: message
    }
}

const registerThunk = (user) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_URL; 
        const url = `${baseURL}/register`;
        const data = {...user}
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data register receved', datarecived )
        dispatch(registerUser(datarecived.message))
        dispatch(handellError(datarecived.error))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const loginThunk = (user) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_URL; 
        const url = `${baseURL}/login`;
        const data = {...user}
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data login recived', datarecived )
        dispatch(setToken(datarecived.token))
        dispatch(isAdmin(datarecived.isAdmin))
        dispatch(setAuthenticated(true))
        dispatch(handellError(datarecived.error))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const LogOutThunk = (useremail) => async (dispatch)=>{
    try{
        const url = 'http://localhost:3002/logout';    //attention port 3002
    
        const data = {email : useremail}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data loged out recived', datarecived )
        //dispatch(loginUser(datarecived.message))
        //dispatch(authontification(datarecived.admission))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

export {registerThunk, loginThunk, LogOutThunk}