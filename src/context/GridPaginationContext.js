import React, { createContext, useContext, useReducer } from "react";
import Bro from "brototype";
import API from "utils/api";

const GridPaginationStateContext = createContext();
const GridPaginationDispatchContext = createContext();

const gridPaginationReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOTAL_ELEMENTS":
      return { ...state, totalElements: action.totalElements };
    case "RESET_TOTAL_ELEMENTS":
      return { ...state, totalElements: 0 };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const GridPaginationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gridPaginationReducer, {
    totalElements: 0
  });

  return (
    <GridPaginationStateContext.Provider value={state}>
      <GridPaginationDispatchContext.Provider value={dispatch}>
        {children}
      </GridPaginationDispatchContext.Provider>
    </GridPaginationStateContext.Provider>
  );
};

const useGridPaginationState = () => {
  const context = useContext(GridPaginationStateContext);
  if (context === undefined) {
    throw new Error(
      "useGridPaginationState must be used within a GridPaginationProvider"
    );
  }
  return context;
};

const useGridPaginationDispatch = () => {
  const context = useContext(GridPaginationDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useGridPaginationDispatch must be used within a GridPaginationProvider"
    );
  }
  return context;
};

const handlePaginationChange = (dispatch, pageObj) => {
  const totalElements = Bro(pageObj).iCanHaz("totalElements");

  dispatch({
    type: "SET_TOTAL_ELEMENTS",
    totalElements
  });
};

const getServerDataSource = (gridApi, config, dispatch, polling) => {
  const {
    size,
    url,
    urlParams = {},
    defaultFilter,
    customSortModel,
    deepFilter
  } = config;
  return {
    getRows(params) {
      const page =
        (Bro(params).iCanHaz("request.endRow") || 0) / (size || 1) - 1;

      const filters =
        defaultFilter || Bro(params).iCanHaz("request.filterModel") || {};

      const sortModel =
        customSortModel ||
        (Bro(params).iCanHaz("request.sortModel") || []).map(aSort => {
          return {
            sort: aSort.sort.toUpperCase(),
            colId: aSort.colId
          };
        });

      const obj = {
        deepFilter,
        page,
        size,
        filterModel: filters,
        sortModel
      };

      if (!polling) {
        gridApi.showLoadingOverlay();
      }

      API.post(`${url}/search`, obj, { params: urlParams })
        .then(resp => {
          gridApi.hideOverlay();

          const data = Bro(resp).iCanHaz("data");
          const { content, ...pageProps } = data || {};

          params.successCallback(content, pageProps.totalElements);
          if (content && content.length === 0) {
            gridApi.showNoRowsOverlay();
          }
          handlePaginationChange(dispatch, pageProps);
        })
        .catch(err => {
          gridApi.hideOverlay();
          console.error(err.response);
        });
    }
  };
};

export {
  GridPaginationProvider,
  useGridPaginationState,
  useGridPaginationDispatch,
  handlePaginationChange,
  getServerDataSource
};
