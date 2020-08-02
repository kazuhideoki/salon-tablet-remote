import React from "react";
import { Store } from "../../Store/Store";
import { T_order, T_footer_item_id } from "../../Store/Types";

export const useDeleteFooterItem = () => {
  const { dispatchFooterItems } = React.useContext(Store);

  return async (footer_item_id: T_footer_item_id, order: T_order) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/api/footer_items/delete`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        // jsonに変換するので数字でも{}で囲む
        body: JSON.stringify({ footer_item_id, order }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("削除できませんでした");
    } else {
      dispatchFooterItems({
        type: "DELETE_FOOTER_ITEM",
        payload: {footer_item_id, order},
      });
    }
  };
};
