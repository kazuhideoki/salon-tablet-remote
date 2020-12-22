import { T_selected_theme } from "../Types";
import { TThemeParams } from "../ThemeContext";
import { themeWhite } from "./themeWhite";
import { themeNatural } from "./themeNatural";
import { themeDefault } from "./themeDefault";

const defaultTheme: TThemeParams = {
  selected_theme: 'default',
  theme_color: "#311b92",
  theme_font1: "未設定",
  theme_font2: '"M PLUS Rounded 1c"',
  theme_font_heading: '"M PLUS Rounded 1c"',
};  

const white: TThemeParams = {
  selected_theme: 'white',
  theme_color: "#263238",
  theme_font1: "未設定",
  theme_font2: '"M PLUS Rounded 1c"',
  theme_font_heading: '"M PLUS Rounded 1c"',
};             

const natural: TThemeParams = {
  selected_theme: "natural",
  theme_color: "#5d4037",
  theme_font1: "未設定",
  theme_font2: '"Noto Serif JP"',
  theme_font_heading: '"Noto Serif JP"',
};

export const switchingTheme = (params: TThemeParams) => {
  // user_infoのselected_themeをもとにテーマを適応
  switch (params.selected_theme) {
    case "default":
      return themeDefault(params);
    case "white":
      return themeWhite(params);
    case "natural":
      return themeNatural(params);

    default:
      return themeDefault(params);
  }
};

export const generateDefaultParamsFromTheme = (
         selectedTheme: T_selected_theme
       ): TThemeParams => {
         switch (selectedTheme) {
           case "default":
             return defaultTheme;
           case "white":
             return white;
           case "natural":
             return natural;

           default:
             return defaultTheme;
         }
       };

export const isThemeParamsChanged = (themeParams: TThemeParams) => {
  const originalThemeParams = generateDefaultParamsFromTheme(themeParams.selected_theme)

  let resultArr: boolean[] = []
  for (const [key, value] of Object.entries(themeParams)) {
    resultArr.push(themeParams[key] !== originalThemeParams[key]);
  } 

  const result = resultArr.includes(true);

  return result;
}