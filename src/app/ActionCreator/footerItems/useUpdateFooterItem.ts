import React from "react";
import { Store } from "../../Store/Store";

import { useGetFooterItems } from "./useGetFooterItems";
import { TCreateFooterItem } from "./useCreateFooterItem";
import { T_footer_items_update, apiFooterItemsUpdate } from "../../../pages/api/footer_items/update";

export type TUpdateFooterItem = TCreateFooterItem;

export const useUpdateFooterItem = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const getFooterItems = useGetFooterItems();

  return async (param: TUpdateFooterItem) => {
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
        order: appState.edittingPrams.footerItem.order,
      },
    };

    const data = await apiFooterItemsUpdate(params);

    if (data.err === true) {
      alert("更新できませんでした");
    } else {
      dispatchAppState({ type: "CLOSE_MODAL" });

      getFooterItems();
    }
  };
};
