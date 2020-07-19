import React from "react";
import { Store } from "../../Store/Store";
import { ModalContext } from "../../View/Modal/ModalContext";

export const useGetTags = () => {
  const { dispatchTags, dispatchAppState, userInfo } = React.useContext(
    Store
  );
  const {setSkipTransiton} = React.useContext(ModalContext)

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
    setSkipTransiton(true)
  };
};
