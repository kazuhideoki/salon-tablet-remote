import React from "react";
import {
  Store,
} from "../../Store/Store";
import { T_articles_get } from "../../../pages/api/articles/get";

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
    const params: T_articles_get = {
      page,
      selectingTags: selectingTags || appState.selectedArticlestags,
      isSetting: isSetting,
      userId: userInfo.user_id,
    };

    const res = await fetch(
      `${location.protocol}//${location.host}/api/articles/get`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );

    const data = await res.json();

    if (data.err === true) {
      alert("記事を取得できませんでした");
      return false
    } else {
      dispatchArticles({
        type: "GET",
        payload: data.rawData,
      });
      dispatchAppState({type: "SET_SELECTED_ARTICLES_TAGS", payload: selectingTags})
      dispatchLoading({type: "OFF_IS_LOADING_MAIN_ARTICLES"})
      //   paginationが変わったらセットし直す
      if (paginationParams !== data.pagination) {
        dispatchPaginationParams({
          type: "SET_PAGINATION_PARAMS",
          payload: data.pagination,
        });
      }
      return true
    }
  };
};
