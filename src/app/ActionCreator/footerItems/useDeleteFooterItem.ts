import React from "react";
import { Store } from "../../Store/Store";
import { T_order, T_footer_item_id } from "../../Store/Types";
import { apiFooterItemsDelete, T_footer_items_delete } from "../../../pages/api/footer_items/delete";
import { FooterItemsContext } from "../../Store/footerItems/Context";
import { set } from "../../Store/footerItems/actions";

export const useDeleteFooterItem = () => {
  const { dispatchAppState } = React.useContext(Store);
  const { footerItems, dispatchFooterItems } = React.useContext(FooterItemsContext);

  return async ({footer_item_id, order}:T_footer_items_delete):Promise<void> => {

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

      const deletedState = footerItems.filter((value, index) => {
        // 削除するアイテムは含めない
        return value.footer_item_id !== footer_item_id;
      });
      const newState = deletedState.map((value, index) => {
        // 削除されたアイテムの左側のorderはそのまま出力
        if (value.order < order) {
          return value;
          // 削除されたアイテムの右側はorderの調整のためそれぞれ-1する
        } else if (value.order > order) {
          value.order -= 1;
          return value;
        }
      })
      dispatchFooterItems(set(newState));

    }
  };
};
