import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Typography
} from "@material-ui/core";

const RegisterDone = () => {
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
              You´re done!
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
            >
              Welcome to Vision Digital! You can now create your digital menú and share it.
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
                Finish
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default RegisterDone;