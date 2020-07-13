import React from "react";
import {
  Store, T_selected_theme,
} from "../../Store/Store";

export const useChangeTheme = () => {
  const { dispatchUserInfo, userInfo } = React.useContext(
    Store
  );
  const { user_id } = userInfo;
  
  return async (selectedTheme: T_selected_theme) => {
    const params = {
      user_id,
      selectedTheme,
    };
    console.log("useChangeThemeのparamsは " + JSON.stringify(params));

    const res = await fetch(
      `${location.protocol}//${location.host}/api/user_info/change_theme`, //★要変更
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("変更できませんでした");
    } else {
      dispatchUserInfo({
        type: "SET_THEME",
        payload: { selectedTheme },
      });
     
    }
  };
};
