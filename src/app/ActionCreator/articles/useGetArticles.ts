import React from "react";
import {
  Store,
} from "../../Store/Store";
import { T_articles_get, apiArticlesGet } from "../../../pages/api/articles/get";

export const useGetArticles = () => {
  const {
    paginationParams,
    dispatchPaginationParams,
    dispatchAppState,
    appState,
    dispatchLoading,
  } = React.useContext(Store);
  
  return async (isSetting: boolean, page: number, selectingTags?: number[], showArticles = true) => {
    console.log("2 " + isSetting);

    appState.isShowInstagram || dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
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
      dispatchLoading({ type: "OFF_IS_LOADING_MAIN_ARTICLES" });
      return false
    } else {
      // dispatchArticles({
      //   type: "GET_ARTICLES",
      //   payload: data.rawData,
      // });
      dispatchAppState({
        type: "SET_ARTICLES",
        payload: {articles: data.rawData, selectedArticlesTags: selectingTags || [], isSetting}
      });
      showArticles && dispatchAppState({ type: "SHOW_ARTICLES" });
      //   paginationが変わったらセットし直す
      if (paginationParams !== data.pagination) {
        dispatchPaginationParams({
          type: "GET_PAGINATION_PARAMS",
          payload: data.pagination,
        });
      }
      appState.isShowInstagram || dispatchLoading({ type: "OFF_IS_LOADING_MAIN_ARTICLES" })
      return true
    }
  };
};
