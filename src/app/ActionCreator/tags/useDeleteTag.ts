import React from "react";
import { Store } from "../../Store/Store";
import {
  T_tag_id,
} from "../../Store/Types";
import { useGetTags } from "./useGetTags";
import { T_tags_delete } from "../../../pages/api/tags/delete";

export const useDeleteTag = () => {
  const { userInfo } = React.useContext(Store);
  const {user_id} = userInfo
  const getTags = useGetTags()


  return async (tag_id: T_tag_id) => {

    const deleting = confirm("本当に削除してよろしいですか？");

    if (deleting!) {
      return null;
    }

    const params: T_tags_delete = { tag_id: tag_id, user_id: user_id };

    const res = await fetch(
      `${location.protocol}//${location.host}/api/tags/delete`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("削除できませんでした");
    } else {
      getTags()
    }
  };
};
