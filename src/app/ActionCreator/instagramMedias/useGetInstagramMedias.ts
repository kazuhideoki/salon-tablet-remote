import React from "react";
import { Store } from "../../Store/Store";
import { apiInstagramMediasGet } from "../../../pages/api/instagram_medias/get";
import { T_instagram_id, T_instagram_username } from "../../Store/Types";

export const useGetInstagramMedias = () => {
  const {
    dispatchAppState,
  } = React.useContext(Store);

  // ページ送りでないときは空のオブジェクト
  return async (instagram_id: T_instagram_id, username: T_instagram_username, paging: {after?: string, before?: string }) => {
    
    dispatchAppState({ type: "ON_IS_LOADING_MAIN" });
    dispatchAppState({type: "CLOSE_MODAL"})

    const data = await apiInstagramMediasGet(instagram_id, paging);

    if (data.err === true) {
      alert("取得できませんでした");
      console.log('data.messageは ' + JSON.stringify(data.data.message))
      dispatchAppState({ type: "OFF_IS_LOADING_MAIN" });
    } else {
      dispatchAppState({
        type: "SET_INSTAGRAM_MEDIAS",
        payload: {data: data, selectedInstagramAccount: {id: instagram_id, username}}
      });
    }
  };
};
