import React from "react";
import { Store } from "../../Store/Store";
import { T_footer_icon_size } from "../../Store/Types";
import {
  apiUserInfoChangeFooterIconSize,
  T_user_info_change_footer_icon_size,
} from "../../../pages/api/user_info/change_footer_icon_size";

export const useChangeFooterIconSize = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { user_id } = appState.userInfo;

  return async (footerIconSize: T_footer_icon_size) => {
    const params: T_user_info_change_footer_icon_size = {
      user_id,
      footer_icon_size: footerIconSize,
    };

    const data = await apiUserInfoChangeFooterIconSize(params);

    if (data.err === true) {
      alert("変更できませんでした");
      return false
    } else {
      dispatchAppState({
        type: "SET_FOOTER_ICON_SIZE",
        payload: { footerIconSize },
      });
      return true
    }
  };
};
