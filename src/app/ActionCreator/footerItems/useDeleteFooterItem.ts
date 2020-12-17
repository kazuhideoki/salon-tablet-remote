import React from "react";
import { Store } from "../../Store/Store";
import { T_order, T_footer_item_id } from "../../Store/Types";
import { apiFooterItemsDelete, T_footer_items_delete } from "../../../pages/api/footer_items/delete";

export const useDeleteFooterItem = () => {
  const { dispatchAppState } = React.useContext(Store);

  return async ({footer_item_id,order}:T_footer_items_delete):Promise<void> => {

    const deleting = confirm("本当に削除してよろしいですか？");

    if (deleting === false) {
      return
    }

    dispatchAppState({ type: "ON_IS_LOADING_FOOTER" });
    
    const data = await apiFooterItemsDelete({footer_item_id, order})

    if (data.err === true) {
      alert("削除できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      dispatchAppState({
        type: "DELETE_FOOTER_ITEM",
        payload: { footer_item_id, order },
      });
    }
  };
};
