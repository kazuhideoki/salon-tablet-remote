import React from "react";
import { Store } from "../../Store/Store";
import { apiTagsGet } from "../../../pages/api/tags/get";

export const useGetTags = () => {
  const { dispatchAppState, appState } = React.useContext(Store);

  return async () => {

    dispatchAppState({type: "ON_IS_LOADING_TAGS"})

    const data = await apiTagsGet(appState.userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_TAGS" });
    } else {
      dispatchAppState({
        type: "SET_TAGS",
        payload: data,
      });
    }
  };
};
