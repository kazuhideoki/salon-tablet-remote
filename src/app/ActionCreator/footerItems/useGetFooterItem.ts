import React from "react";
import {
  FooterItem,
  T_footer_item_id,
  Store,
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";
import { IconsSetting } from "../../View/Drawer/ItemEditor/iconSelect/icons";


type UseGetFooterItemRes =
  | { rawData: FooterItem; err: undefined }
  | { err: boolean; data: { message: string }; rawData: undefined };
export const useGetFooterItem = () => {
  const {
    setTitleText,
    setEditorText,
    setEditorTextExcerpt,
    setOnTap,
    setLinkUrl,
    setModalSize,
    setAppLinkUrl,
    setIsEdittingContent,
    // setEdittingFooterItemParams,
    dispatchSelectedIcon,
    setCreatedAt,
    setUpdatedAt,
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
      setIsEdittingContent(true);
      // setEdittingFooterItemParams(footerItem);
      setTitleText(footerItem.icon_name);
      setEditorText(footerItem.item_content);
      setEditorTextExcerpt(footerItem.item_excerpt);
      setOnTap(footerItem.on_tap);
      setLinkUrl(footerItem.link_url);
      setModalSize(footerItem.modal_size)
      setAppLinkUrl(footerItem.app_link_url);
      dispatchSelectedIcon({
        type: "SET_ICON",
        payload: IconsSetting.convertIconComponentFromName(
          footerItem.displayed_icon_name
        ),
      });
      setCreatedAt(footerItem.created_at);
      setUpdatedAt(footerItem.updated_at);
    }
  };
};
