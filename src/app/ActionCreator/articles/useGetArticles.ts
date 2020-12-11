import React from "react";
import {
  Store,
} from "../../Store/Store";
import { T_articles_get, apiArticlesGet } from "../../../pages/api/articles/get";

export const useGetArticles = () => {
  const {
    dispatchAppState,
    appState,
  } = React.useContext(Store);
  
  return async (isSetting: boolean, page: number, selectingTags?: number[], showArticles = true) => {
    
    dispatchAppState({ type: "CLOSE_MODAL" });
    dispatchAppState({ type: "ON_IS_LOADING_MAIN" });
    
    const params: T_articles_get = {
      page,
      selectingTags: selectingTags || [],
      isSetting: isSetting,
      userId: appState.userInfo.user_id,
    };

    const data = await apiArticlesGet(params)

    if (data.err === true) {
      alert("記事を取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_MAIN" });
      return false
    } else {
      dispatchAppState({
        type: "SET_ARTICLES",
        payload: {
          data,
          selectedArticlesTags: selectingTags || [],
          isSetting,
          showArticles: showArticles,
        },
      });

      return true
    }
  };
};
