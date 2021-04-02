import React from "react";
import { AppStateProvider } from "../state";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppStateProvider>
      <Component {...pageProps} />
    </AppStateProvider>
  );
}

export default MyApp;
