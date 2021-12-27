import React from "react";
import { useHistory } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

const GoBackBtn = ({ onClick }) => {
  const routerHistory = useHistory();

  return (
    <button
      type="button"
      className="btn btn-link px-0 mt-n1 mb-2"
      onClick={onClick || routerHistory.goBack}
    >
      <FaBackward className="d-inline align-middle mr-2" />
      go back
    </button>
  );
};

export default GoBackBtn;
