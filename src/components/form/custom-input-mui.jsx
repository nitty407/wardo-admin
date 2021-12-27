import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = ({ spacing, palette: { primary } }) => ({
  root: { paddingBottom: spacing(2) },
  label: {
    color: "#1A1A1A",
    textTransform: "none",
    font: "16px 'Avenir LT Pro 85 Heavy'"
  },

  shrink: {
    transform: "translate(0, 1.5px) scale(1)"
  },

  input: {
    top: spacing(2),
    border: `1px solid #D0D0D0`,
    borderRadius: "14px",
    outline: `none`, // we use a transparent outline here so the component doesn't move when focused
    padding: `${spacing(1)}px ${spacing(2)}px`,
    transition: "all .3s ease-in-out",

    "&$focused": {
      border: `1px solid ${primary.main}`,
      boxShadow: `0 0 5px ${primary.main}`
    }
  },

  focused: {} // we have to pass in this focused class to make the focused state rule above work
});

const CustmTextInp = ({ classes, ...restProps }) => {
  return (
    <TextField
      fullWidth
      classes={{ root: classes.root }}
      InputLabelProps={{
        shrink: true, // keep the label in the top left corner and don't shrink on input focus
        classes: {
          root: classes.label,
          shrink: classes.shrink
        }
      }}
      InputProps={{
        classes: {
          root: classes.input,
          focused: classes.focused // we can't forget to pass this in or &$focused in our input class won't work
        },
        disableUnderline: true // remove the underline
      }}
      {...restProps}
    />
  );
};

export default withStyles(styles)(CustmTextInp);
