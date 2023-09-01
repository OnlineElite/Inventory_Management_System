
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
  
const userEmail =(email)=>{
    return{
        type: 'USER_EMAIL',
        payload : email
    }
}

const isAdmin =(value)=>{

    return{
        type: 'IS_ADMIN',
        payload: value
    }
}

const userFallName =(faullName)=>{

    return{
        type: 'USER_FULL_NAME',
        payload: faullName
    }
}

const handellError = (message)=>{
    return{
        type : 'ERROR_MESSAGE',
        payload: message
    }
}

const handelProducts = (products)=>{
    return {
        type : 'PRODUCTS',
        payload : products
    }
}

const handelCategories = (category)=>{
    return {
        type : 'CATEGORIES',
        payload : category
    }
}
const handelBrands = (brand)=>{
    return {
        type : 'BRANDS',
        payload : brand
    }
}

const addProductResponse = (message)=>{
    return {
        type : 'ADD_PRODUCT',
        payload : message
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
        //console.log('data register receved', datarecived )
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
        //console.log('data login recived', datarecived )
        dispatch(setToken(datarecived.token))
        dispatch(isAdmin(datarecived.isAdmin))
        dispatch(setAuthenticated(true))
        dispatch(handellError(datarecived.error))
        dispatch(userEmail(datarecived.userEmail)) //to delete the user from login table
        dispatch(userFallName(datarecived.fullName))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const LogOutThunk = (useremail) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_URL; 
        const url = `${baseURL}/logout`;
        const data = {email : useremail}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data loged out recived', datarecived.message )
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const bringProductsThunk = () => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/products`;
        
        const response = await fetch(url);
        const datarecived = await response.json();
        
        dispatch(handelProducts(datarecived.products))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const bringCategoriesThunk = () => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/categories`;
        
        const response = await fetch(url);
        const datarecived = await response.json();
        //console.log('categories data', datarecived.categories)
        dispatch(handelCategories(datarecived.categories))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const bringBrandsThunk = () => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/brands`;
        
        const response = await fetch(url);
        const datarecived = await response.json();
        //console.log('brands data', datarecived.brands)
        dispatch(handelBrands(datarecived.brands))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const addProductThunk = (product) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/addProduct`;
        const data = {product : product}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data add item recived', datarecived.message )
        dispatch(addProductResponse(datarecived.message))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

export {
    registerThunk, 
    loginThunk, 
    LogOutThunk, 
    logout, 
    bringProductsThunk,
    bringCategoriesThunk, 
    bringBrandsThunk,
    addProductThunk
}

