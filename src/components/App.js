import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Close as CloseIcon } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Layout from "./Layout";
import { ApiProgressSpinner } from "./spinners";

// pages
import Error from "pages/error";
import Login from "pages/login";

// context
import { useUserState } from "context/UserContext";

import useNotifStyles from "./notif-styles.js";

const CloseButton = ({ closeToast, className }) => (
  <CloseIcon className={className} onClick={closeToast} />
);

const App = () => {
  // global
  const { isAuthenticated } = useUserState();
  const classes = useNotifStyles();

  const PrivateRoute = ({ component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
      />
    );
  };

  const PublicRoute = ({ component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  };

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/app/consumers" />}
          />
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/consumers" />}
          />
          <PrivateRoute path="/app" component={Layout} />
          <PublicRoute path="/login" component={Login} />
          <Route component={Error} />
        </Switch>
      </Router>
      <ApiProgressSpinner />
      <ToastContainer
        limit={1}
        className={classes.toastsContainer}
        toastClassName={classes.notification}
        progressClassName={classes.progress}
        closeButton={
          <CloseButton className={classes.notificationCloseButton} />
        }
      />
    </>
  );
};

export default App;
