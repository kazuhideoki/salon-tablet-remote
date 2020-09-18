import React from "react";
import { Store } from "../../Store/Store";

import { useGetFooterItems } from "./useGetFooterItems";
import { TCreateFooterItem, calcOrder } from "./useCreateFooterItem";
import { T_footer_items_update, apiFooterItemsUpdate } from "../../../pages/api/footer_items/update";

export type TUpdateFooterItem = TCreateFooterItem;

export const useUpdateFooterItem = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const getFooterItems = useGetFooterItems();

  return async (param: TUpdateFooterItem) => {

    dispatchAppState({ type: "CLOSE_MODAL" });
    dispatchAppState({ type: "ON_IS_LOADING_FOOTER" });

    const params: T_footer_items_update = {
      id: appState.edittingPrams.footerItem.footer_item_id,
      params: {
        is_published: param.is_published,
        icon_name: param.titleText,
        // 選択されていたらアイコンの名前を返す
        displayed_icon_name: param.selectedIcon ? param.selectedIcon[1] : null,
        on_tap: param.onTap, // 要確認
        item_content: param.editorText,
        item_excerpt: param.editorTextExcerpt,
        link_url: param.linkUrl,
        app_link_url: param.appLinkUrl,
        modal_size: param.modalSize,
        on_sidebar: param.onSidebar,
        order: appState.edittingPrams.footerItem.order,
        order_sidebar: appState.edittingPrams.footerItem.order_sidebar,
        data_type: param.dataType,
      },
    };

    const data = await apiFooterItemsUpdate(params);

    if (data.err === true) {
      alert("更新できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      dispatchAppState({ type: "CLOSE_MODAL" });

      getFooterItems();
    }
  };
};
