import { createMuiTheme } from "@material-ui/core";
import { TThemeParams } from "../ThemeContext";
import { Deprecated_FontNameToFontFamily } from "./fonts";
import { secondaryColor } from "../../../lib/color/secondaryColor";

const theme = createMuiTheme();

export const themeNatural = (params: TThemeParams) =>
         createMuiTheme({
           overrides: {
             MuiCssBaseline: {
               "@global": {
                 a: {
                   color: "##607d8b",
                 },
                 h1: {
                   fontWeight: "500",
                 },
                 h2: {
                   fontWeight: "500",
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
               },
             },
           },

           typography: {
             fontFamily: [
               // "未設定",
               params.theme_font1,
               // セリフ体 源ノ明朝
               params.theme_font2,
               "serif",
             ].join(","),
             fontWeightLight: 200,
             fontWeightRegular: 300,
             fontWeightMedium: 400,
             fontWeightBold: 500,
             //  h1: {
             //    fontWeight:
             //  },
             //  h2: {
             //    fontWeight:
             //  },
             //  h3: {
             //    fontWeight:
             //  },
             h4: {
               fontWeight: 400,
             },
             h5: {
               fontWeight: 400,
             },
             h6: {
               fontWeight: 500,
             },
           },
           palette: {
             primary: {
               main: params.theme_color,
             },
             secondary: {
               main: secondaryColor(params.theme_color),
             },
             text: {
               primary: "rgba(0, 0, 0, 0.95)",
               secondary: "rgba(0, 0, 0, 0.77)",
               disabled: "rgba(0, 0, 0, 0.54)",
               hint: "rgba(0, 0, 0, 0.54)",
             },
             background: {
               paper: "#fffff9",
               default: "#fbfbf4",
             },
           },

           props: {
             MuiPaper: {
               variant: "elevation",
               elevation: 5,
             },
             MuiTextField: {
               variant: "standard",
             },
             MuiButton: {
               variant: "contained",
             },
             MuiFormControl: {
               variant: "filled",
             },
           },
         });
