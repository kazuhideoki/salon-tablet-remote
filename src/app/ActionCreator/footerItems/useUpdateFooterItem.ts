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
} from "../../Store/Store";
import { useGetFooterItems } from "./useGetFooterItems";

type TUpdateFooterItem = {
  footer_item_id: T_footer_item_id;
  is_published: T_is_published_footer_items;
  icon_name: T_icon_name;
  displayed_icon_name: T_displayed_icon_name | null;
  on_tap: T_on_tap;
  item_content: T_item_content;
  item_excerpt: T_item_excerpt
  link_url: T_link_url;
  app_link_url: T_app_link_url
  order: T_order;
};

export const useUpdateFooterItem = () => {
  const { dispatchAppState } = React.useContext(Store);
  const {
    setTitleText,
    setEditorText,
    setIsEdittingContent,
  } = React.useContext(EditorContext);
  const getFooterItems = useGetFooterItems();

  const {
    edittingFooterItemParams,
    titleText,
    selectedIcon,
    onTap,
    editorText,
    editorTextExcerpt,
    linkUrl,
    appLinkUrl,
  } = React.useContext(EditorContext);

  return async (isPublishing: boolean) => {
    const params: TUpdateFooterItem = {
      footer_item_id: edittingFooterItemParams.footer_item_id,
      is_published: isPublishing,
      icon_name: titleText,
      // 選択されていたらアイコンの名前を返す
      displayed_icon_name: selectedIcon ? selectedIcon[1] : null,
      on_tap: onTap, // 要確認
      item_content: editorText,
      item_excerpt: editorTextExcerpt,
      link_url: linkUrl,
      app_link_url: appLinkUrl,
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
      setIsEdittingContent(false);
      setTitleText("");
      setEditorText("");
      dispatchAppState({ type: "CLOSE_MODAL" });

      getFooterItems();
    }
  };
};
