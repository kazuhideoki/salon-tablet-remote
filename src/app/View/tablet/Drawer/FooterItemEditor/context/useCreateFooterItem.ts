import React from "react";
import {
  T_modal_size, T_is_published_footer_items, T_on_tap, T_data_type_footer_item, FooterItems,
} from "../../../../../Store/Types";
import { useGetFooterItems } from "./useGetFooterItems";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import { T_footer_items_create, apiFooterItemsCreate } from "../../../../../../pages/api/footer_items/create";
import { FooterItemsContext } from "../../../../../Store/footerItems/Context";
import { UserInfoContext } from "../../../../../Store/userInfo/Context";
import { closeModal, isLoadingFooter } from "../../../../../Store/appState/actions";
import { AppStateContext } from "../../../../../Store/appState/Context";

export type TFooterItemEdittingParams = {
  titleText: string;
  selectedIcon: [OverridableComponent<SvgIconTypeMap<{}, "svg">>, string];
  onTapRadio: T_on_tap;
  editorText: string;
  editorTextExcerpt: string;
  linkUrl: string;
  modalSizeRadio: T_modal_size;
  appLinkUrl: string;
  onSidebar: boolean;
  dataType: T_data_type_footer_item;
};

export type TCreateFooterItem = TFooterItemEdittingParams & {
  is_published: T_is_published_footer_items;
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

export const generateFooterItemEdittingParams = (param: TFooterItemEdittingParams, footerItems: FooterItems) => {
  return {
    icon_name: param.titleText,
    // 選択されていたらアイコンの名前を返す.
    displayed_icon_name: param.selectedIcon ? param.selectedIcon[1] : null,
    on_tap: param.onTapRadio,
    item_content: param.editorText,
    item_excerpt: param.editorTextExcerpt,
    link_url: param.linkUrl,
    app_link_url: param.appLinkUrl,
    modal_size: param.modalSizeRadio,
    order: calcOrder(footerItems, false),
    order_sidebar: param.onSidebar ? calcOrder(footerItems, true) : 0,
    data_type: param.dataType,
  };
}

export const useCreateFooterItem = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { footerItems } = React.useContext(FooterItemsContext);
  const getFooterItems = useGetFooterItems();

  return async (param: TCreateFooterItem) => {

    dispatchAppState(closeModal());
    dispatchAppState(isLoadingFooter(true));

    const params: T_footer_items_create = {
      ...generateFooterItemEdittingParams(param, footerItems),
      is_published: param.is_published,
      user_id: userInfo.user_id,
    };

    try {
      await apiFooterItemsCreate(params)
      dispatchAppState(closeModal())
  
      getFooterItems();
    } catch (err) {
      alert("投稿できませんでした");
      dispatchAppState(isLoadingFooter(false))

    }

  };
};
