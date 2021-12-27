import React from "react";
import { Link } from "react-router-dom";

import FilterOptions from "utils/filter-options";
import AuthService from "utils/auth";
import AppConstants, { ROUTE_URLS } from "utils/app-constants";

class introScreenColumn {
  constructor(isEditMode, cols) {
    this.cols = cols || [];
    this.defaultColDef = field => ({
      field: field.name,
      colId: field.name,
      headerName: field.displayName,
      editable: isEditMode && !field.locked,
      sortable: true,
      ...introScreenFilters.chooseAptFilter(field.dataType),
      pinned: field.pinned ? "left" : "",
      cellEditorSelector: function(params) {
        return {
          component: "customEditor",
          params: {
            dataType: field.dataType,
            currentValue: params.value,
            validation: field.validation,
            collectionName: field.collectionName,
            columnName: field.columnName,
            allValues: field.allValues
          }
        };
      },
      cellRendererSelector: function(params) {
        return {
          component: "customRenderer",
          params: {
            dataType: field.dataType,
            currentValue: params.value,
            cellIcon: field.cellIcon
          }
        };
      }
    });

    this.getFields = fields =>
      (this.allColumns = [
        {
          field: "_",
          colId: "_",
          hide: true,
          lockVisible: true,
          filter: "agTextColumnFilter",
          filterParams: {
            newRowsAction: "keep"
          }
        }
      ].concat(
        fields.map(field => {
          if (field.name === "viewDetails") {
            return {
              field: field.name,
              colId: field.name,
              headerName: field.displayName,
              sortable: false,
              suppressMenu: true,
              cellRendererFramework: params => {
                return (
                  <Link
                    to={{
                      pathname: ROUTE_URLS.NEW_INTRO_SCREEN_URL,
                      state: {
                        isEditMode: true,
                        rowData: params.data
                      }
                    }}
                  >
                    View Details
                  </Link>
                );
              }
            };
          }

          return this.defaultColDef(field);
        })
      ));
  }

  generateColumns(fields) {
    let obj = AppConstants.VIEW_COL_DEF;

    const fieldsWithActionCols = fields.concat([
      { displayName: "View Details", name: "viewDetails", sequence: 5, ...obj }
    ]);

    return this.getFields(fieldsWithActionCols);
  }
}

const introScreenFilters = new FilterOptions({
  collection: "intro-screen"
});

export default introScreenColumn;
