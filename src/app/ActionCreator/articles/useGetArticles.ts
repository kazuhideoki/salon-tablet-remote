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
    console.log("2 " + isSetting);

    dispatchAppState({ type: "ON_IS_LOADING_MAIN" });
    console.log("3 " + isSetting);
    
    const params: T_articles_get = {
      page,
      selectingTags: selectingTags || [],
      isSetting: isSetting,
      userId: appState.userInfo.user_id,
    };
    console.log("4 " + isSetting);

    const data = await apiArticlesGet(params)

    if (data.err === true) {
      alert("記事を取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_MAIN" });
      return false
    } else {
      dispatchAppState({
        type: "SET_ARTICLES",
        payload: {articles: data.rawData, selectedArticlesTags: selectingTags || [], isSetting}
      });
      showArticles && dispatchAppState({ type: "SHOW_ARTICLES" });
      //   paginationが変わったらセットし直す
      if (appState.paginationParams !== data.pagination) {
        dispatchAppState({
          type: "SET_PAGINATION_PARAMS",
          payload: data.pagination,
        });
      }
      return true
    }
  };
};
