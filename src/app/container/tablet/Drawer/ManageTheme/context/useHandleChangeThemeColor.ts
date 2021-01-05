import { useChangeThemeColor } from './lib/useChangeThemeColor';
import { TColor } from '../ManageTheme';

export const useHandleChangeThemeColor = () => {
  const changeThemeColor = useChangeThemeColor();

  return async (value: TColor) => {
    try {
      await changeThemeColor(value);
    } catch (err) {}
  };
};
