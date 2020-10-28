import { T_selected_theme } from "../Types";
import { TThemeParams } from "../ThemeContext";
import { selectedIconReducer } from "../../Reducer/selectedIconReducer";

const white: TThemeParams = {
  selected_theme: 'white',
  theme_color: "#263238",
  theme_font1: "未設定",
  theme_font2: '"M PLUS Rounded 1c"',
  theme_font_heading: '"M PLUS Rounded 1c"',
};             

const natural: TThemeParams = {
  selected_theme: 'natural',
  theme_color: "#5d4037",
  theme_font1: "未設定",
  theme_font2: '"Noto Serif JP"',
  theme_font_heading: '"M PLUS Rounded 1c"',
};

export const generateDefaultParamsFromTheme = (
         selectedTheme: T_selected_theme
       ): TThemeParams => {
         switch (selectedTheme) {
           case "white":
             return white;
           case "natural":
             return natural;

           default:
             break;
         }
       };

export const isThemeParamsChanged = (themeParams: TThemeParams) => {
  console.log('themeParamsは ' + JSON.stringify(themeParams))
  const originalThemeParams = generateDefaultParamsFromTheme(themeParams.selected_theme)

  let resultArr: boolean[] = []
  for (const [key, value] of Object.entries(themeParams)) {
    console.log('keyは ' + key)
    resultArr.push(themeParams[key] !== originalThemeParams[key]);
  } 

  console.log("resultArrは " + JSON.stringify(resultArr));

  const result = resultArr.includes(true);

  console.log('resultは ' + result)

  return result;
}