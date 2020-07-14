import React from "react";
import { Store } from "../../Store/Store";

export const useGetTags = () => {
  const { dispatchTags, dispatchAppState, userInfo } = React.useContext(
    Store
  );

  return async () => {
    const res = await fetch(
      `${location.protocol}//${location.host}/api/tags/get?userId=${userInfo.user_id}`
    );

    let data = await res.json();

    if (data.err === true) {
      alert("取得できませんでした");
    } else {
      dispatchTags({
        type: "SET_TAGS",
        payload: data.rawData,
      });
    }
  };
};
