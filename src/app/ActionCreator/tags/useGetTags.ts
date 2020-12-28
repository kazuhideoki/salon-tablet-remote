import React from "react";
import { Store } from "../../Store/Store";
import { apiTagsGet } from "../../../pages/api/tags/get";
import { TagsContext } from "../../Store/tags/Context";
import { set } from "../../Store/tags/actions";

export const useGetTags = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { dispatchTags } = React.useContext(TagsContext)

  return async () => {

    dispatchAppState({type: "ON_IS_LOADING_TAGS"})

    const data = await apiTagsGet(appState.userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_TAGS" });
    } else {
      dispatchAppState({
        type: "SET_TAGS",
      });
      dispatchTags(set(data))
    }
  };
};
