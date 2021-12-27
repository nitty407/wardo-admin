import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

const overlayStyle = {
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  width: "100%",
  height: "100%",
  zIndex: 999999,
  overflow: "hidden",
  backgroundColor: "rgba(255, 255, 255, 0.7)"
};

const Spinner = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div
        className="d-flex justify-content-center align-items-center position-fixed"
        style={overlayStyle}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  );
};

export default Spinner;
