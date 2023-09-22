
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

const handelIncart = (products)=>{
    return {
        type : 'INCART',
        payload : products
    }
}
const handelInfavories = (products)=>{
    return {
        type : 'INFAVORIES',
        payload : products
    }
}

const addMessage = (message)=>{
    return {
      type: "ADD_MESSAGE",
      payload: message,
    };
}

const addProduct = (message, product)=>{
    return {
        type : 'ADD_PRODUCT',
        payload : {message, product}
    }
}

const deleteMessage = (message, productRef) => {
  return {
    type: "SHOW_MESSAGE",
    payload: { message, productRef },
  };
};

const updateMessage = (message)=>{
    return {
      type: "UPDATE_MESSAGE",
      payload: message,
    };
}

const updateProduct = (product) => {
  return {
    type: "UPDATE_PRODUCT",
    payload: product,
  };
};

const deleteProduct = (message, product_ref) => {
  return {
    type: "DELETE_PRODUCT",
    payload: { message, product_ref },
  };
};

const deleteCategory = (message, categName) => {
    return {
      type: "DELETE_CATEGORY",
      payload: { message, categName },
    };
};

const deleteBrand = (message, brandName) => {
    return {
      type: "DELETE_BRAND",
      payload: { message, brandName },
    };
};

const deleteUser = (message, condition) => {
    return {
      type: "DELETE_USER",
      payload: { message, condition },
    };
};

const updateCategory = (message, category) => {
    return {
      type: "UPDATE_CATEGORY",
      payload: { message, category },
    };
};

const handelUsers = (user)=>{
    return {
        type : 'USERS',
        payload : user
    }
}

