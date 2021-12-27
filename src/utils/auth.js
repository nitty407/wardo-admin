import AppConstants from "./app-constants";

const auth = {
  setToken: authToken =>
    localStorage.setItem(AppConstants.AUTH_TOKEN_KEY, authToken),
  getToken: () => localStorage.getItem(AppConstants.AUTH_TOKEN_KEY),
  setUserInfo: user =>
    localStorage.setItem(AppConstants.USER_KEY, JSON.stringify(user)),
  getUserInfo: () => {
    const user = localStorage.getItem(AppConstants.USER_KEY);
    return JSON.parse(user || "{}");
  },
  isAdmin: function() {
    return ((this.getUserInfo() || {}).role || "").toLowerCase() === "admin";
  },
  isAuthenticated: function() {
    return !!this.getToken();
  },
  setConfig: data =>
    localStorage.setItem(AppConstants.CONFIG_KEY, JSON.stringify(data)),
  getConfig: () =>
    JSON.parse(localStorage.getItem(AppConstants.CONFIG_KEY) || "{}"),
  clearAll: () => localStorage.clear()
};

export default auth;
