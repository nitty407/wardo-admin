import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect
} from "react";
import { useForm } from "react-hook-form";
import Bro from "brototype";

import { isSameDay, isBefore, isAfter, isWithinInterval } from "date-fns";

import CustomDatePicker from "components/form/custom-date-picker";

const CustomDateFilter = (props, ref) => {
  const [state, setState] = useState({
    field: Bro(props).iCanHaz(`colDef.field`),
    data: null
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    errors,
    formState,
    watch
  } = useForm({ defaultValues: { type: "equals" } });

  const type = watch("type");

  useImperativeHandle(ref, () => {
    return {
      isFilterActive: () => {
        const { data } = state;
        return data && data.filter;
      },

      doesFilterPass: params => {
        const { field, data } = state;
        const value = Bro(params).iCanHaz(`data.${field}`);

        if (!value) {
          return false;
        }

        const userInput = data.filter;

        if (type !== "inRange") {
          let answer;

          const isSame = isSameDay(value, userInput);

          switch (type) {
            case "equals":
              answer = isSame;
              break;
            case "notEqual":
              answer = !isSame;
              break;
            case "lessThan":
              answer = isBefore(value, userInput);
              break;
            case "lessThanOrEqual":
              answer = isSame || isBefore(value, userInput);
              break;
            case "greaterThan":
              answer = isAfter(value, userInput);
              break;
            case "greaterThanOrEqual":
              answer = isSame || isAfter(value, userInput);
              break;
          }

          return answer;
        }

        const answer = isWithinInterval(value, {
          start: userInput,
          end: data.filterTo
        });

        return answer;
      },

      setModel: params => {
        if (!params) {
          clearFilter();
        }
      },

      getModel: () => {
        const { data } = state;

        if (!data || !data.filter) {
          return null;
        }

        return { ...data, filterType: "date" };
      }
    };
  });

  const onSubmit = formData => {
    setState(prev => ({ ...prev, data: formData }));
  };

  const clearFilter = () => {
    reset({
      type: "equals",
      filter: "",
      filterTo: ""
    });
    setState(prev => ({ ...prev, data: null }));
  };

  useEffect(() => {
    props.filterChangedCallback();
  }, [state]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ padding: "0 10px", height: 350, width: 260 }}
    >
      <select
        ref={register({ required: true })}
        name="type"
        className="custom-select custom-select-sm mb-4"
      >
        <option value="equals">Equal</option>
        <option value="notEqual">Not Equal</option>
        <option value="lessThan">Less Than</option>
        <option value="lessThanOrEqual">Less Than or Equal</option>
        <option value="greaterThan">Greater Than</option>
        <option value="greaterThanOrEqual">Greater Than or Equal</option>
        <option value="inRange">In Range</option>
      </select>

      <CustomDatePicker
        name="filter"
        placeholder="From Date"
        className="form-control-sm form-control-custom mb-3"
        validation={{ required: "this is required" }}
        dateFormat="dd/MM/yyyy"
        {...{ control, errors, formState }}
      />
      {type === "inRange" && (
        <CustomDatePicker
          name="filterTo"
          placeholder="To Date"
          className="form-control-sm form-control-custom mb-3"
          validation={{ required: "this is required" }}
          dateFormat="dd/MM/yyyy"
          {...{ control, errors, formState }}
        />
      )}
      <button type="submit" className="btn btn-sm btn-cm-primary">
        Appy Filter
      </button>
      <button
        type="button"
        className="btn btn-sm btn-cm-danger ml-3"
        style={{
          marginLeft: 8
        }}
        onClick={clearFilter}
      >
        Clear Filter
      </button>
    </form>
  );
};

export default forwardRef(CustomDateFilter);
