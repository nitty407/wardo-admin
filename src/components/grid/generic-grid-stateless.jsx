import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  Children,
  isValidElement,
  cloneElement
} from "react";
import { useHistory } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

import { AgGridReact } from "ag-grid-react";
import GridAction from "./grid-action";
import GRID_OPTIONS from "./grid-options";

import { format } from "date-fns";
import Bro from "brototype";
import fileDownload from "js-file-download";

import {
  useGridPaginationDispatch,
  getServerDataSource
} from "context/GridPaginationContext";
import { useConfirmation } from "context/ConfirmDialogContext";

import API from "utils/api";
import images from "utils/get-images";
import { notifySuccess, notifyError, notifyInfo } from "utils/notify";
import AppConstants, { NotificationMsgs } from "utils/app-constants";

// styles
import "./styles.scss";

const GenericGrid = (props, ref) => {
  const componentDidUnmount = useRef();
  const {
    colFieldUrl,
    baseUrl,
    urlParams,
    columnDefGenerator,
    pageSize,
    customSortModel,
    actionCallback,
    polling,
    pollInterval,
    openDetailModal
  } = props;

  const routerHistory = useHistory();

  const initGridActionLoadingState = {
    isExportBtnLoading: false
  };
  const [gridActionLoadingState, setGridActionLoadingState] = useState(
    initGridActionLoadingState
  );
  const gridActionStateAndHook = {
    gridActionLoadingState,
    setGridActionLoadingState
  };

  const [colFields, setColFields] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  const fetchColFields = async () => {
    const resp = await trackPromise(API.get(colFieldUrl));

    const { status, data } = resp || {};

    if (!componentDidUnmount.current) {
      if (status && data) {
        setColFields(data);
        const columns = new columnDefGenerator().generateColumns(data);
        setColumnDefs(columns);
      }
    }
  };

  useEffect(() => {
    fetchColFields();
  }, []);

  const [visible, setVisible] = useState(false);
  const [createNewProgress, setCreateNewProgress] = useState(false);
  const [selectedTableRowIds, setSelectedTableRowIds] = useState([]);
  const [rowData, setRowData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  /**
  |--------------------------------------------------
  | Code to Initialize Ag-Grid Starts here...
  |--------------------------------------------------
  */

  const gridApi = useRef();

  const gridPaginationDispatch = useGridPaginationDispatch();

  let pollIntervalId = 0;

  const onGridReady = params => {
    const { defaultFilter } = props;
    gridApi.current = params.api;

    const datasource = getServerDataSource(
      gridApi.current,
      {
        size: pageSize || AppConstants.PAGE_SIZE,
        url: baseUrl,
        urlParams,
        defaultFilter,
        customSortModel
      },
      gridPaginationDispatch,
      polling
    );

    gridApi.current.setServerSideDatasource(datasource);

    if (polling) {
      let interval = pollInterval || 5000;

      pollIntervalId = setInterval(() => {
        updateTable();
      }, interval);
    }
  };

  const onRowSelect = event => {
    const selectedIds = event.api.getSelectedNodes().map(node => node.data.id);
    if (!componentDidUnmount.current) {
      setSelectedTableRowIds(selectedIds);
    }
  };

  const onCellValueChanged = params => {
    if (params.newValue === params.oldValue) return;

    const field = Bro(params).iCanHaz("colDef.field");
    const url = `${baseUrl}?propChanged=${field}`;

    let data = params.data;

    if (!data) return;

    try {
      API.put(url, data);
    } catch (err) {
      if (err.response) {
      }
      notifyError(err);
      gridApi.current.purgeServerSideCache();
    }
  };

  /**
  |--------------------------------------------------
  | Code to Initialize Ag-Grid Ends here...
  |--------------------------------------------------
  */

  const showDetailModal = data => {
    openDetailModal(data);
  };

  const onAddNew = () => {
    const { redirectOnAddNew = false, routeUrlOnAddNew = "/" } = props;

    if (redirectOnAddNew) {
      routerHistory.push(routeUrlOnAddNew);
    } else {
      setVisible(true);
      setIsEditMode(false);
    }
  };

  useImperativeHandle(ref, () => ({
    toggleCreateNewModal(data) {
      setRowData(data);
      setVisible(val => !val);
      setIsEditMode(true);
    },
    gridApi,
    updateTable
  }));

  const onToggleEditMode = value => {
    const columnDefs = new columnDefGenerator(value).generateColumns(colFields);
    setColumnDefs(columnDefs);
  };

  const onGlobalSearch = value => {
    let filters = {};

    filters = gridApi.current.getFilterModel();
    filters["_"] = { filter: value };
    gridApi.current.setFilterModel(filters);
  };

  let defaultFilter = {};

  const onReset = () => {
    gridApi.current.setFilterModel(null);
    gridApi.current.onFilterChanged();
    defaultFilter = {};
    updateTable(null);
    actionCallback && actionCallback("action-reset");
  };

  const updateTable = defaultFilter => {
    const datasource = getServerDataSource(
      gridApi.current,
      {
        size: pageSize || AppConstants.PAGE_SIZE,
        url: baseUrl,
        urlParams,
        defaultFilter,
        customSortModel
      },
      gridPaginationDispatch,
      polling
    );

    gridApi.current.setServerSideDatasource(datasource);
  };

  const onDateRangeChange = (startDate, endDate) => {
    defaultFilter = {
      ...defaultFilter,
      dateCreated: {
        filterType: "date",
        type: "inRange",
        filter: startDate,
        filterTo: endDate
      }
    };

    updateTable(defaultFilter);
  };

  const confirm = useConfirmation();

  const onDelete = async () => {
    if (!selectedTableRowIds || selectedTableRowIds.length <= 0) {
      notifyInfo(NotificationMsgs.info["no.rows.select.delete"]);
    } else {
      confirm({
        title: "Are you sure?",
        icon: images["dialog/error.svg"],
        catchOnCancel: true,
        description: AppConstants.ConfirmDeletePrompt,
        buttonTexts: {
          ok: "Yes",
          cancel: "Cancel"
        },
        modalOptions: {
          centered: true
        }
      }).then(async () => {
        try {
          const resp = await API.post(`${baseUrl}/delete`, selectedTableRowIds);

          const { status, message = "" } = resp || {};

          if (status) {
            notifySuccess(NotificationMsgs.success.row.delete);
            gridApi.current.purgeServerSideCache();
            gridApi.current.deselectAll();
          } else {
            notifyError(message);
          }
        } catch (error) {
          gridApi.current.deselectAll();
        }
      });
    }
  };

  const onExport = async () => {
    const { csvName } = props;

    const url = `${baseUrl}/export`;
    const filters = { filterModel: gridApi.current.getFilterModel() };

    setGridActionLoadingState({ isExportBtnLoading: true });

    try {
      const data = await API.post(url, filters, { responseType: "blob" });

      setGridActionLoadingState({ isExportBtnLoading: false });

      if (data) {
        const BOM = "\uFEFF";
        const fileName = `${format(
          new Date(),
          "yyyyMMdd_HHmmss"
        )}_${csvName}.csv`;

        fileDownload(data, fileName, "text/csv; charset=utf-8", BOM);
      }
    } catch (error) {
      if (error.response) {
        notifyError(error);
      }
    }
  };

  const onUpload = data => {
    notifySuccess(data.message || NotificationMsgs.success.import);
    gridApi.current.purgeServerSideCache();
  };

  const clonedElementWithMoreProps = (comp, props) => {
    return React.cloneElement(comp, props);
  };

  const create = async data => {
    setCreateNewProgress(true);

    try {
      const resp = await API.post(baseUrl, data);
      if (resp && resp.status) {
        setVisible(false);
        notifySuccess(NotificationMsgs.success.row.add);
        gridApi.current.purgeServerSideCache();
      }
    } finally {
      setCreateNewProgress(false);
    }
  };

  const update = async (formData, { id = "" } = {}) => {
    setCreateNewProgress(true);

    try {
      const resp = await API.put(`${baseUrl}${`/${id}`}`, formData);
      if (resp && resp.status) {
        setVisible(false);
        notifySuccess(NotificationMsgs.success.row.update);
        gridApi.current.purgeServerSideCache();
      }
    } finally {
      setCreateNewProgress(false);
    }
  };

  useEffect(() => {
    return () => {
      componentDidUnmount.current = true;
      clearInterval(pollIntervalId);
    };
  }, []);

  const {
    titleKey,
    subTitleKey,
    gridOptions,
    addNewComponent,
    gridActionChildren,
    noGridActions,
    isReadOnly,
    hideToggleEditMode,
    hideDelete,
    hideExport,
    hideOnUpload,
    hideAddNew,
    hideGlobalSearch,
    hideDateRange,
    hideReset
  } = props;

  const options = gridOptions || GRID_OPTIONS;

  const editableGridActions = {
    onAddNew: !hideAddNew && onAddNew, // to create new record (table row)
    onToggleEditMode: !hideToggleEditMode && onToggleEditMode,
    onUpload: !hideOnUpload && onUpload, // to upload records through file
    onDelete: !hideDelete && onDelete // to delete a record (table row)
  };

  return (
    <>
      <div className="pageTitleContainer">
        <div>
          {titleKey && <h4 className="mb-0">{titleKey}</h4>}
          {subTitleKey && <p>{subTitleKey}</p>}
        </div>

        {!noGridActions && (
          <GridAction
            baseUrl={baseUrl}
            onGlobalSearch={!hideGlobalSearch && onGlobalSearch} // to search in table
            onDateRangeChange={!hideDateRange && onDateRangeChange}
            onReset={!hideReset && onReset} // to reset table
            onExport={!hideExport && onExport} // to generate excel file
            {...(!isReadOnly && editableGridActions)}
            {...gridActionStateAndHook}
          >
            {gridActionChildren &&
              Children.map(gridActionChildren, child =>
                isValidElement(child) ? cloneElement(child) : child
              )}
          </GridAction>
        )}
      </div>
      <hr />
      {!visible && (
        <div className="ag-theme-material gridSize">
          <AgGridReact
            reactNext={true}
            onCellValueChanged={onCellValueChanged}
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            pagination={true}
            context={{ showDetailModal }}
            onSelectionChanged={onRowSelect}
            {...options}
          ></AgGridReact>
        </div>
      )}
      {visible &&
        clonedElementWithMoreProps(addNewComponent, {
          visible,
          onHide: () => setVisible(false),
          dialogBtnLoading: createNewProgress,
          onSubmit: isEditMode ? update : create,
          data: rowData,
          isEditMode
        })}
    </>
  );
};

export default forwardRef(GenericGrid);
