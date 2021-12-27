import React, { createContext, useContext, useReducer } from "react";
import { trackPromise } from "react-promise-tracker";

import API from "utils/api";
import auth from "utils/auth";

const UserStateContext = createContext();
const UserDispatchContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, {
    isAuthenticated: auth.isAuthenticated()
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################
const loginUser = async (dispatch, loginDetails, setIsLoading, setError) => {
  setError(false);
  setIsLoading(true);

  try {
    const resp = await API.post("/auth/user/login", loginDetails);

    if (resp && resp.status) {
      const { data } = resp;

      auth.setToken(data.token);
      auth.setUserInfo(data.data);

      fetchConfig(dispatch);

      setError(false);
      setIsLoading(false);
    }
  } catch (err) {
    setError(true);
    setIsLoading(false);
  }
};

const fetchConfig = async dispatch => {
  try {
    const resp = await trackPromise(API.get("/config"));

    if (resp && resp.data) {
      auth.setConfig(resp.data);
      dispatch({ type: "LOGIN_SUCCESS" });
    }
  } catch (error) {
    console.log(error.response);
  }
};

const signOut = async dispatch => {
  const resp = await trackPromise(API.post("/auth/user/logout", {}));

  if (resp.status) {
    auth.clearAll();
    dispatch({ type: "SIGN_OUT_SUCCESS" });
  }
};
