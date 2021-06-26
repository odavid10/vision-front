import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic";
import MisMenus from "./MisMenus";
import CrearMenu from './CrearMenu';
import CrearPlatillo from './CrearPlatillo';
import ConfigMenu from './ConfigMenu';
import Owner from "../config/Owner";
import Business from "../config/Business";

export default function HomePage() {

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/mismenus" />
        }
        <Route path="/mismenus" component={MisMenus} />
        <Route path="/crearmenu" component={CrearMenu} />
        <Route path="/platillo/:menu/:seccion" component={CrearPlatillo} />
        <Route path="/menu/:id" component={ConfigMenu} />
        <Route path="/configuration/owner" component={Owner} />
        <Route path="/configuration/business" component={Business} />
        <Redirect to="/error/error-v4" />
      </Switch>
    </Suspense>
  );
}
