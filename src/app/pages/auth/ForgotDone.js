import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Typography
} from "@material-ui/core";

const ForgotDone = () => {
  const [login, setLogin] = useState(false);

  if (login) return <Redirect to="/auth/login" />

  return(
      <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
        <div className="kt-login__body">
          <div className="kt-login__form">
            <Typography
              variant="h2"
              gutterBottom
              color="primary"
            >
                We have sent you an email to rest your password
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
            >
                Please, check your imbox
            </Typography>
            <br/>
            <br/>
            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => setLogin(true) }
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ForgotDone;