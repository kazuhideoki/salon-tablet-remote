import React from 'react'
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { themeMinimal } from "../../app/Store/themes/themeMinimal";
import { themeArgs, ThemeContext } from "../../app/Store/ThemeContext";

export const Provider: React.FC = (props) => {
  return (
    <MuiThemeProvider theme={themeMinimal}>
      <CssBaseline />
      <ThemeContext.Provider value={themeArgs(false)}>
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
