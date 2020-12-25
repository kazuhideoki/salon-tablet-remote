import { generateSecondaryColor } from "../../../../../lib/color/generateSecondaryColor";
import { useChangeThemeColor } from "../../../../ActionCreator/user/useChangeThemeColor";
import { TColor } from "../view/ManageTheme";
var colorConvert = require("color-convert");


export const useHandleChangeThemeColor = () => {
  const changeThemeColor = useChangeThemeColor();

  return async (value: TColor) => {
    const isChanged = await changeThemeColor(value);
    if (isChanged) {
      const params = {
        hex: value.hex,
        hex2: `#${colorConvert.hsl.hex(generateSecondaryColor(value.hsl))}`,
      };
    }
  };
}