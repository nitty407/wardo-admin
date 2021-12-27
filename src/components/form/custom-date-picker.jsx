import React from "react";
import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = props => {
  const {
    name,
    containerClassName,
    className,
    hideLabel,
    labelClass,
    placeholder,
    dateFormat,
    minDate,
    maxLength,
    format,
    validation,
    control,
    errors,
    formState,
    ...rest
  } = props;

  return (
    <div className={containerClassName}>
      {!hideLabel && (
        <div className={labelClass}>
          <label>
            {props.placeholder}{" "}
            {validation.required ? <span className="required">*</span> : ""}
          </label>
        </div>
      )}

      <div>
        <Controller
          {...rest}
          as={ReactDatePicker}
          name={name}
          dateFormat={dateFormat}
          control={control}
          rules={validation}
          valueName="selected"
          onChange={([selected]) => selected.valueOf()}
          className={className}
          minDate={minDate}
          placeholderText={placeholder}
        />
      </div>

      {formState.touched[name] && errors[name] && (
        <span className="no-fill-warning">{errors[name].message}</span>
      )}
    </div>
  );
};

export default CustomDatePicker;
