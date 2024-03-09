import { handelError } from "../General/generalActions";

const registerUser = (message) => {
  return {
    type: "REGISTER_USER",
    payload: message,
  };
};

const registerError = (message) => {
  return {
    type: "REGISTER_ERROR",
    payload: message,
  };
};

const setAuthenticated = (isAuthenticated) => {
  return {
    type: "SET_AUTHENTICATED",
    payload: isAuthenticated,
  };
};

const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    payload: token,
  };
};

const logout = () => {
  return {
    type: "LOGOUT",
  };
};

const userEmail = (email) => {
  return {
    type: "USER_EMAIL",
    payload: email,
  };
};

const isAdmin = (value) => {
  return {
    type: "IS_ADMIN",
    payload: value,
  };
};

const userFullName = (fullName) => {
  return {
    type: "USER_FULL_NAME",
    payload: fullName,
  };
};

const registerThunk = (user) => async (dispatch) => {
  try {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}/register`;
    const data = { ...user };
    const header = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, header);
    if (response.status === 201) {
      const dataReceived = await response.json();
      dispatch(registerUser(dataReceived.message));
    } else if (response.status === 409) {
      const dataReceived = await response.json();
      dispatch(registerError(dataReceived.error));
    } else if (response.status === 500) {
      const dataReceived = await response.json();
      dispatch(registerError(dataReceived.error));
    }
  } catch (err) {
    console.error(err);
    dispatch(registerError(err));
  }
};

const loginThunk = (user) => async (dispatch) => {
  try {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}/login`;
    const data = { ...user };
    const header = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, header);
    const dataReceived = await response.json();
    if (response.ok) {
      dispatch(registerUser(""));
      dispatch(registerError(""));
      dispatch(setToken(dataReceived.token));
      dispatch(isAdmin(dataReceived.isAdmin));
      dispatch(setAuthenticated(true));
      dispatch(handelError(dataReceived.error));
      dispatch(userEmail(dataReceived.userEmail)); //to delete the user from login table
      dispatch(userFullName(dataReceived.fullName));
    } else {
      dispatch(setAuthenticated(false));
      dispatch(handelError(dataReceived.error));
    }
  } catch (err) {
    console.error("catch error", err);
    dispatch(handelError(err));
  }
};

const LogOutThunk = (useremail) => async (dispatch) => {
  try {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}/logout`;
    const data = { email: useremail };
    const header = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, header);
    const dataReceived = await response.json();
    //console.log(dataReceived)
  } catch (err) {
    console.error(err);
    dispatch(handelError(err));
  }
};

export {
  registerUser,
  registerError,
  setAuthenticated,
  setToken,
  logout,
  userEmail,
  isAdmin,
  userFullName,
  registerThunk,
  loginThunk,
  LogOutThunk,
};
