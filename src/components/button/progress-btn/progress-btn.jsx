import React from "react";

const ProgressBtn = props => {
  const { color, className, loading, children, ...restProps } = props;

  const btnProgressLoader = (
    <div className="spinner-border spinner-border-sm ml-2" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );

  return (
    <button
      disabled={loading}
      className={`btn d-flex align-items-center ${className}`}
      {...restProps}
    >
      {children}
      {loading && btnProgressLoader}
    </button>
  );
};

export default ProgressBtn;
