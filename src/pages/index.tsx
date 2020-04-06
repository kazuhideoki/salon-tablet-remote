import React from "react";
import { render } from "react-dom";
import { App } from "../App";
import { ThemeProvider } from "../modules/ThemeContext";
import { StoreContextProvider } from "../modules/Store";
// import * as serviceWorker from "../serviceWorker";

const Index = () =>(

  <ThemeProvider>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </ThemeProvider>
)

export default Index
// serviceWorker.register();
