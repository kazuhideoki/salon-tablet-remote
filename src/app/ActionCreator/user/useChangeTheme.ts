import React from "react";
import { Store } from "../../Store/Store";
import {
  T_selected_theme,
} from "../../Store/Types";
import { apiUserInfoChangeTheme, T_user_info_change_theme } from "../../../pages/api/user_info/theme/change_theme";
import { generateParamsFromTheme } from "../../Store/themes/paramsFromTheme";

export const useChangeTheme = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { user_id } = appState.userInfo;
  
  return async (selectedTheme: T_selected_theme) => {

    const themeParams = generateParamsFromTheme(selectedTheme);

    const params = {
      user_id,
      themeParams: themeParams,
    };
    
    console.log("useChangeThemeのparamsは " + JSON.stringify(params));

    const data = await apiUserInfoChangeTheme(params);

    if (data.err === true) {
      alert("変更できませんでした");
    } else {
      dispatchAppState({
        // SET_THEMEではparamが増える度に更新の必要あり
        type: "SET_THEME",
        payload: { themeParams: themeParams },
      });
     
    }
  };
};
