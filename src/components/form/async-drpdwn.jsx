import React from "react";
import Bro from "brototype";
import AsyncSelect from "react-select/async";

import API from "utils/api";

const AsyncDrpdwn = ({
  baseUrl,
  searchColumns,
  filters = {},
  styles,
  onChange,
  ...restProps
}) => {
  const customStyles = {
    input: base => ({
      ...base,
      "& input": {
        margin: 0
      }
    }),
    ...styles
  };

  const handleChange = selectedOption => {
    onChange && onChange(selectedOption);
  };

  const loadOptions = async (inputValue, callback) => {
    const dto = {
      page: 0,
      size: 50,
      filterModel: {
        _: {
          filterType: "text",
          type: "",
          filter: inputValue,
          fields: searchColumns || []
        },
        ...filters
      },
      sortModel: []
    };

    const resp = await API.post(`${baseUrl}/search`, dto);

    const { content } = Bro(resp).iCanHaz("data") || {};
    callback(content || []);
  };

  return (
    <AsyncSelect
      styles={customStyles}
      loadOptions={restProps.loadOptions || loadOptions}
      onChange={handleChange}
      {...restProps}
    />
  );
};

export default AsyncDrpdwn;
