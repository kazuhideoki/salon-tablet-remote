import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

export const WebsiteThemeProvider: React.FC = (props) => (
  <MuiThemeProvider theme={websiteTheme}>{props.children}</MuiThemeProvider>
);

export const websiteTheme = createMuiTheme({
  typography: {
    fontFamily: [
      '"M PLUS Rounded 1c"',
      //  '"游ゴシック体"',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      //  main: "#ff9800", // オレンジ
      main: '#1a237e', // 紺色
    },
    secondary: {
      //  main: "#4fc3f7",
      main: '#fbc02d', // 黄色系オレンジ
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
      style: {
        backgroundImage:
          'linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)',
      },
    },
  },
});
