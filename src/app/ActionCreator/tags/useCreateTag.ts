import React from "react";

import { T_tags_create, apiTagsCreate } from "../../../pages/api/tags/create";
import { useGetTags } from "./useGetTags";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { useManageTagsProps } from "../../View/tablet/Drawer/ManageTags/view/ManageTags"

export const useCreateTag = () => {
  const { userInfo } = React.useContext(UserInfoContext);
  const { handleLoadingTags } = useManageTagsProps();
  const getTags = useGetTags()

  return async (tagName: string) => {

    handleLoadingTags(true)

    const params: T_tags_create = {
      user_id: userInfo.user_id,
      tag_name: tagName,
    };
    
    const data = await apiTagsCreate(params);

    if (data.err === true) {
      alert("タグを作成できませんでした");
      handleLoadingTags(false)
    } else {
      getTags();
    }
  };
};
