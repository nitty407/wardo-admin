import React, { useState, useRef, useImperativeHandle } from "react";
import Bro from "brototype";
import DateFnsUtils from "@date-io/date-fns";
import API from "utils/api";
import { forwardRef } from "react";
// import DateInput from "../form/date-input";
// import TextInput from "../form/text-input";
// import Loader from "../loader";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import {
  FormControl,
  Select,
  MenuItem,
  CircularProgress
} from "@material-ui/core";

const TYPES = {
  TEXT: "text",
  NUMBER: "number"
};

const OPTIONS = {
  // SELECT: ["VISITED", "NOT_VISITED"],
  // ROLE: ["UG_1", "UG_2", "UG_3"],
  BOOLEAN: [
    { label: "TRUE", value: true },
    { label: "FALSE", value: false }
  ]
};

const DATE_FORMAT = "dd/MMM/yyyy";

const formCtrlSelectStyle = { width: "80%", display: "block", margin: "auto" };

const CustomEditor = (props, ref) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     val: props.currentValue === undefined ? "" : props.currentValue,
  //     autoCompleteLoading: true
  //   };
  //   this.ref = null;
  // }

  const inputRef = useRef();

  const initValue = props.currentValue == null ? "" : props.currentValue;

  const [val, setVal] = useState(initValue);

  const [autoCompleteLoading, setAutoCompleteLoading] = useState(
    props.allValues ? false : true
  );
  const [options, setOptions] = useState(props.allValues);

  // componentDidMount() {
  //   this.timeout = setTimeout(() => {
  //     if (this.ref) {
  //       this.ref.select();
  //     }
  //   }, 1);
  // }
  // componentWillUnmount() {
  //   if (this.timeout) {
  //     clearTimeout(this.timeout);
  //   }
  // }

  const handleDateChange = date => setVal(date.valueOf());

  const handleChange = event => {
    let val =
      type === "BOOLEAN"
        ? Bro(event).iCanHaz("target.value")
        : Bro(event).iCanHaz("target.value") || Bro(event).iCanHaz("value");

    setVal(val);
  };

  useImperativeHandle(ref, () => {
    return {
      // isCancelAfterEnd: () => {
      //   const { dataType } = props;

      //   if (dataType === "DATE") {
      //     if (!val || val.length === 0) {
      //       return false;
      //     }
      //     console.log("=====>", val)
      //     return (
      //       val.length !== DATE_FORMAT.length ||
      //       !moment(val, DATE_FORMAT).isValid()
      //     );
      //   }

      //   if (!val || val.length === 0) {
      //     return false;
      //   }
      //   return false;
      // },

      getValue: () => val
    };
  });

  const getOptions = async () => {
    if (options) return;

    let { collectionName, data } = props;

    let url = `${collectionName}/search-all`;

    let obj = {};
    if (collectionName === "city") {
      url = `city/search-all`;
      obj = {
        filterModel: {
          countryName: {
            filterType: "exact",
            filter: data.countryName
          }
        }
      };
    }

    url = encodeURI(url);

    try {
      const resp = await API.post(url, obj);
      setAutoCompleteLoading(false);
      setOptions(resp.data.data);
    } catch (error) {
      console.log("error", error);
    }

    // Api.post(url, obj).subscribe(resp => {
    //   this.setState({ autoCompleteLoading: false, options: resp.data.data });
    // });
  };

  const getComponent = type => {
    if (type === "ROLE" || type === "BOOLEAN") {
      return (
        // <select value={val} onChange={this.handleChange}>
        // 	{(OPTIONS[type] || []).map((op, idx) => {
        // 		return (
        // 			<option key={idx} value={op.value}>
        // 				{op.label}
        // 			</option>
        // 		);
        // 	})}
        // </select>

        <FormControl style={formCtrlSelectStyle}>
          <Select value={val} onChange={handleChange} displayEmpty fullWidth>
            <MenuItem value="" disabled>
              <em>--Select--</em>
            </MenuItem>
            {(OPTIONS[type] || []).map((op, idx) => {
              return (
                <MenuItem key={idx} value={op.value}>
                  {op.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    }

    if (type === "DATE") {
      return (
        // <Form initialValues={{ startDate: val }}>
        //   {() => (
        //     <DateInput
        //       field="startDate"
        //       className="full-w"
        //       onChange={this.handleChange}
        //       hideLabel
        //     />
        //   )}
        // </Form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            disablePast
            autoOk
            variant="inline"
            format={DATE_FORMAT}
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={val || new Date()}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      );
    }

    if (type === "AUTO_COMPLETE" || type === "SELECT") {
      const { columnName } = props;

      if (autoCompleteLoading) {
        return <CircularProgress />;
      }

      return (
        // <select value={val} onChange={this.handleChange}>
        //   {(options || []).map((op, idx) => {
        //     return (
        //       <option key={idx} value={op[columnName]}>
        //         {op[columnName]}
        //       </option>
        //     );
        //   })}
        // </select>

        <FormControl style={formCtrlSelectStyle}>
          <Select value={val} onChange={handleChange} displayEmpty fullWidth>
            <MenuItem value="" disabled>
              <em>--Select--</em>
            </MenuItem>
            {(options || []).map((op, indx) => {
              if (typeof op === "string") {
                return (
                  <MenuItem key={indx} value={op}>
                    {op}
                  </MenuItem>
                );
              }

              return (
                <MenuItem key={indx} value={op[columnName]}>
                  {op[columnName]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    }

    if (type === "ENUM") {
      const { allValues } = props;
      return (
        // <select value={val} onChange={this.handleChange}>
        //   {(allValues || []).map((op, idx) => {
        //     return (
        //       <option key={idx} value={op}>
        //         {op}
        //       </option>
        //     );
        //   })}
        // </select>
        <FormControl style={formCtrlSelectStyle}>
          <Select value={val} onChange={handleChange} displayEmpty fullWidth>
            <MenuItem value="" disabled>
              <em>--Select--</em>
            </MenuItem>
            {(allValues || []).map((op, idx) => {
              return (
                <MenuItem key={idx} value={op}>
                  {op}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    }

    return (
      // <Form initialValues={{ val }}>
      //   <TextInput
      //     field="val"
      //     type={"text"}
      //     onChange={this.handleChange}
      //     className="full-w"
      //     hideLabel
      //   />
      // </Form>

      <input
        type="text"
        className=" form-control form-control-sm"
        onChange={handleChange}
        value={val || ""}
        ref={inputRef}
      />
    );
  };

  const { dataType = "TEXT" } = props;

  const type = TYPES[dataType] || dataType;
  if (dataType === "SELECT") {
    !props.allValues && getOptions();
  }

  return getComponent(type);
};

export default forwardRef(CustomEditor);
