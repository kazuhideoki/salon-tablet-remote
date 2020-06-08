import React from "react";
import {
  Store,
} from "../../Store/Store";

export const useGetArticles = () => {
  const {
    paginationParams,
    dispatchPaginationParams,
    dispatchArticles,
    dispatchAppState,
    appState,
  } = React.useContext(Store);
  const isSetting = appState.isSetting;
  const { dispatchLoading } = React.useContext(Store)

  return async (page: number) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/api/articles/get`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ page, isSetting: isSetting }),
      }
    );

    const data = await res.json();

    if (data.err === true) {
      alert("投稿できませんでした");
    } else {
      dispatchArticles({
        type: "GET",
        payload: data.rawData,
      });
      dispatchLoading({type: "OFF_IS_LOADING_MAIN_ARTICLES"})
      //   paginationが変わったらセットし直す
      if (paginationParams !== data.pagination) {
        dispatchPaginationParams({
          type: "SET_PAGINATION_PARAMS",
          payload: data.pagination,
        });
      }
    }
  };
};
