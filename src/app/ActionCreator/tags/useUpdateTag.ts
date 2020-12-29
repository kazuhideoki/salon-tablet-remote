import React from "react";
import { useGetTags } from "./useGetTags";
import { T_tags_update, apiTagsUpdata } from "../../../pages/api/tags/update";
import { useManageTagsProps } from "../../View/tablet/Drawer/ManageTags/view/ManageTags";

export const useUpdateTag = () => {

  const { handleLoadingTags  } = useManageTagsProps();
  const getTags = useGetTags();

  return async ({edittingTagId, tagName}) => {

    handleLoadingTags(true)

    const params: T_tags_update = {
      tag_id: edittingTagId,
      tag_name: tagName,
    };

    const data = await apiTagsUpdata(params)

    if (data.err === true) {
      alert("更新できませんでした");
      handleLoadingTags(false)
    } else {
      getTags();
    }
  };
};
