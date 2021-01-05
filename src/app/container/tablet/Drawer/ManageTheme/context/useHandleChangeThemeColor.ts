import { useChangeThemeColor } from '../../../../../hooks/userInfo/theme/useChangeThemeColor';
import { Color } from '../ManageTheme';

export const useHandleChangeThemeColor = () => {
  const changeThemeColor = useChangeThemeColor();

  return async (value: Color) => {
    try {
      await changeThemeColor(value);
    } catch (err) {}
  };
};
