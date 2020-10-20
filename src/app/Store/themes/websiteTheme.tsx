import React from 'react'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

export const WebsiteThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={websiteTheme}>{children}</MuiThemeProvider>
);

export const websiteTheme = createMuiTheme({
         typography: {
           fontFamily: [
             '"M PLUS Rounded 1c"',
            //  '"游ゴシック体"',
             "sans-serif",
           ].join(","),
         },
         palette: {
           primary: {
             //  main: "#ff9800", // オレンジ
             main: "#ffeb3b", //黄色
           },
           secondary: {
             //  main: "#4fc3f7",
             main: "#4dd0e1", // ターコイズブルー
           },
         },
       });