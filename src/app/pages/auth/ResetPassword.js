import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Formik } from "formik";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import {
  Button,
  TextField,
  Typography
} from "@material-ui/core";
import clsx from "clsx";
import * as auth from "../../store/ducks/auth.duck";
import { resetPassword } from "../../crud/auth.crud";

const ResetPassword = (props) => {
  const { intl } = props;
  const { email } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });
  const [reset, setReset] = useState(false);

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  if (reset) return <Redirect to="/auth/reset-done" />;

  return (
    <>
      <div className="kt-login__body">
        <div className="kt-login__form">
          <Typography
            variant="h2"
            gutterBottom
            color="primary"
          >
              Reset password
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
          >
              Please, introduce your new password:
          </Typography>

          <Formik
            initialValues={{
              password: '',
              confimPass: ''
            }}
            validate={values => {
              const errors = {};

              if (!values.password) {
                errors.password = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              return errors;
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              enableLoading();
              resetPassword(email, values.password)
                .then((res) => {
                  console.log('res', res);
                  setReset(true);
                })
                .catch(() => {
                  disableLoading();
                  setSubmitting(false);
                  setStatus(
                    intl.formatMessage(
                      { id: "AUTH.VALIDATION.NOT_FOUND" },
                      { name: values.email }
                    )
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
                <div className="form-group">
                  <TextField
                    type="password"
                    margin="normal"
                    placeholder="Password confimation"
                    name="confimPass"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confimPass}
                    helperText={touched.confimPass && errors.confimPass}
                    error={Boolean(touched.confimPass && errors.confimPass)}
                  />
                </div>
                <br/>
                <br/>
                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                    className={`btn-elevate kt-login__btn-primary ${clsx(
                      {
                        "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                      }
                    )}`}
                    style={loadingButtonStyle}
                  >
                    Reset password
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
  )(ResetPassword)
);
