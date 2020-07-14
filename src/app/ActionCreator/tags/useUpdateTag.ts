import React from "react";
import {
  Store, T_tag_id, T_tag_name,
} from "../../Store/Store";
import { useGetTags } from "./useGetTags";

export type TUpdateTagParams = {
  tag_id: T_tag_id,
  tag_name: T_tag_name,
}

export const useUpdateTag = () => {

  const getTags = useGetTags();

  return async ({edittingTagId, tagName}) => {
    const params: TUpdateTagParams = {
      tag_id: edittingTagId,
      tag_name: tagName,
    };

    const res = await fetch(
      `${location.protocol}//${location.host}/api/tags/update`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({params}),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("更新できませんでした");
    } else {
      getTags();
    }
  };
};
