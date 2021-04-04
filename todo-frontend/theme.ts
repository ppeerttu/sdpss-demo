import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import { deepOrange, purple } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: purple[400],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
