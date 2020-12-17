import React from "react";
import { Store } from "../../Store/Store";
import {
  T_tag_id,
} from "../../Store/Types";
import { useGetTags } from "./useGetTags";
import { T_tags_delete, apiTagsDelete } from "../../../pages/api/tags/delete";

export const useDeleteTag = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const { user_id } = appState.userInfo;
  const getTags = useGetTags()


  return async (tag_id: T_tag_id): Promise<void> => {

    const deleting = confirm("本当に削除してよろしいですか？");
    
    if (deleting === false) {
      return null;
    }

    dispatchAppState({ type: "ON_IS_LOADING_TAGS" });

    const params: T_tags_delete = { tag_id: tag_id, user_id: user_id };

    const data = await apiTagsDelete(params);

    if (data.err === true) {
      alert("削除できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_TAGS" });
    } else {
      getTags()
    }
  };
};
