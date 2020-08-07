import React from "react";

import { useGetTags } from "./useGetTags";
import { T_tags_update, apiTagsUpdata } from "../../../pages/api/tags/update";

export const useUpdateTag = () => {

  const getTags = useGetTags();

  return async ({edittingTagId, tagName}) => {
    const params: T_tags_update = {
      tag_id: edittingTagId,
      tag_name: tagName,
    };

    const data = await apiTagsUpdata(params)

    if (data.err === true) {
      alert("更新できませんでした");
    } else {
      getTags();
    }
  };
};
