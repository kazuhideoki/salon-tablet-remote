import { T_selected_theme } from '../../../../../../util/interface/Interface';
import { useChangeTheme } from '../../../../../hooks/userInfo/theme/useChangeTheme';

export const useHandleChange = () => {
  const changeTheme = useChangeTheme();

  return (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTheme((event.target as HTMLInputElement).value as T_selected_theme);
  };
};
