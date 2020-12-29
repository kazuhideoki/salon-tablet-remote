import React from "react";
import { T_order, T_footer_item_id } from "../../Store/Types";
import { apiFooterItemsDelete, T_footer_items_delete } from "../../../pages/api/footer_items/delete";
import { FooterItemsContext } from "../../Store/footerItems/Context";
import { set } from "../../Store/footerItems/actions";
import { AppStateContext } from "../../Store/appState/Context";
import { useFooterProps } from "../../View/tablet/Footer/Footer/view/Footer";

export const useDeleteFooterItem = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { footerItems, dispatchFooterItems } = React.useContext(FooterItemsContext);
  const { handleLoadingFooter } = useFooterProps()

  return async ({footer_item_id, order}:T_footer_items_delete):Promise<void> => {

    const deleting = confirm("本当に削除してよろしいですか？");

    if (deleting === false) {
      return
    }

    handleLoadingFooter(true)
    
    const data = await apiFooterItemsDelete({footer_item_id, order})

    if (data.err === true) {
      alert("削除できませんでした");
      handleLoadingFooter(false)
    } else {
      handleLoadingFooter(false);

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
