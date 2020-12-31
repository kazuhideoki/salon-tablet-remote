import { T_theme_color } from "../../app/Store/Interface"
import { generateSecondaryColor } from "./generateSecondaryColor";
var colorConvert = require("color-convert");


export const secondaryColor = (theme_color: T_theme_color) => {
  
  return `#${colorConvert.hsl.hex(generateSecondaryColor(colorConvert.hex.hsl(theme_color)))}`
}