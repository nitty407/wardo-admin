import React from "react";
import AppConstants from "utils/app-constants";
import { isValid as isValidDate } from "date-fns";
import { getFormattedDateTime } from "utils/app-util";
import CellWithIcon from "./cell-with-icon";

const CustomRenderer = ({
  currentValue: val,
  dataType,
  cellIcon,
  name,
  context,
  rowData
}) => {
  const handleClick = () => {
    if (context) {
      context.showDetailModal(rowData);
    }
  };

  if (dataType === "DATE") {
    return val && isValidDate(val) ? (
      cellIcon ? (
        <CellWithIcon {...{ val: getFormattedDateTime(val), cellIcon }} />
      ) : (
        <span>{getFormattedDateTime(val)}</span>
      )
    ) : (
      <span>N/A</span>
    );
  }

  if (dataType === "BOOLEAN") {
    if (name === "isAlsoAStylist" && val) {
      return <div onClick={handleClick}>View Details</div>;
    }
    return <div>{val ? "Yes" : "No"}</div>;
  }

  if (dataType === "IMAGE") {
    return (
      <div className="text-center">
        <img
          className="mr-4"
          src={val || AppConstants.ICON.IMAGE}
          width="40"
          alt="logo"
        />
      </div>
    );
  }

  return val ? (
    cellIcon ? (
      <CellWithIcon {...{ val, cellIcon }} />
    ) : (
      <div>{val}</div>
    )
  ) : (
    ""
  );
};

export default CustomRenderer;
