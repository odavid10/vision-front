/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import store, { persistor } from "./app/store/store";
import App from "./App";
import "./index.scss"; // Standard version
// import "./sass/style.react.rtl.css"; // RTL version
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_metronic/_assets/plugins/line-awesome/css/line-awesome.css";
import "./_metronic/_assets/plugins/flaticon/flaticon.css";
import "./_metronic/_assets/plugins/flaticon2/flaticon.css";
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

ReactDOM.render(
  <App
    store={store}
    persistor={persistor}
    basename={PUBLIC_URL}
  />,
  document.getElementById("root")
);
