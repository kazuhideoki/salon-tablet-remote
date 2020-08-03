import React from "react";
import { Store } from "../../Store/Store";
import { apiInstagramMediasGet } from "../../../pages/api/instagram_medias/get";
import { T_instagram_id } from "../../Store/Types";

export const useGetInstagramMedias = () => {
  const { dispatchInstagramMedias, dispatchAppState, userInfo, dispatchLoading } = React.useContext(
    Store
  );

  return async (instagram_id: T_instagram_id) => {
    dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
    dispatchAppState({type: "CLOSE_MODAL"})

    const data = await apiInstagramMediasGet(instagram_id);

    if (data.err === true) {
      alert("取得できませんでした");
    } else {
      dispatchInstagramMedias({
        type: "GET_INSTAGRAM_MEDIAS",
        payload: data,
      });
      dispatchAppState({ type: "IS_SHOW_INSTAGRAM", payload: true });
      dispatchLoading({type: "OFF_IS_LOADING_MAIN_ARTICLES" });
    }
  };
};
