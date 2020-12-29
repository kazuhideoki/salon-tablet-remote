import React from "react";

import { useGetTags } from "./useGetTags";
import { T_tags_update, apiTagsUpdata } from "../../../pages/api/tags/update";
import { AppStateContext } from "../../Store/appState/Context";

export const useUpdateTag = () => {

  const { dispatchAppState } = React.useContext(AppStateContext)
  const getTags = useGetTags();

  return async ({edittingTagId, tagName}) => {

    dispatchAppState({ type: "ON_IS_LOADING_TAGS" });

    const params: T_tags_update = {
      tag_id: edittingTagId,
      tag_name: tagName,
    };

    const data = await apiTagsUpdata(params)

    if (data.err === true) {
      alert("更新できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_TAGS" });
    } else {
      getTags();
    }
  };
};
