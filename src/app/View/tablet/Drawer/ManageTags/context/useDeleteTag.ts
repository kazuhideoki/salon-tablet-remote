import React from "react";
import {
  T_tag_id,
} from "../../../../../Store/Interface";
import { useGetTags } from "./lib/useGetTags";
import { T_tags_delete, apiTagsDelete } from "../../../../../../pages/api/tags/delete";
import { UserInfoContext } from "../../../../../Store/userInfo/Context";
import { AppStateContext } from "../../../../../Store/appState/Context";
import { useManageTagsProps } from "../view/ManageTags";
import { isLoadingTags } from "../../../../../Store/appState/actions";

export const useDeleteTag = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;
  const getTags = useGetTags()


  return async (tag_id: T_tag_id): Promise<void> => {

    const deleting = confirm("本当に削除してよろしいですか？");
    
    if (deleting === false) {
      return null;
    }

    dispatchAppState(isLoadingTags(true))

    const params: T_tags_delete = { tag_id: tag_id, user_id: user_id };

    const data = await apiTagsDelete(params);

    if (data.err === true) {
      alert("削除できませんでした");
      dispatchAppState(isLoadingTags(false))
    } else {
      getTags()
    }
  };
};
