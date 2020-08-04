import React from "react";
import {
  Store,
} from "../../Store/Store";
import { T_articles_get, apiArticlesGet } from "../../../pages/api/articles/get";

export const useGetArticles = () => {
  const {
    paginationParams,
    dispatchPaginationParams,
    dispatchArticles,
    dispatchAppState,
    appState,
    userInfo,
  } = React.useContext(Store);
  const isSetting = appState.isSetting;
  const { dispatchLoading } = React.useContext(Store)

  return async (page: number, selectingTags?: number[]) => {
    dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
    
    const params: T_articles_get = {
      page,
      selectingTags: selectingTags || [],
      isSetting: isSetting,
      userId: userInfo.user_id,
    };

    const data = await apiArticlesGet(params)

    if (data.err === true) {
      alert("記事を取得できませんでした");
      dispatchLoading({ type: "OFF_IS_LOADING_MAIN_ARTICLES" });
      return false
    } else {
      dispatchArticles({
        type: "GET",
        payload: data.rawData,
      });
      dispatchAppState({
        type: "SHOW_ARTICLES_AND_SET_TAGS",
        payload: selectingTags || [],
      });
      //   paginationが変わったらセットし直す
      if (paginationParams !== data.pagination) {
        dispatchPaginationParams({
          type: "SET_PAGINATION_PARAMS",
          payload: data.pagination,
        });
      }
      dispatchLoading({ type: "OFF_IS_LOADING_MAIN_ARTICLES" });
      return true
    }
  };
};
