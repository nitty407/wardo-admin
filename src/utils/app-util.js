import React from "react";

import { format } from "date-fns";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

export const getFormattedDate = (date, formatStr) => {
  return format(date, formatStr || "dd MMM yyyy");
};

export const getFormattedDateTime = (date, formatStr) => {
  return format(date, formatStr || "dd MMM yyyy, HH:mm");
};

export const customSortArray = ({ data, sortBy, sortField }) => {
  const sortByObject = sortBy.reduce(
    (obj, item, index) => ({
      ...obj,
      [item]: index
    }),
    {}
  );
  return data.sort(
    (a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
  );
};
// ex. customSort({data:[a,b,c], [c,a,b], sortField: 'label'})

export const customerIdFromatter = params =>
  ((params.value || "").toString().match(/.{1,4}/g) || []).join("-");

export const toTitleCase = str => {
  if (!str) {
    return "";
  }
  if (str.length === 1) {
    return str.toUpperCase();
  }
  const newStr = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return newStr;
};

export const BootstrapTableSortCarets = order => {
  if (!order)
    return (
      <div className="sort-icon-wrapper">
        <FaCaretUp className="text-muted" />
        <FaCaretDown className="text-muted" />
      </div>
    );
  else if (order === "asc")
    return (
      <div className="sort-icon-wrapper">
        <FaCaretUp className="text-dark" />{" "}
        <FaCaretDown className="text-muted" />
      </div>
    );
  else if (order === "desc")
    return (
      <div className="sort-icon-wrapper">
        <FaCaretUp className="text-muted" />{" "}
        <FaCaretDown className="text-dark" />
      </div>
    );
  return null;
};
