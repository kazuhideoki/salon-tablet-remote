import React from "react";

import { Store, T_user_id, T_tag_name } from "../../Store/Store";
import { T_tags_create } from "../../../pages/api/tags/create";
import { useGetTags } from "./useGetTags";

export const useCreateTag = () => {
  const {userInfo, dispatchTags} = React.useContext(Store)
  const getTags = useGetTags()

  return async (tagName: string) => {
    const params: T_tags_create = {
      user_id: userInfo.user_id,
      tag_name: tagName,
    };
    console.log("useCreateTagのparamsは" + JSON.stringify(params));

    console.log(JSON.stringify(params));

    const res = await fetch(
      `${location.protocol}//${location.host}/api/tags/create`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ params }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("タグを作成できませんでした");
    } else {
      getTags();
    }
  };
};
