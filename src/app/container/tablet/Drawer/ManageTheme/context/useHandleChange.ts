import { useChangeTheme } from "./lib/useChangeTheme";
import { T_selected_theme } from "../../../../../Store/Interface";

export const useHandleChange = () => {
  const changeTheme = useChangeTheme();

  return (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTheme((event.target as HTMLInputElement).value as T_selected_theme);
  };
}