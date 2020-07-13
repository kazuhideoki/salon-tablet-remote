import { createMuiTheme } from "@material-ui/core";

export const nonTheme = createMuiTheme({
  // overrides: {
  //   MuiCssBaseline: {
  //     "@global": {
  //       a: {
  //         color: "#134e78",
  //       }
  //     },
  //   },
  // },
  
  props: {
    MuiPaper: {
      variant: "outlined",
    },
    MuiTextField: {
      variant: "outlined",
    },
    MuiButton: {
      variant: "contained",
    },
    MuiFormControl: {
      variant: "outlined",
    }
  },
});
