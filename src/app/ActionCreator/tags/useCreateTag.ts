import React from "react";

import { Store } from "../../Store/Store";
import { T_tags_create, apiTagsCreate } from "../../../pages/api/tags/create";
import { useGetTags } from "./useGetTags";

export const useCreateTag = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const getTags = useGetTags()

  return async (tagName: string) => {

    dispatchAppState({ type: "ON_IS_LOADING_TAGS" });

    const params: T_tags_create = {
      user_id: appState.userInfo.user_id,
      tag_name: tagName,
    };
    
    const data = await apiTagsCreate(params);

    if (data.err === true) {
      alert("タグを作成できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_TAGS" });
    } else {
      getTags();
    }
  };
};
