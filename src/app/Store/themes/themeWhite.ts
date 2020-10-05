import { createMuiTheme } from "@material-ui/core";
import { TThemeParams } from "../ThemeContext";
import { FontNameToFontFamily } from "./fonts";
import { secondaryColor } from "../../../lib/color/secondaryColor";

const theme = createMuiTheme();

export const themeWhite = (params: TThemeParams) =>
         createMuiTheme({
           overrides: {
             MuiCssBaseline: {
               "@global": {
                 a: {
                   color: "##607d8b",
                 },
                 h1: {
                   fontWeight: "400",
                 },
                 h2: {
                   fontWeight: "400",
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
               FontNameToFontFamily(params.theme_font1),
               // '"M PLUS Rounded 1c"',
               FontNameToFontFamily(params.theme_font2),
               '"游ゴシック体"',
               "sans-serif",
             ].join(","),
           },
           palette: {
             primary: {
               main: params.theme_color,
             },
             secondary: {
               main: secondaryColor(params.theme_color),
             },
             text: {
               primary: 'rgba(0, 0, 0, 0.95)',
               secondary: 'rgba(0, 0, 0, 0.77)',
               disabled: 'rgba(0, 0, 0, 0.54)',
               hint: 'rgba(0, 0, 0, 0.54)',

             },
           },

           props: {
             MuiPaper: {
               variant: "elevation",
               elevation: 2,
             },
             MuiTextField: {
               variant: "standard",
             },
             MuiButton: {
               variant: "outlined",
             },
             MuiFormControl: {
               variant: "standard",
             },
           },
         });
