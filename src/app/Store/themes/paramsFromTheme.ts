import { T_selected_theme } from "../Types";
import { TThemePrams } from "../ThemeContext";

export const generateParamsFromTheme = (selectedTheme: T_selected_theme): TThemePrams => {

  let params : TThemePrams
  switch (selectedTheme) {
    case 'nonTheme':
      params = {
        selected_theme: selectedTheme,
        theme_color: "#3f51b5",
        theme_font1: "Roboto",
        theme_font2: "Helvetica",
      };
      break;
    case 'minimal':
      params = {
        selected_theme: selectedTheme,
        theme_color: "#134E78",
        theme_font1: "futura-pt",
        theme_font2: '"ヒラギノ角ゴ ProN"',
      };
      break;
  
    default:
      break;
  }

  return params
}