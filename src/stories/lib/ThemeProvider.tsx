import React from 'react'
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { themeMinimal } from "../../app/Store/themes/themeMinimal";
import { themeArgs, ThemeContext } from "../../app/Store/ThemeContext";
import { minimal } from './themeMinimal';

export const Provider: React.FC = (props) => {
  return (
    <MuiThemeProvider theme={minimal}>
      <CssBaseline />
      <ThemeContext.Provider value={themeArgs(false)}>
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
