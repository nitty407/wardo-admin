import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
// import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
// import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "context/UserContext";

import images from "utils/get-images";
import { exp_email } from "utils/validations";

const Login = () => {
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const emailValue = watch("email");
  const passwordValue = watch("password");

  // global
  const userDispatch = useUserDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);

  const onLoginSubmit = ({ email, password }) =>
    loginUser(userDispatch, { email, password }, setIsLoading, setError);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img
          src={images["logos/logo-white.png"]}
          alt="logo"
          className={classes.logotypeImage}
        />
        {/* <Typography className={classes.logotypeText}>Wardo Admin</Typography> */}
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            {/* <Tab label="New User" classes={{ root: classes.tab }} /> */}
          </Tabs>
          {activeTabId === 0 && (
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onLoginSubmit)}
            >
              {/*<Typography variant="h1" className={classes.greeting}>
                  Welcome!
                </Typography>
                 <Button size="large" className={classes.googleButton}>
                  <img src={google} alt="google" className={classes.googleIcon} />
                  &nbsp;Sign in with Google
                </Button>
                <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  <Typography className={classes.formDividerWord}>or</Typography>
                  <div className={classes.formDivider} />
                </div> */}
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                inputRef={register({
                  required: true,
                  pattern: { value: exp_email, message: "invalid email" }
                })}
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                margin="normal"
                name="email"
                placeholder="Email Adress"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
              />
              <TextField
                id="password"
                inputRef={register({ required: true })}
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                margin="normal"
                name="password"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      emailValue.length === 0 || passwordValue.length === 0
                    }
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                {/* <Button
                    color="primary"
                    size="large"
                    className={classes.forgetButton}
                  >
                    Forget Password
                  </Button> */}
              </div>
            </form>
          )}
          {/* {activeTabId === 1 && (
            <>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </>
          )} */}
        </div>
        {/* <Typography color="primary" className={classes.copyright}>
          © 2014-2019 Flatlogic, LLC. All rights reserved.
        </Typography> */}
      </div>
    </Grid>
  );
};

export default withRouter(Login);