const handelStates = (states)=>{
    return {
        type : 'STATES',
        payload : states
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


        if(response.ok){
            dispatch(setToken(datarecived.token));
            dispatch(isAdmin(datarecived.isAdmin));
            dispatch(setAuthenticated(true));
            dispatch(handellError(datarecived.error));
            dispatch(userEmail(datarecived.userEmail)); //to delete the user from login table
            dispatch(userFallName(datarecived.fullName));
        }else{

            dispatch(setAuthenticated(false));
            dispatch(handellError(datarecived.error));
        }
        
    }catch(err){
        console.error("catch error", err)
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

        for (var pair of product.entries()) {
        console.log(pair[0] + ", " + pair[1]);
        }

        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/addProduct`;
        //const data = { product }
    
        /*const headers = {
          "Content-Type": `multipart/form-data;`,
        };*/

        const response = await fetch(url, {
          method: "POST",
          //headers,
          body: product,
        });

        const datarecived = await response.json();

        console.log('data add item recived', datarecived.message )

        product.append("product_image", datarecived.product.image);

        const updatedProductJson = formDataToJson(product);
        dispatch(addProduct(datarecived.message, updatedProductJson));
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const deleteProductThunk = (productRef) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/deleteProduct`;
        const data = {product_ref : productRef}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data delete item recived', datarecived.message )
        dispatch(deleteProduct(datarecived.message, productRef));
        //dispatch(deleteMessage(datarecived.message, productRef));
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const updateProductThunk = (product) => async (dispatch)=>{
    try{
        for (var pair of product.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/updateProduct`;
        /*const headers = {
            "Content-Type": `multipart/form-data;`,
        };*/
        const response = await fetch(url, {
            method: "POST",
            //headers,
            body: product,
        });
    
        const datarecived = await response.json();
        if (datarecived.message === "Product updated successfully"){
            dispatch(updateMessage(datarecived.message));

            const updatedProductJson = formDataToJson(product);
            dispatch(updateProduct(updatedProductJson));
        }
        console.log("data update item recived", datarecived.message);
  
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const bringUsersThunk = () => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_USER_URL; 
        const url = `${baseURL}/getUsers`;
        
        const response = await fetch(url);
        const datarecived = await response.json();
        
        dispatch(handelUsers(datarecived.Users))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const addCategoryThunk = (category) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/addCategory`;
        const data = {category : category}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data add category recived', datarecived.message )
        dispatch(addMessage(datarecived.message))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const addBrandThunk = (brand) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/addBrand`;
        const data = {brand : brand}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data add brand recived', datarecived.message )
        dispatch(addMessage(datarecived.message))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const updateCategoryThunk = (category) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/updateCategory`;
        const data = {category : category}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        if(response.status === 201){
            const datarecived = await response.json();
            dispatch(updateMessage(datarecived.message))
            dispatch(updateCategory(datarecived.message, category))
            //console.log('data update category recived', datarecived.message )
        }
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const updateBrandThunk = (brand) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/updateBrand`;
        const data = {brand : brand}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data update category recived', datarecived.message )
        dispatch(updateMessage(datarecived.message))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const deleteCategoryThunk = (categName) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/deleteCategory`;
        const data = {category_name : categName}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        if(datarecived.message === "Category deleted successfully"){
            console.log('data delete category recived', datarecived.message )
            dispatch(deleteCategory(datarecived.message, categName));
        }
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const deleteBrandThunk = (brandName) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/deleteBrand`;
        const data = {brand_name : brandName}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data delete brand recived', datarecived.message )
        dispatch(deleteBrand(datarecived.message, brandName));
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const updateUserThunk = (Userinfo) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_USER_URL; 
        const url = `${baseURL}/updateUser`;
        const data = {user : Userinfo}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data update user recived', datarecived.message )
        dispatch(updateMessage(datarecived.message))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const deleteUserThunk = (condition) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_USER_URL; 
        const url = `${baseURL}/deleteUser`;
        const data = {condition : condition}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data delete user recived', datarecived.message )
        dispatch(deleteUser(datarecived.message, condition));
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const addToCartThunk = (info) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL;  
        const url = `${baseURL}/addTocart`;
        const data = {info : info}
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data add to cart recived', datarecived.message )
        dispatch(updateMessage(datarecived.message))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const updateInCartThunk = (info) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL;  
        const url = `${baseURL}/updateincart`;
        const data = {info : info}
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data update in cart recived', datarecived.message )
        dispatch(updateMessage(datarecived.message))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const deleteFromCartThunk = (info) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL;  
        const url = `${baseURL}/deleteFromCart`;
        const data = {info : info}
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data delete from cart recived', datarecived.message )
        dispatch(deleteMessage(datarecived.message))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const addToFavoriesThunk = (info) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL;  
        const url = `${baseURL}/addToFavories`;
        const data = {info : info}
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data add to favories recived', datarecived.message )
        dispatch(updateMessage(datarecived.message))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const deleteFromFavoriesThunk = (info) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL;  
        const url = `${baseURL}/deleteFromFavories`;
        const data = {info : info}
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data delete from favories recived', datarecived.message )
        dispatch(deleteMessage(datarecived.message))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const formDataToJson = (formData) => {
  const jsonObject = {};

  // Convert the FormData to an array of key-value pairs
  const formDataArray = Array.from(formData.entries());

  for (const [key, value] of formDataArray) {
    jsonObject[key] = value;
  }

  return jsonObject;
};

const bringIncartThunk = (user_id) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/incart`;
        const data = {user_id : user_id}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };

        const response = await fetch(url, header);
        const datarecived = await response.json();
        dispatch(handelIncart(datarecived.products))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const bringInfavoriesThunk = (user_id) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/infavories`;
        const data = {user_id : user_id}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };

        const response = await fetch(url, header);
        const datarecived = await response.json();
        dispatch(handelInfavories(datarecived.products))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const bringStatesThunk = () => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_PROD_URL; 
        const url = `${baseURL}/States`;
        
        const response = await fetch(url);
        const datarecived = await response.json();
        dispatch(handelStates(datarecived.states))
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
    addProductThunk,
    deleteProductThunk,
    updateProductThunk,
    bringUsersThunk,
    addCategoryThunk,
    addBrandThunk,
    updateCategoryThunk,
    updateBrandThunk,
    deleteCategoryThunk,
    deleteBrandThunk,
    updateUserThunk,
    deleteUserThunk,
    addToCartThunk,
    deleteFromCartThunk,
    addToFavoriesThunk,
    deleteFromFavoriesThunk,
    bringIncartThunk,
    bringInfavoriesThunk,
    updateInCartThunk,
    bringStatesThunk
}

