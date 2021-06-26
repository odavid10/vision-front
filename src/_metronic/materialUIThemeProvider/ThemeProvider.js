import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme(
  {
    palette: {
      contrastThreshold: 2,
      primary: {
        main: "#eb5e67"
      },
      secondary: {
        main: "#7dbd61",
      },
      warning: {
        main: "#fbbf4d",
      },
      error: {
        main: "#fd397a"
      }
    },
    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        // The properties to apply
        disableRipple: true // No more ripple, on the whole application 💣!
      },

      // Set default elevation to 1 for popovers.
      MuiPopover: {
        elevation: 1
      }
    }
  }
);

export default function ThemeProvider(props) {
  const { children } = props;

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
