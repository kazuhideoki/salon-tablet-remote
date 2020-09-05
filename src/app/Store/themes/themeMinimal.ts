import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme()

export const themeMinimal = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          color: "#134e78",
        },
        h1: {
          fontWeight: "400",
          borderBottom: "solid 3px black",
        },
        h2: {
          fontWeight: "400",
          padding: "0.25em 0.5em",/*上下 左右の余白*/
          background: "transparent",/*背景透明に*/
          borderLeft: "solid 5px",/*左線*/
        },
        
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: theme.spacing(3),
      },
    },
    MuiDrawer: {
      paper: {
        MozBorderRadiusTopright: theme.spacing(3),
        MozBorderRadiusBottomright: theme.spacing(3),
      }
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
   palette: {
    primary: {
      main: "#134e78",
    },
    secondary: {
      main: '#b0c4de', // lightsteelblue
    },
    // tonalOffset: 0.2,
  },

  props: {
    MuiPaper: {
      variant: "elevation",
      elevation: 3,
    },
    MuiTextField: {
      variant: "standard",
    },
    MuiButton: {
      variant: "outlined",
    },
    MuiFormControl: {
      variant: "standard",
    }
  }
})