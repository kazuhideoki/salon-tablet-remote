import React from "react";

import { T_tags_create, apiTagsCreate } from "../../../../pages/api/tags/create";
import { useGetTags } from "./useGetTags";
import { UserInfoContext } from "../../../Store/userInfo/Context";
import { useManageTagsProps } from "../../tablet/Drawer/ManageTags/view/ManageTags"
import { AppStateContext } from "../../../Store/appState/Context";
import { isLoadingTags } from "../../../Store/appState/actions";

export const useCreateTag = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const getTags = useGetTags()

  return async (tagName: string) => {

    dispatchAppState(isLoadingTags(true))

    const params: T_tags_create = {
      user_id: userInfo.user_id,
      tag_name: tagName,
    };
    
    const data = await apiTagsCreate(params);

    if (data.err === true) {
      alert("タグを作成できませんでした");
      dispatchAppState(isLoadingTags(false))
    } else {
      getTags();
    }
  };
};
