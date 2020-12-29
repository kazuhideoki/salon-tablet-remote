import React from "react";
import {
  T_tag_id,
} from "../../Store/Types";
import { useGetTags } from "./useGetTags";
import { T_tags_delete, apiTagsDelete } from "../../../pages/api/tags/delete";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { useManageTagsProps } from "../../View/tablet/Drawer/ManageTags/view/ManageTags";

export const useDeleteTag = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;
  const { handleLoadingTags } = useManageTagsProps()
  const getTags = useGetTags()


  return async (tag_id: T_tag_id): Promise<void> => {

    const deleting = confirm("本当に削除してよろしいですか？");
    
    if (deleting === false) {
      return null;
    }

    handleLoadingTags(true)

    const params: T_tags_delete = { tag_id: tag_id, user_id: user_id };

    const data = await apiTagsDelete(params);

    if (data.err === true) {
      alert("削除できませんでした");
      handleLoadingTags(false)
    } else {
      getTags()
    }
  };
};
