import React from "react";
import { Store } from "../../Store/Store";
import {
  T_modal_size, T_is_published_footer_items, T_on_tap, T_data_type_footer_item, T_on_sidebar, FooterItems,
} from "../../Store/Types";
import { useGetFooterItems } from "./useGetFooterItems";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import { T_footer_items_create, apiFooterItemsCreate } from "../../../pages/api/footer_items/create";


export type TCreateFooterItem = {
  is_published: T_is_published_footer_items;
  titleText: string;
  selectedIcon: [OverridableComponent<SvgIconTypeMap<{}, "svg">>, string];
  onTap: T_on_tap;
  editorText: string;
  editorTextExcerpt: string;
  linkUrl: string;
  modalSize: T_modal_size;
  appLinkUrl: string;
  onSidebar: T_on_sidebar
  dataType: T_data_type_footer_item;
};

export const calcOrder = (footerItems: FooterItems, isOrderSidebar: boolean) => {
  if (footerItems.length) {
    // orderの最大値を取得
    const order = footerItems.map((value) => {
      if (isOrderSidebar) {
        return value.order_sidebar;
      }
      return value.order
    });
    return Math.max(...order) + 1; // orderの最大値＋1を代入する
  } else {
    // 記事がないときは 1にする
    return 1;
  }
}

export const useCreateFooterItem = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { footerItems } = appState
  const getFooterItems = useGetFooterItems();

  // let order;
  // // footerItemsの配列の中身を判定
  // if (footerItems.length) {
  //   // orderの最大値を取得
  //   const orders = footerItems.map((value) => {
  //     return value.order;
  //   });
  //   order = Math.max(...orders) + 1; // orderの最大値＋1を代入する
  // } else {
  //   // 記事がないときは 1にする
  //   order = 1;
  // }

  return async (param: TCreateFooterItem) => {

    dispatchAppState({ type: "CLOSE_MODAL" });
    dispatchAppState({ type: "ON_IS_LOADING_FOOTER" });

    // const order_sidebar = param.onSidebar ? calc(footerItems, true) : 0

    const params: T_footer_items_create = {
      is_published: param.is_published,
      icon_name: param.titleText,
      // 選択されていたらアイコンの名前を返す.
      displayed_icon_name: param.selectedIcon ? param.selectedIcon[1] : null,
      on_tap: param.onTap,
      item_content: param.editorText,
      item_excerpt: param.editorTextExcerpt,
      link_url: param.linkUrl,
      app_link_url: param.appLinkUrl,
      modal_size: param.modalSize,
      on_sidebar: param.onSidebar,
      order: calcOrder(footerItems, false),
      order_sidebar: param.onSidebar ? calcOrder(footerItems, true) : 0,
      data_type: param.dataType,
      user_id: appState.userInfo.user_id,
    };

    console.log(JSON.stringify(params));

    const data = await apiFooterItemsCreate(params)

    if (data.err === true) {
      alert("投稿できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      dispatchAppState({ type: "CLOSE_MODAL" });

      getFooterItems();
    }
  };
};
