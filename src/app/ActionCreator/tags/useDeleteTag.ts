import React from "react";
import {
  Store, T_tag_id,
} from "../../Store/Store";
import { useGetTags } from "./useGetTags";

export const useDeleteTag = () => {
  const { paginationParams, tags } = React.useContext(Store);
  const getTags = useGetTags()

  return async (tag_id: T_tag_id) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/api/tags/delete`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ tag_id }),
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
