import React from "react";
import { BeatLoader } from "react-spinners";

const overlayStyle = {
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  width: "100%",
  height: "100%",
  position: "fixed",
  zIndex: 9999,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.7)"
};

const Loader = ({ loading }) => {
  return (
    <div style={overlayStyle}>
      <BeatLoader color="#36D7B7" loading={loading} />
    </div>
  );
};

export default Loader;
