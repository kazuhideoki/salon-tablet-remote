import React from "react";
import {
  FooterItem,
  T_footer_item_id,
  Store,
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
  const { footerItems } = React.useContext(Store)

  return async (footer_item_id: T_footer_item_id) => {

    const target = footerItems.filter((value) => {
      return value.footer_item_id === footer_item_id
    })
    const footerItem = target[0]

    if (!footerItem) {
      alert("アイテムを取得できませんでした");
    } else {
      setIsEdittingFooterItem(true);
      setEdittingFooterItemParams(footerItem);
      setIconName(footerItem.icon_name);
      setFooterItemEditorText(footerItem.item_content);
      setOnTap(footerItem.on_tap);
      setLinkUrl(footerItem.link_url);
      dispatchSelectedIcon({
        type: "SET_ICON",
        payload: IconsSetting.convertIconComponentFromName(
          footerItem.displayed_icon_name
        ),
      });
    }
  };
};
