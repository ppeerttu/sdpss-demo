import React from "react";

import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Head from "next/head";

import { AppStateProvider } from "../src/state";
import theme from "../src/theme";

function MyApp({ Component, pageProps }): JSX.Element {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Todos</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <AppStateProvider>
            <Component {...pageProps} />
          </AppStateProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
