import React from "react";
import { Store } from "../../Store/Store";
import {
  T_is_published_footer_items,
  T_icon_name,
  T_displayed_icon_name,
  T_on_tap,
  T_item_content,
  T_link_url,
  T_order,
  T_item_excerpt,
  T_app_link_url,
  T_user_id,
  T_modal_size,
} from "../../Store/Types";
import { useGetFooterItems } from "./useGetFooterItems";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

export type T_footer_items_create_item = {
  is_published: T_is_published_footer_items;
  icon_name: T_icon_name;
  displayed_icon_name: T_displayed_icon_name | null; 
  on_tap: T_on_tap;
  item_content: T_item_content;
  item_excerpt: T_item_excerpt
  link_url: T_link_url;
  app_link_url: T_app_link_url
  modal_size: T_modal_size,
  order: T_order;
  user_id: T_user_id
};

export type TCreateFooterItem = {
  titleText: string;
  selectedIcon: [OverridableComponent<SvgIconTypeMap<{}, "svg">>, string];
  onTap: string;
  editorText: string;
  editorTextExcerpt: string;
  linkUrl: string;
  modalSize: T_modal_size;
  appLinkUrl: string;
};

export const useCreateFooterItem = () => {
  const { dispatchAppState, footerItems } = React.useContext(Store);
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

  const { userInfo } = React.useContext(Store)

  return async (isPublishing: boolean, param: TCreateFooterItem) => {
    const params: T_footer_items_create_item = {
      is_published: isPublishing,
      icon_name: param.titleText,
      // 選択されていたらアイコンの名前を返す.
      displayed_icon_name: param.selectedIcon ? param.selectedIcon[1] : null,
      on_tap: param.onTap,
      item_content: param.editorText,
      item_excerpt: param.editorTextExcerpt,
      link_url: param.linkUrl,
      app_link_url: param.appLinkUrl,
      modal_size: param.modalSize,
      order: order,
      user_id: userInfo.user_id,
    };

    console.log(
      `${location.protocol}//${location.host}/api/footer_items/create`
    );
    console.log(JSON.stringify(params));

    const res = await fetch(
      `${location.protocol}//${location.host}/api/footer_items/create`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ params }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("投稿できませんでした");
    } else {
      // setEditorText("");
      // setTitleText("");
      // dispatchSelectedIcon({
      //   type: "SET_ICON",
      //   payload: null,
      // });
      dispatchAppState({ type: "CLOSE_MODAL" });

      getFooterItems();
    }
  };
};
