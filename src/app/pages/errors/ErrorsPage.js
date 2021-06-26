import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ErrorPage4 } from "./ErrorPage4";

export default function ErrorsPage() {
  return (
      <Switch>
        <Redirect from="/error" exact={true} to="/error/error-v4" />
        <Route path="/error/error-v4" component={ErrorPage4} />
      </Switch>
  );
}
