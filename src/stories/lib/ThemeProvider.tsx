import React from 'react'
import { MuiThemeProvider } from "@material-ui/core";
import { themeMinimal } from "../../app/Store/themes/themeMinimal";
import { themeArgs, ThemeContext } from "../../app/Store/ThemeContext";

export const Provider: React.FC = (props) => {
  return (
    <MuiThemeProvider theme={themeMinimal}>
      <ThemeContext.Provider value={themeArgs}>
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
