import React from "react";
import { Store } from "../../Store/Store";
import {
  T_selected_theme,
} from "../../Store/Types";
import { apiUserInfoChangeTheme, T_user_info_change_theme } from "../../../pages/api/user_info/change_theme";

export const useChangeTheme = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { user_id } = appState.userInfo;
  
  return async (selectedTheme: T_selected_theme) => {
    
    const params: T_user_info_change_theme = {
      user_id,
      selectedTheme,
    };
    console.log("useChangeThemeのparamsは " + JSON.stringify(params));

    const data = await apiUserInfoChangeTheme(params);

    if (data.err === true) {
      alert("変更できませんでした");
    } else {
      dispatchAppState({
        type: "SET_THEME",
        payload: { selectedTheme },
      });
     
    }
  };
};
