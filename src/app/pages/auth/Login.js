/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import clsx from "clsx";
import * as auth from "../../store/ducks/auth.duck";
import { login } from "../../crud/auth.crud";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "#eb5e67"
  }
}));

function Login(props) {
  const classes = useStyles();
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });
  const [remember, setRemember] = useState(false);

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  const handleChangeRemember = (event) => {
    setRemember(!remember);
  };

  return (
    <>
      <div className="kt-login__body">
        <div className="kt-login__form">
          <Typography
            variant="h2"
            gutterBottom
            color="primary"
          >
              Sign in
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
          >
              Sign in and start managing your menus!
          </Typography>

          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validate={values => {
              const errors = {};

              if (!values.email) {
                // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_FIELD"
                });
              }

              if (!values.password) {
                errors.password = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              return errors;
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              enableLoading();
              console.log('values', values)
              
              login(values.email, values.password)
                .then(({ data: { auth, token, usuario } }) => {
                  console.log({auth, token, usuario})
                  disableLoading();
                  if (auth) {
                    props.login(token, usuario);
                  }
                })
                .catch(() => {
                  disableLoading();
                  setSubmitting(false);
                  setStatus(
                    intl.formatMessage({
                      id: "AUTH.VALIDATION.INVALID_LOGIN"
                    })
                  );
                });
            }}
          >
            {({
              values,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form
                noValidate={true}
                autoComplete="off"
                className="kt-form"
                onSubmit={handleSubmit}
              >
                {status && (
                  <div role="alert" className="alert alert-danger">
                    <div className="alert-text">{status}</div>
                  </div>
                )}

                <div className="form-group">
                  <TextField
                    type="email"
                    placeholder="Email"
                    margin="normal"
                    name="email"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    helperText={touched.email && errors.email}
                    error={Boolean(touched.email && errors.email)}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    type="password"
                    margin="normal"
                    placeholder="Password"
                    name="password"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    helperText={touched.password && errors.password}
                    error={Boolean(touched.password && errors.password)}
                  />
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={
                          <Checkbox
                            checked={remember}
                            onChange={handleChangeRemember}
                            name="remember"
                            color="primary"
                          />
                        }
                        label="Remember me"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <Link
                        to="/auth/forgot-password"
                      >
                        <Typography 
                          variant="button" 
                          gutterBottom
                          color="primary"
                          variant="subtitle1"
                          className="mt-2"
                        >
                            Forgot password?
                        </Typography>
                      </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography 
                      variant="button" 
                      gutterBottom
                      variant="subtitle1"
                    >
                        If you don´t have account &nbsp;
                        <Link
                          to="/auth/registration"
                          color="primary"
                          className={classes.link}
                        >
                          click here
                        </Link>
                    </Typography>
                  </Grid>
                </Grid>

                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled={isSubmitting}
                    className={`btn-elevate kt-login__btn-primary ${clsx(
                      {
                        "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                      }
                    )}`}
                    style={loadingButtonStyle}
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default injectIntl(
  connect(
    null,
    auth.actions
  )(Login)
);
