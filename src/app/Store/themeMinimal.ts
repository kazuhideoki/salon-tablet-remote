import { createMuiTheme } from "@material-ui/core";

export const themeMinimal = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          // WebkitFontSmoothing: 'auto',
          fontFamily: ['"ヒラギノ角ゴ ProN"', "futura-pt"].join(","),
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "futura-pt",
      '"ヒラギノ角ゴ ProN"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});