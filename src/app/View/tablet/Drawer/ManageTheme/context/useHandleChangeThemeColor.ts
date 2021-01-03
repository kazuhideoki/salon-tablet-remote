import { generateSecondaryColor } from '../../../../../../lib/color/generateSecondaryColor';
import { useChangeThemeColor } from './lib/useChangeThemeColor';
import { TColor } from '../view/ManageTheme';
const colorConvert = require('color-convert');

export const useHandleChangeThemeColor = () => {
  const changeThemeColor = useChangeThemeColor();

  return async (value: TColor) => {
    try {
      await changeThemeColor(value);
      // const params = {
      //   hex: value.hex,
      //   hex2: `#${colorConvert.hsl.hex(generateSecondaryColor(value.hsl))}`,
      // };
    } catch (err) {}
  };
};
