import { useChangeThemeColor } from '../../../../../hooks/userInfo/theme/useChangeThemeColor';
import { TColor } from '../ManageTheme';

export const useHandleChangeThemeColor = () => {
  const changeThemeColor = useChangeThemeColor();

  return async (value: TColor) => {
    try {
      await changeThemeColor(value);
    } catch (err) {}
  };
};
