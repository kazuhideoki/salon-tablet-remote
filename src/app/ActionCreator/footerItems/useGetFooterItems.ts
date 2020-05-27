import React from "react";
import {
  Store,
} from "../../Store/Store";

export const useGetFooterItems = () => {
  const { dispatchFooterItems, dispatchAppState } = React.useContext(Store);

  return async () => {
    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/get`
    );

    let data = await res.json();

    if (data.err === true) {
      alert("取得できませんでした");
    } else {
      dispatchFooterItems({
        type: "GET",
        payload: data.rawData,
      });
      dispatchAppState({ type: "END_LOADING" });
    }
  };
};
