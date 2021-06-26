import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic";
import "../../../_metronic/_assets/sass/pages/login/login-1.scss";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import ForgotDone from './ForgotDone';
import ResetPassword from './ResetPassword';
import ResetDone from './ResetDone';
import RegisterDone from './RegisterDone';

export default function AuthPage() {
  return (
    <>
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <div
          id="kt_login"
          className="kt-grid kt-grid--hor kt-grid--root kt-login kt-login--v1"
        >
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">
            <div
              className="kt-grid__item kt-grid__item--order-tablet-and-mobile-2 kt-grid kt-grid--hor kt-login__aside"
              style={{
                backgroundImage: `url(${toAbsoluteUrl("/media/img/fondo3.png")})`
              }}
            >
            </div>

            <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
              <Switch>
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/registration" component={Registration} />
                <Route path="/auth/register-done" component={RegisterDone} />
                <Route path="/auth/forgot-password" component={ForgotPassword} />
                <Route path="/auth/forgot-done" component={ForgotDone} />
                <Route path="/auth/reset-password/:email" component={ResetPassword} />
                <Route path="/auth/reset-done" component={ResetDone} />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
