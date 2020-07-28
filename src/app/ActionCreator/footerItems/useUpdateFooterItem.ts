import React from "react";
import { EditorContext } from "../../Store/EditorContext";
import {
  Store,
  T_footer_item_id,
  T_is_published_footer_items,
  T_icon_name,
  T_displayed_icon_name,
  T_on_tap,
  T_item_content,
  T_link_url,
  T_order,
  T_item_excerpt,
  T_app_link_url,
  T_modal_size,
  FooterItem,
} from "../../Store/Store";
import { useGetFooterItems } from "./useGetFooterItems";
import { TCreateFooterItem } from "./useCreateFooterItem";

export type T_footer_items_update_item = {
  is_published: T_is_published_footer_items;
  icon_name: T_icon_name;
  displayed_icon_name: T_displayed_icon_name | null;
  on_tap: T_on_tap;
  item_content: T_item_content;
  item_excerpt: T_item_excerpt;
  link_url: T_link_url;
  app_link_url: T_app_link_url;
  modal_size: T_modal_size;
  order: T_order;
};
export type TUpdateFooterItem = {
  params: T_footer_items_update_item
  id: T_footer_item_id
}

export const useUpdateFooterItem = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const getFooterItems = useGetFooterItems();

  return async (
    isPublishing: boolean,
    param: TCreateFooterItem,
    // edittingFooterItemParams: FooterItem 
  ) => {
    const params: TUpdateFooterItem = {
      id: appState.edittingPrams.footerItem.footer_item_id,
      params: {
        is_published: isPublishing,
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
    const res = await fetch(
      `${location.protocol}//${location.host}/api/footer_items/update`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("更新できませんでした");
    } else {
      // setIsEdittingContent(false);
      // setTitleText("");
      // setEditorText("");
      dispatchAppState({ type: "CLOSE_MODAL" });

      getFooterItems();
    }
  };
};
