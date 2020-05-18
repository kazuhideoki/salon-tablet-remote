import React from "react";
import { Store } from "../../Store/Store";

export const useDeleteFooterItem = () => {
  const { dispatchFooterItems } = React.useContext(Store);

  return async (footer_item_id: number) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/delete`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        // jsonに変換するので数字でも{}で囲む
        body: JSON.stringify({ footer_item_id }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("削除できませんでした");
    } else {
      dispatchFooterItems({
        type: "DELETE_FOOTER_ITEM",
        payload: footer_item_id,
      });
    }
  };
};
