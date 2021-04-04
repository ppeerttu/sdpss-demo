import React from "react";

import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Head from "next/head";
import { AppStateProvider } from "../state";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
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
        <CssBaseline />
        <AppStateProvider>
          <Component {...pageProps} />
        </AppStateProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
