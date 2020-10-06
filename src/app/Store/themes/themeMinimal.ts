import { createMuiTheme } from "@material-ui/core"
import { TThemeParams } from "../ThemeContext"
import { Deprecated_FontNameToFontFamily } from "./fonts";
import { secondaryColor } from "../../../lib/color/secondaryColor";

const theme = createMuiTheme()

export const themeMinimal = (params: TThemeParams) =>
         createMuiTheme({
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
                   padding: "0.25em 0.5em" /*上下 左右の余白*/,
                   background: "transparent" /*背景透明に*/,
                   borderLeft: "solid 5px" /*左線*/,
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
               Deprecated_FontNameToFontFamily(params.theme_font1),
               // '"M PLUS Rounded 1c"',
               Deprecated_FontNameToFontFamily(params.theme_font2),
               '"游ゴシック体"',
               "sans-serif",
             ].join(","),
           },
           palette: {
             primary: {
               main: params.theme_color,
             },
             secondary: {
               //  main: "#b0c4de", // lightsteelblue
               main: secondaryColor(params.theme_color),
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
             },
           },
         });