import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import "bootstrap/dist/css/bootstrap.css";
import "kg-grid";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { GridPaginationProvider } from "context/GridPaginationContext";
import { ConfirmDialogServiceProvider } from "context/ConfirmDialogContext";

ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <GridPaginationProvider>
        <ConfirmDialogServiceProvider>
          <ThemeProvider theme={Themes.default}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </ConfirmDialogServiceProvider>
      </GridPaginationProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
