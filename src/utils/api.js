import axios from "axios";
import auth from "./auth";
import AppConstants from "./app-constants";
import { notifyError } from "utils/notify";

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

const requestHandler = request => {
  if (isHandlerEnabled(request)) {
    const authToken = auth.getToken();
    request.headers[AppConstants.AUTH_TOKEN_KEY] = authToken ? authToken : null;
  }
  return request;
};

const API = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  responseType: "json"
});

API.interceptors.request.use(request => requestHandler(request));

API.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);

const successHandler = response => {
  return response.data;
};

const errorHandler = error => {
  console.log("error", error);
  // const statusCode = error.response ? error.response.status : null;

  // if (statusCode === 401) {
  //   notifyError("Please login to continue.");
  // }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { data } = error.response;
    const errMsg = (data || {}).message || "Something went wrong!";

    console.error(errMsg);
    notifyError(errMsg);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the
    // browser and an instance of
    // http.ClientRequest in node.js
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error", error.message);
  }

  return Promise.reject({ ...error });
};

export default API;
