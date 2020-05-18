import React from "react";
import {
  FooterItem,
  T_footer_item_id,
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";
import { IconsSetting } from "../../View/Setting/iconSelect/icons";


type UseGetFooterItemRes =
  | { rawData: FooterItem; err: undefined }
  | { err: boolean; data: { message: string }; rawData: undefined };
export const useGetFooterItem = () => {
  const {
    setIconName,
    setFooterItemEditorText,
    setOnTap,
    setLinkUrl,
    setIsEdittingFooterItem,
    setEdittingFooterItemParams,
    dispatchSelectedIcon,
  } = React.useContext(EditorContext);

  return async (footer_item_id: T_footer_item_id) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/get/single`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ footer_item_id: footer_item_id }),
      }
    );
    const data: UseGetFooterItemRes = await res.json();

    if (data.err === true) {
      alert("アイテムを取得できませんでした");
    } else {
      const {
        icon_name,
        item_content,
        displayed_icon_name,
        on_tap,
        link_url,
      } = data.rawData;
      setIsEdittingFooterItem(true);
      setEdittingFooterItemParams(data.rawData);
      setIconName(icon_name);
      setFooterItemEditorText(item_content);
      setOnTap(on_tap);
      setLinkUrl(link_url);
      dispatchSelectedIcon({
        type: "SET_ICON",
        payload: IconsSetting.convertIconComponentFromName(displayed_icon_name),
      });
    }
  };
};
