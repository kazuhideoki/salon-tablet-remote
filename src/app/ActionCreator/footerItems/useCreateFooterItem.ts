import React from "react";
import {
  Store,
  T_is_published_footer_items,
  T_icon_name,
  T_displayed_icon_name,
  T_on_tap,
  T_item_content,
  T_link_url,
  T_order,
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";
import { useGetFooterItems } from "./useGetFooterItems";

type TCreateFooterItem = {
  is_published: T_is_published_footer_items;
  icon_name: T_icon_name;
  displayed_icon_name: T_displayed_icon_name | null; 
  on_tap: T_on_tap;
  item_content: T_item_content;
  link_url: T_link_url;
  order: T_order;
};

export const useCreateFooterItem = () => {
  const { dispatchAppState, footerItems } = React.useContext(Store);
  const {
    setFooterItemEditorText,
    setIconName,
    dispatchSelectedIcon,
  } = React.useContext(EditorContext);
  const getFooterItems = useGetFooterItems();

  let order;
  // footerItemsの配列の中身を判定
  if (footerItems.length) {
    // orderの最大値を取得
    const orders = footerItems.map((value) => {
      return value.order;
    });
    order = Math.max(...orders) + 1; // orderの最大値＋1を代入する
  } else {
    // 記事がないときは 1にする
    order = 1;
  }

  const {
    iconName,
    selectedIcon,
    onTap,
    footerItemEditorText,
    linkUrl,
  } = React.useContext(EditorContext);

  return async (isPublishing: boolean) => {
    const params: TCreateFooterItem = {
      is_published: isPublishing,
      icon_name: iconName,
      // 選択されていたらアイコンの名前を返す.
      displayed_icon_name: selectedIcon ? selectedIcon[1] : null,
      on_tap: onTap,
      item_content: footerItemEditorText,
      link_url: linkUrl,
      order: order,
    };

    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/create`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("投稿できませんでした");
    } else {
      setFooterItemEditorText("");
      setIconName("");
      dispatchSelectedIcon({
        type: "SET_ICON",
        payload: null,
      });
      dispatchAppState({ type: "CLOSE_MODAL" });

      getFooterItems();
    }
  };
};
