
const isLoading = (value) => {
  return {
    type: "IS_LOADING",
    payload: value,
  };
};

const handelError = (message) => {
  return {
    type: "ERROR_MESSAGE",
    payload: message,
  };
};

const addMessage = (message) => {
  return {
    type: "ADD_MESSAGE",
    payload: message,
  };
};

const deleteMessage = (message, productRef) => {
  return {
    type: "SHOW_MESSAGE",
    payload: { message, productRef },
  };
};

const updateMessage = (message) => {
  return {
    type: "UPDATE_MESSAGE",
    payload: message,
  };
};

const handelStates = (states) => {
  return {
    type: "STATES",
    payload: states,
  };
};

const formDataToJson = (formData) => {
  const jsonObject = {};

  // Convert the FormData to an array of key-value pairs
  const formDataArray = Array.from(formData.entries());

  for (const [key, value] of formDataArray) {
    jsonObject[key] = value;
  }

  return jsonObject;
};

const bringStatesThunk = () => async (dispatch) => {
  try {
    const baseURL = process.env.REACT_APP_API_PROD_URL;
    const url = `${baseURL}/States`;

    const response = await fetch(url);
    const datarecived = await response.json();
    dispatch(handelStates(datarecived.states));
  } catch (err) {
    console.error(err);
    dispatch(handelError(err));
  }
};

const contactMessageThunk = (message) => async (dispatch) => {
  try {
    console.log(message);
    const baseURL = process.env.REACT_APP_API_PROD_URL;
    const url = `${baseURL}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    const data = await response.json();
    dispatch(addMessage(data.message));
  } catch (err) {
    console.error(err);
    dispatch(handelError(err));
  }
};

export {
  isLoading,
  handelError,
  addMessage,
  deleteMessage,
  updateMessage,
  handelStates,
  formDataToJson,
  bringStatesThunk,
  contactMessageThunk,
};