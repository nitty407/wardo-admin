import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  toastsContainer: {
    width: 400,
    marginTop: theme.spacing(2),
    right: 0
  },
  notification: {
    display: "flex",
    alignItems: "center",
    background: "transparent",
    boxShadow: "none",
    overflow: "visible"
  },
  notificationCloseButton: {
    position: "absolute",
    right: theme.spacing(2)
  },
  progress: {
    visibility: "hidden"
  }
}));
