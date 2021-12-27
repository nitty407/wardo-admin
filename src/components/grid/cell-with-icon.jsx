import React from "react";

const CellWithIcon = ({ val, cellIcon }) => (
  <div className="d-flex justify-content-between align-items-center">
    {val} {cellIcon}
  </div>
);

export default CellWithIcon;
