import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  page: theme.page
}));

const PageContent = props => {
  const classes = useStyles();

  return <Paper className={classes.page}>{props.children}</Paper>;
};

export default PageContent;
