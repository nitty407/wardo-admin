import StatusBar from "./status-bar";
import CellEditor from "./cell-editor";
import AppConstants from "utils/app-constants";
import BooleanFilter from "./boolean-filter";

import CellRenderer from "./cell-renderer";
import customDateFilter from "./custom-date-filter";

const GRID_OPTIONS = {
  defaultColDef: {
    resizable: true,
    suppressMovable: true,
    menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"]
    // suppressMenu: true
    // unSortIcon: true
  },
  frameworkComponents: {
    statusBar: StatusBar,
    customEditor: CellEditor,
    booleanFilter: BooleanFilter,
    customRenderer: CellRenderer,
    dateFilter: customDateFilter
  },
  suppressContextMenu: true,
  autoHeight: true,
  rowSelection: "multiple",
  rowDeselection: true,
  rowModelType: "serverSide",
  cacheBlockSize: AppConstants.PAGE_SIZE,
  paginationPageSize: AppConstants.PAGE_SIZE,
  getRowNodeId: data => data.id,
  overlayNoRowsTemplate: `<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">
		No Data found
	</span>`
};

export default GRID_OPTIONS;
