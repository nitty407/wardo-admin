import React from "react";

import clsx from "clsx";
import { Button, withStyles } from "@material-ui/core";

const styles = theme => ({
  default: {
    padding: ".8em 1em",
    borderRadius: "18px",
    boxShadow: "0px 9px 28px #382D7C29",
    textTransform: "none",
    font: "16px 'Avenir LT Pro 95 Black'",
    lineHeight: 1
  }
});

const SubmitBtnMui = ({ className, classes, children, ...restProps }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      className={clsx(classes.default, className)}
      disableElevation
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default withStyles(styles)(SubmitBtnMui);
