import React from "react";
import { Store } from "../../Store/Store";
import { apiTagsGet } from "../../../pages/api/tags/get";

export const useGetTags = () => {
  const { dispatchTags, dispatchAppState, userInfo } = React.useContext(
    Store
  );

  return async () => {

    const data = await apiTagsGet(userInfo.user_id)

    if (data.err === true) {
      alert("取得できませんでした");
    } else {
      dispatchTags({
        type: "SET_TAGS",
        payload: data,
      });
    }
  };
};
