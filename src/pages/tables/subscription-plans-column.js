import React from "react";
import { Link } from "react-router-dom";

import FilterOptions from "utils/filter-options";
import AuthService from "utils/auth";

class subscriptionPlansColumn {
  constructor(isEditMode) {
    this.defaultColDef = field => ({
      field: field.name,
      colId: field.name,
      headerName: field.displayName,
      editable: isEditMode && !field.locked,
      sortable: true,
      ...subscriptionPlanFilters.chooseAptFilter(field.dataType),
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

    this.allColumns = [
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
      allFields().map(field => {
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
                    pathname: "",
                    state: {
                      isEditMode: true,
                      subscriptionPlanToUpdate: params.data
                    }
                  }}
                  className="text-cm-primary"
                >
                  View Details
                </Link>
              );
            }
          };
        }

        if (field.name === "attachCompanyDetails") {
          return {
            field: field.name,
            colId: field.name,
            headerName: field.displayName,
            sortable: false,
            suppressMenu: true,
            valueFormatter: params => (params.value ? "Yes" : "No")
          };
        }

        return this.defaultColDef(field);
      })
    );
  }

  generateColumns() {
    return this.allColumns;
  }
}

const allFields = () => {
  const { subscriptionPlanField = [] } = AuthService.getConfig() || {};

  let obj = {
    dataType: "LINK",
    validation: null,
    aggregationAllowed: false,
    localizedDisplay: null,
    collectionName: null,
    columnName: null,
    enumClass: null,
    defaultValue: null,
    allValues: null,
    locked: false,
    hidden: false,
    pinned: false
  };

  const fieldsWithActionCols = subscriptionPlanField.concat([
    { displayName: "View Details", name: "viewDetails", sequence: 7, ...obj }
  ]);

  return fieldsWithActionCols || [];
};

const subscriptionPlanFilters = new FilterOptions({
  collection: "subscription-plan"
});

export default subscriptionPlansColumn;
