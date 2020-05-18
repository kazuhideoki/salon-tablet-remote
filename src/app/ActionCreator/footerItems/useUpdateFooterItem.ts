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
} from "../../Store/Store";
import { useGetFooterItems } from "./useGetFooterItems";

type TUpdateFooterItem = {
  footer_item_id: T_footer_item_id;
  is_published: T_is_published_footer_items;
  icon_name: T_icon_name;
  displayed_icon_name: T_displayed_icon_name | null;
  on_tap: T_on_tap;
  item_content: T_item_content;
  link_url: T_link_url;
  order: T_order;
};

export const useUpdateFooterItem = () => {
  const { dispatchAppState } = React.useContext(Store);
  const {
    setIconName,
    setFooterItemEditorText,
    setIsEdittingFooterItem,
  } = React.useContext(EditorContext);
  const getFooterItems = useGetFooterItems();

  const {
    edittingFooterItemParams,
    iconName,
    selectedIcon,
    onTap,
    footerItemEditorText,
    linkUrl,
  } = React.useContext(EditorContext);

  return async (isPublishing: boolean) => {
    const params: TUpdateFooterItem = {
      footer_item_id: edittingFooterItemParams.footer_item_id,
      is_published: isPublishing,
      icon_name: iconName,
      // 選択されていたらアイコンの名前を返す
      displayed_icon_name: selectedIcon ? selectedIcon[1] : null,
      on_tap: onTap, // 要確認
      item_content: footerItemEditorText,
      link_url: linkUrl,
      order: edittingFooterItemParams.order,
    };
    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/update`,
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
      setIsEdittingFooterItem(false);
      setIconName("");
      setFooterItemEditorText("");
      dispatchAppState({ type: "CLOSE_MODAL" });

      getFooterItems();
    }
  };
};
