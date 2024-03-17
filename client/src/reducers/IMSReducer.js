
const userReducer = (state, action)=>{
    switch (action.type) {
      case "REGISTER_USER":
        return { ...state, RegisterRespond: action.payload };

      case "REGISTER_ERROR":
        return { ...state, RegisterError: action.payload }

      case "SET_TOKEN":
        localStorage.setItem("token", action.payload);
        return { ...state, token: action.payload };

      case "SET_AUTHENTICATED":
        return { ...state, isAuthenticated: action.payload };

      case "IS_LOADING":
        return { ...state, isLoading: action.payload };

      case "ERROR_MESSAGE":
        return { ...state, error: action.payload };

      case "USER_EMAIL":
        return { ...state, userEmail: action.payload };

      case "USER_FULL_NAME":
        localStorage.setItem("username", action.payload);
        return { ...state, userfullName: action.payload };

      case "AUTHONTICATION":
        return { ...state, admission: action.payload };

      case "IS_ADMIN":
        localStorage.setItem("isAdmin", action.payload);
        return { ...state, isAdmin: action.payload };

      case "LOGOUT":
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        return {
          ...state,
          isAuthenticated: false,
          token: "",
          userfullName: "",
        };

      case "PRODUCTS":
        return { ...state, products: action.payload };

      case "CATEGORIES":
        return { ...state, categories: action.payload }

      case "STATUS":
        return { ...state, status: action.payload };

      case "SHOW_MESSAGE":
        return { ...state, deleteMsg: action.payload.message };

      case "BRANDS":
        return { ...state, brands: action.payload };

      case "ADD_MESSAGE":
        return { ...state, addMsg: action.payload };  
        
      case "SEND_ORDER":
        return { ...state, sendOrderMsg: action.payload }; 

      case "ERROR_ORDER":
        return { ...state, errorOrderMsg: action.payload };
        
      case "ADD_PRODUCT":
        const newProducts = action.payload.product;
        const products = state.products;

        const addedProduct = {
            product_name: newProducts.name,
            product_ref: newProducts.ref,
            product_stock: newProducts.quantity,
            product_price: newProducts.price,
            product_desc: newProducts.desc,
            category_name: newProducts.categoryName,
            brand_name: newProducts.brandName,
            product_date : new Date().toISOString(),
            product_image: newProducts.product_image,
        };
        
        products.push(addedProduct);

        return {
          ...state,
          addMsg: action.payload.message,
          products: products,
        };

      case "DELETE_PRODUCT":
        const productRef = action.payload.product_ref;
        const result = state.products.filter(
          (element) => element.product_ref !== productRef
        );
        return { ...state, deleteMsg: action.payload.message, products: result };

      case "DELETE_CATEGORY":
        const categName = action.payload.categName;
        const catresult = state.categories.filter(
          (element) => element.name !== categName
        );
        return { ...state, deleteMsg: action.payload.message, categories: catresult };

      case "DELETE_BRAND":
        const brandName = action.payload.brandName;
        const brandresult = state.brands.filter(
          (element) => element.name !== brandName
        );
        return { ...state, deleteMsg: action.payload.message, brands: brandresult };

      case "DELETE_USER":
        const userName = action.payload.condition;
        const userresult = state.users.filter(
          (element) => element.username !== userName
        );
        return { ...state, deleteMsg: action.payload.message, users: userresult };

      case "UPDATE_CATEGORY":
        const newName = action.payload.category.newValue;
        const oldname = action.payload.category.condition;
        const updateCategories = state.categories.map((element) =>{
          if(element.name === oldname){
            element.name = newName;
            element.updated_date = new Date().toISOString();
            return element
          }else{
            return element
          }
        });
        //console.log('newList', updateCategories)
        return { ...state, categories: updateCategories }; 

      case "UPDATE_BRAND":
        const newBrandName = action.payload.brand.newValue;
        const oldBrandname = action.payload.brand.condition;
        const updateBrand = state.brands.map((element) =>{
          if(element.name === oldBrandname){
            element.name = newBrandName;
            element.updated_date = new Date().toISOString();
            return element
          }else{
            return element
          }
        });
        //console.log('newList', updateBrand)
        return { ...state, brands: updateBrand }; 

      case "UPDATE_PRODUCT":
        const updatedProduct = action.payload;

        const updatedProducts = state.products.map((element) => {
          if (element.product_ref === updatedProduct.ref) {
            element.product_name = updatedProduct.name;
            element.product_ref = updatedProduct.ref;
            element.product_stock = parseInt(updatedProduct.quantity, 10);
            element.product_price = updatedProduct.price;
            element.product_desc = updatedProduct.desc;
            element.product_date = new Date().toISOString();
            element.product_incart = false;
            element.product_liked = false;
            //element.product_image = null;
            element.category_name = updatedProduct.categoryName;
            element.brand_name = updatedProduct.brandName;
            return element;
          } else {
            return element;
          }
        });

        return { ...state, products: updatedProducts };

      case "UPDATE_MESSAGE":
        return { ...state, updateMsg: action.payload };

      case "USERS":
        return { ...state, users: action.payload };

      case "STATES":
        return { ...state, states: action.payload };

      case "INCART":
        return { ...state, incart: action.payload };

      case "INFAVORIES":
        return { ...state, infavories: action.payload };

      case "IMPORT_ORDERS":
        return { ...state, orders: action.payload };

      case "ORDER_PRODUCTS":
        return { ...state, orderProducts: action.payload };

      default:
        return state;
    }
}

export  {userReducer}