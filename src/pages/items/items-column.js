import React from "react";

import FilterOptions from "utils/filter-options";
import AuthService from "utils/auth";

class itemsColumn {
  constructor(isEditMode, cols) {
    this.cols = cols || [];
    this.defaultColDef = field => ({
      field: field.name,
      colId: field.name,
      headerName: field.displayName,
      editable: isEditMode && !field.locked,
      sortable: true,
      ...itemsFilters.chooseAptFilter(field.dataType),
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
          // if (field.name === "viewDetails") {
          //   return {
          //     field: field.name,
          //     colId: field.name,
          //     headerName: field.displayName,
          //     sortable: false,
          //     suppressMenu: true,
          //     cellRendererFramework: params => {
          //       return (
          //         <Link
          //           to={{
          //             pathname: "",
          //             state: {
          //               isEditMode: true,
          //               subscriptionPlanToUpdate: params.data
          //             }
          //           }}
          //           className="text-cm-primary"
          //         >
          //           View Details
          //         </Link>
          //       );
          //     }
          //   };
          // }

          return this.defaultColDef(field);
        })
      ));
  }

  generateColumns(fields) {
    return this.getFields(fields);
  }
}

const itemsFilters = new FilterOptions({
  collection: "item"
});

export default itemsColumn;
