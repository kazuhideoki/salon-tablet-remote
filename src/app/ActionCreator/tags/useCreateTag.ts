import React from "react";

import { Store } from "../../Store/Store";
import { T_tags_create, apiTagsCreate } from "../../../pages/api/tags/create";
import { useGetTags } from "./useGetTags";

export const useCreateTag = () => {
  const { appState } = React.useContext(Store);
  const getTags = useGetTags()

  return async (tagName: string) => {

    const params: T_tags_create = {
      user_id: appState.userInfo.user_id,
      tag_name: tagName,
    };
    
    console.log("useCreateTagのparamsは" + JSON.stringify(params));

    console.log(JSON.stringify(params));

    const data = await apiTagsCreate(params);

    if (data.err === true) {
      alert("タグを作成できませんでした");
    } else {
      getTags();
    }
  };
};
