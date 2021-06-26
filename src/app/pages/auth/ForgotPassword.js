import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import {
  Button,
  TextField,
  Typography
} from "@material-ui/core";
import clsx from "clsx";
import { Redirect } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as auth from "../../store/ducks/auth.duck";
import { forgotPassword } from "../../crud/auth.crud";

const ForgotPassword = (props) => {
    const { intl } = props;
    const [isRequested, setIsRequested] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingButtonStyle, setLoadingButtonStyle] = useState({
      paddingRight: "2.5rem"
    });

    if (isRequested) {
      return <Redirect to="/auth/forgot-done" />;
    }

    const enableLoading = () => {
      setLoading(true);
      setLoadingButtonStyle({ paddingRight: "3.5rem" });
    };

    const disableLoading = () => {
      setLoading(false);
      setLoadingButtonStyle({ paddingRight: "2.5rem" });
    };

    return (
      <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
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
              variant="h6"
              gutterBottom
            >
                Please, enter your email to reset your password:
            </Typography>

            <Formik
              initialValues={{ email: "" }}
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

                return errors;
              }}
              onSubmit={(values, { setStatus, setSubmitting }) => {
                enableLoading();
                console.log('values', values)
                forgotPassword(values.email)
                  .then((res) => {
                    setIsRequested(true);
                    console.log('res', res)
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
                <form onSubmit={handleSubmit} className="kt-form">
                  {status && (
                    <div role="alert" className="alert alert-danger">
                      <div className="alert-text">{status}</div>
                    </div>
                  )}

                  <div className="form-group">
                    <TextField
                      type="email"
                      label="Email"
                      margin="normal"
                      fullWidth={true}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </div>
                  
                  <div className="kt-login__actions">
                    <div></div>
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
      </div>
    );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
