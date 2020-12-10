import React from "react";
import { Store } from "../../Store/Store";
import { T_show_article_type } from "../../Store/Types";
import {
  apiUserInfoChangeShowArticleType,
  T_user_info_change_show_article_type,
} from "../../../pages/api/user_info/change_show_article_type";

export const useChangeShowArticleType = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { user_id } = appState.userInfo;

  return async (showArticleType: T_show_article_type) => {
    const params: T_user_info_change_show_article_type = {
      user_id,
      showArticleType,
    };

    const data = await apiUserInfoChangeShowArticleType(params);

    if (data.err === true) {
      alert("変更できませんでした");
    } else {
      dispatchAppState({
        type: "SET_SHOW_ARTICLE_TYPE",
        payload: { showArticleType },
      });
    }
  };
};
