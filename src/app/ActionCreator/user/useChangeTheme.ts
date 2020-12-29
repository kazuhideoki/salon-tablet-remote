import React from "react";
import {
  T_selected_theme,
} from "../../Store/Types";
import { apiUserInfoChangeTheme, T_user_info_change_theme } from "../../../pages/api/user_info/theme/change_theme";
import { generateDefaultParamsFromTheme } from "../../Store/themes/paramsFromTheme";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { setTheme } from "../../Store/userInfo/actions";

export const useChangeTheme = () => {
  const { dispatchUserInfo, userInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;
  
  return async (selectedTheme: T_selected_theme) => {

    const themeParams = generateDefaultParamsFromTheme(selectedTheme);

    const params = {
      user_id,
      themeParams: themeParams,
    };
    
    const data = await apiUserInfoChangeTheme(params);

    if (data.err === true) {
      alert("変更できませんでした");
    } else {
      dispatchUserInfo(setTheme(themeParams));
     
    }
  };
};
