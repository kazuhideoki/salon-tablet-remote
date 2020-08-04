import React from "react";
import { Store } from "../../Store/Store";
import { apiInstagramMediasGet } from "../../../pages/api/instagram_medias/get";
import { T_instagram_id, T_instagram_username } from "../../Store/Types";

export const useGetInstagramMedias = () => {
  const { dispatchInstagramMedias, dispatchAppState, userInfo, dispatchLoading } = React.useContext(
    Store
  );

  // ページ送りでないときは空のオブジェクト
  return async (instagram_id: T_instagram_id, username: T_instagram_username, paging: {after?: string, before?: string }) => {
    console.log("useGetInstagramMediasだよ");
    
    dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
    dispatchAppState({type: "CLOSE_MODAL"})

    const data = await apiInstagramMediasGet(instagram_id, paging);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchLoading({ type: "OFF_IS_LOADING_MAIN_ARTICLES" });
    } else {
      dispatchInstagramMedias({
        type: "GET_INSTAGRAM_MEDIAS",
        payload: data,
      });
      dispatchAppState({ type: "SHOW_INSTAGRAM", payload: { id: instagram_id, username} });
      dispatchLoading({type: "OFF_IS_LOADING_MAIN_ARTICLES" });
    }
  };
};
