import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

const BooleanFilter = (props, ref) => {
  const [value, setValue] = useState("all");

  useImperativeHandle(ref, () => {
    return {
      isFilterActive: () => value !== "all",

      setModel: params => {
        if (!params) {
          setValue("all");
          props.filterChangedCallback();
        }
      },

      getModel: () => {
        if (value === "all") {
          return null;
        }

        return {
          filterType: "boolean",
          value: value === "true"
        };
      }
    };
  });

  const change = e => {
    const val = e.target.value;
    setValue(val);
  };

  useEffect(() => {
    props.filterChangedCallback();
  }, [value]);

  const { filterOptions } = props;

  return (
    <div className="d-flex justify-content-center px-4">
      <select
        value={value}
        onChange={change}
        className="custom-select custom-select-sm"
      >
        <option value={"all"}>All</option>
        {filterOptions ? (
          filterOptions.map((op, i) => (
            <option value={op.val} key={i}>
              {op.displayName}
            </option>
          ))
        ) : (
          <>
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </>
        )}
      </select>
    </div>
  );
};

export default forwardRef(BooleanFilter);
