import React from "react";
import { Store } from "../../Store/Store";
import { T_selected_theme, T_theme_color } from "../../Store/Types";
import {
  apiUserInfoThemeColor,
  T_user_info_theme_color,
} from "../../../pages/api/user_info/theme/color";
import { TColor } from "../../View/Drawer/ManageTheme/ManageTheme";


export const useChangeThemeColor = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { user_id } = appState.userInfo;

  return async (color: TColor) => {

    const params: T_user_info_theme_color = {
      user_id,
      theme_color: color.hex,
    };

    const data = await apiUserInfoThemeColor(params);

    if (data.err === true) {
      alert("変更できませんでした");
      return false
    } else {
      dispatchAppState({
        // SET_THEMEではparamが増える度に更新の必要あり
        type: "SET_THEME_COLOR",
        payload: { themeColor: color.hex },
      });

      return true
    }
  };
};
