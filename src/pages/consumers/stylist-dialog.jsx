import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {
  Box,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  DialogActions,
  Button
} from "@material-ui/core";
import { toTitleCase } from "utils/app-util";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  },
  image: {
    objectFit: "cover",
    borderRadius: ".5rem"
  }
}));

const StylistDialog = ({
  open,
  handleClose,
  userData,
  selectedCategory,
  onCategorySelected
}) => {
  const categories = ["CELEBRITY", "PERSONAL", "INFLUENCER"];
  const classes = useStyles();
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <MuiDialogTitle id="customized-dialog-title">
          Stylist Information
        </MuiDialogTitle>
        {userData && (
          <>
            <MuiDialogContent>
              <Box my={4} display="flex" alignItems="center">
                <img
                  className={classes.image}
                  src={userData.stylistInfo.profilePicUrl}
                  height="200"
                  width="300"
                />

                <Box ml={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>
                        <strong>City</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{userData.stylistInfo.city}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <Typography>
                        <strong>Experience</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {userData.stylistInfo.experienceRangeObject.value}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <Typography>
                        <strong>Specialities</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {userData.stylistInfo.specialities
                          .map(item => toTitleCase(item))
                          .join(", ")}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <Typography>
                        <strong>Resume</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {userData.resumeUrl ? (
                          <a
                            target="_blank"
                            href={userData.stylistInfo.resumeUrl}
                          >
                            Resume
                          </a>
                        ) : (
                          "NA"
                        )}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <Typography>
                        <strong>Category</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={selectedCategory}
                          onChange={onCategorySelected}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {categories.map((item, i) => (
                            <MenuItem key={i} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box>
                <Typography>
                  <strong>About</strong>
                </Typography>
                <Typography>{userData.stylistInfo.aboutMe}</Typography>
              </Box>
            </MuiDialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default StylistDialog;
