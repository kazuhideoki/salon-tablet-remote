import React from 'react'
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { themeMinimal } from "../../app/Store/themes/themeMinimal";
import { useThemeArgs, ThemeContext } from "../../app/Store/ThemeContext";
import { minimal } from './themeMinimal';

export const Provider: React.FC = (props) => {
  return (
    <MuiThemeProvider theme={minimal}>
      <CssBaseline />
      <ThemeContext.Provider value={useThemeArgs('medium')}>
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
