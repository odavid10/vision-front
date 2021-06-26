import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { injectIntl } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import * as auth from "../../store/ducks/auth.duck";
import { register } from "../../crud/auth.crud";

const Registration = (props) => {
  const { intl } = props;
  const [business, setBusiness] = useState(false);
  const [registrado, setRegistrado] = useState(false);

  if (registrado) return <Redirect to="/auth/register-done" />

  return (
    <div className="kt-login__body">
      <div className="kt-login__form">
        <div className="kt-login__title">
          <Grid container >
            <Grid item xs={5}>
              <Typography
                variant="h2"
                gutterBottom
                color="primary"
              >
                  {!business ? 'Step 1 |' : `Step 2 |`}
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography
                variant="h4"
                gutterBottom
                color="primary"
                className="pt-4"
              >
                  {!business ? 'Business owner' : 'Knowing the business'}
              </Typography>
            </Grid>
          </Grid>
        </div>

        <Formik
          initialValues={{
            email: "",
            fullname: "",
            username: "",
            telefono: "",
            password: "",
            confirmPassword: "",
            compania: '',
            categoria: '',
            direccion: ''
          }}
          validate={values => {
            const errors = {};

            if (!values.email) {
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

            if (!values.fullname) {
              errors.fullname = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.username) {
              errors.username = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.password) {
              errors.password = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            } else if (values.password !== values.confirmPassword) {
              errors.confirmPassword =
                "Password and Confirm Password didn't match.";
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            console.log('values', values);
            register(
              values.email,
              values.fullname,
              values.telefono,
              'merchant',
              values.username,
              values.password,
              values.compania,
              values.categoria,
              values.direccion
            )
            //   .then(({ data }) => {
            //     console.log(data);
                setRegistrado(true);
            //   })
            //   .catch(() => {
            //     setSubmitting(false);
            //     setStatus(
            //       intl.formatMessage({
            //         id: "AUTH.VALIDATION.INVALID_LOGIN"
            //       })
            //     );
            //   });
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
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              {status && (
                <div role="alert" className="alert alert-danger">
                  <div className="alert-text">{status}</div>
                </div>
              )}

              {!business ? (
                <React.Fragment>
                  <div className="form-group mb-0">
                    <TextField
                      margin="normal"
                      placeholder="Fullname"
                      className="kt-width-full"
                      name="fullname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullname}
                      helperText={touched.fullname && errors.fullname}
                      error={Boolean(touched.fullname && errors.fullname)}
                    />
                  </div>

                  <div className="form-group mb-0">
                    <TextField
                      placeholder="Email"
                      margin="normal"
                      className="kt-width-full"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </div>

                  <div className="form-group mb-0">
                    <TextField
                      margin="normal"
                      placeholder="Phone"
                      className="kt-width-full"
                      name="telefono"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.telefono}
                      helperText={touched.telefono && errors.telefono}
                      error={Boolean(touched.telefono && errors.telefono)}
                    />
                  </div>

                  <div className="form-group mb-0">
                    <TextField
                      margin="normal"
                      placeholder="Username"
                      className="kt-width-full"
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      helperText={touched.username && errors.username}
                      error={Boolean(touched.username && errors.username)}
                    />
                  </div>

                  <div className="form-group mb-0">
                    <TextField
                      type="password"
                      margin="normal"
                      placeholder="Password"
                      className="kt-width-full"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      helperText={touched.password && errors.password}
                      error={Boolean(touched.password && errors.password)}
                    />
                  </div>

                  <div className="form-group">
                    <TextField
                      type="password"
                      margin="normal"
                      placeholder="Confirm Password"
                      className="kt-width-full"
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
                    />
                  </div>
                </React.Fragment>
                ) : (
                <React.Fragment>
                  <div className="form-group mb-0">
                    <TextField
                      margin="normal"
                      placeholder="Company name"
                      className="kt-width-full"
                      name="compania"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.compania}
                      helperText={touched.compania && errors.compania}
                      error={Boolean(touched.compania && errors.compania)}
                    />
                  </div>

                  <div className="form-group mb-0">
                    <TextField
                      placeholder="Business category"
                      margin="normal"
                      className="kt-width-full"
                      name="categoria"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.categoria}
                      helperText={touched.categoria && errors.categoria}
                      error={Boolean(touched.categoria && errors.categoria)}
                    />
                  </div>

                  <div className="form-group mb-0">
                    <TextField
                      margin="normal"
                      placeholder="Business address"
                      className="kt-width-full"
                      name="direccion"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.direccion}
                      helperText={touched.direccion && errors.direccion}
                      error={Boolean(touched.direccion && errors.direccion)}
                    />
                  </div>
                </React.Fragment>
              )}

              <div className="kt-login__actions">
                {!business ? (
                  <Link to="/auth">
                    <Button className="btn btn-secondary btn-elevate kt-login__btn-secondary">
                      Back
                    </Button>
                  </Link>
                  ) : (
                  <Button className="btn btn-secondary btn-elevate kt-login__btn-secondary"
                    onClick={() => setBusiness(false)}
                  >
                      Back
                  </Button>
                )}

                {!business && (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className="btn-elevate kt-login__btn-secondary"
                    onClick={() => setBusiness(true)}
                  >
                    Next
                  </Button>
                )}

                {business && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled={isSubmitting}
                    className="btn-elevate kt-login__btn-secondary"
                  >
                    Next
                  </Button>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default injectIntl(
  connect(
    null,
    auth.actions
  )(Registration)
);
