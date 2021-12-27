import React, { useState } from "react";
import Switch from "react-switch";

// import "react-dates/initialize";
// import { DateRangePicker } from "react-dates";
// import "react-dates/lib/css/_datepicker.css";

import {
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  UncontrolledTooltip
} from "reactstrap";

import {
  MdSearch,
  MdAdd,
  MdDelete,
  MdGetApp,
  MdRotateLeft
} from "react-icons/md";

import { ProgressBtn } from "components/button";

//styles
import "./grid-action.scss";

const GridAction = props => {
  const [searchVal, setSearchVal] = useState("");
  const [checked, setChecked] = useState(false);

  // const [dateFocusInput, setDateFocusInput] = useState(null);

  const initialDateRange = {
    startDate: null,
    endDate: null
  };
  const [dateRange, setDateRange] = useState(initialDateRange);

  const {
    onAddNew,
    onToggleEditMode,
    onReset,
    onDelete,
    onExport,
    // baseUrl,
    // onUpload,
    onGlobalSearch,
    onDateRangeChange,
    gridActionLoadingState: { isExportBtnLoading } = {}
    // setGridActionLoadingState
  } = props;

  const handleChange = val => {
    setChecked(val);
    onToggleEditMode(val);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    onGlobalSearch(searchVal);
  };

  const handleDatesChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });

    const strtDateTimestamp = startDate && startDate.valueOf();
    const endDateTimestamp = endDate && endDate.valueOf();

    onDateRangeChange(strtDateTimestamp, endDateTimestamp);
  };

  return (
    <div className="gridActionContainer">
      <div>
        {onGlobalSearch && (
          <div className="searchForm" onSubmit={handleSearchSubmit}>
            <InputGroup>
              <Input
                placeholder="Search"
                value={searchVal}
                onChange={event => setSearchVal(event.target.value)}
              />
              <InputGroupAddon addonType="append">
                <Button
                  className="searchBtn btn-cm-primary"
                  type="submit"
                  aria-label="search"
                >
                  <MdSearch />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        )}
        {props.children && props.children}

        {/* {onDateRangeChange && (
          <div className="dateRangePicker">
            <Label className="dateRangeLabel">
              <small>Date Range:</small>
            </Label>
            <div className="dateRngPckrwrapper">
              <DateRangePicker
                block
                small
                // numberOfMonths={1}
                anchorDirection="right"
                startDate={dateRange.startDate} // momentPropTypes.momentObj or null,
                startDateId="start_date_id" // PropTypes.string.isRequired,
                endDate={dateRange.endDate} // momentPropTypes.momentObj or null,
                endDateId="end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) =>
                  handleDatesChange(startDate, endDate)
                } // PropTypes.func.isRequired,
                focusedInput={dateFocusInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => setDateFocusInput(focusedInput)} // PropTypes.func.isRequired,
              />
            </div>
          </div>
        )} */}
      </div>
      <div>
        {/* {onUpload && (
          // <FileUpload
          //   className="btn btn-primary pointer"
          //   onUpload={onUpload}
          //   text="import.key"
          //   url={`${baseUrl}/import`}
          // />
        )} */}

        {onToggleEditMode && (
          <>
            <UncontrolledTooltip placement="bottom" target="edit">
              Edit Mode
            </UncontrolledTooltip>
            <div id="edit">
              <Switch
                className="d-block"
                checked={checked}
                onChange={handleChange}
                value={checked}
              />
            </div>
          </>
        )}
        {onAddNew && (
          <button
            className="btn btn-sm btn-primary btn-icon-label"
            onClick={onAddNew}
          >
            <MdAdd className="mr-1" />
            Add
          </button>
        )}
        {onDelete && (
          <button
            className="btn btn-sm btn-danger btn-icon-label"
            onClick={onDelete}
          >
            <MdDelete className="mr-1" />
            Delete
          </button>
        )}
        {onExport && (
          <ProgressBtn
            className="btn-sm btn-light btn-icon-label"
            onClick={onExport}
            loading={isExportBtnLoading}
            disabled={isExportBtnLoading}
          >
            <MdGetApp />
            Export
          </ProgressBtn>
        )}
        {onReset && (
          <Button
            className="btn btn-sm btn-info btn-icon-label"
            onClick={() => {
              setSearchVal("");
              setDateRange(initialDateRange);
              onReset();
            }}
          >
            <MdRotateLeft />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};

export default GridAction;
