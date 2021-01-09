import React from 'react';
import {
  ModalSize,
  Ontap,
  DataTypeFooterItem,
  FooterItems,
  FooterItem,
  FooterItemWithoutId,
} from '../../../util/interface/Interface';
import { useGetFooterItems } from './useGetFooterItems';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import {
  ApiFooterItemsCreate,
  apiFooterItemsCreate,
} from '../../../pages/api/footer_items/create';
import { FooterItemsContext } from '../../store/footerItems/Context';
import { UserInfoContext } from '../../store/userInfo/Context';
import { closeModal, isLoadingFooter } from '../../store/appState/actions';
import { AppStateContext } from '../../store/appState/Context';

export type FooterItemEdittingParams = {
  titleText: string;
  selectedIcon: [
    OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>,
    string
  ];
  onTapRadio: Ontap;
  editorText: string;
  editorTextExcerpt: string;
  linkUrl: string;
  modalSizeRadio: ModalSize;
  appLinkUrl: string;
  onSidebar: boolean;
  dataType: DataTypeFooterItem;
};

export type CreateFooterItem = FooterItemEdittingParams & {
  is_published: boolean;
};

export const calcOrder = (
  footerItems: FooterItems,
  isOrderSidebar: boolean
) => {
  if (footerItems.length) {
    // orderの最大値を取得
    const order = footerItems.map((value) => {
      if (isOrderSidebar) {
        return value.order_sidebar;
      }
      return value.order;
    });
    return Math.max(...order) + 1; // orderの最大値＋1を代入する
  } else {
    // 記事がないときは 1にする
    return 1;
  }
};

export const generateFooterItemEdittingParams = (
  param: FooterItemEdittingParams,
  footerItems: FooterItems
) => {
  return {
    icon_name: param.titleText,
    // 選択されていたらアイコンの名前を返す.
    displayed_icon_name: param.selectedIcon[1],
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
};

export const useCreateFooterItem = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { footerItems } = React.useContext(FooterItemsContext);
  const getFooterItems = useGetFooterItems();

  return async (param: CreateFooterItem) => {
    dispatchAppState(closeModal());
    dispatchAppState(isLoadingFooter(true));

    const params: ApiFooterItemsCreate = {
      ...generateFooterItemEdittingParams(param, footerItems),
      is_published: param.is_published,
      user_id: userInfo.user_id,
    };

    try {
      await apiFooterItemsCreate(params);
      dispatchAppState(closeModal());

      getFooterItems();
    } catch (err) {
      console.log(`useCreateFooterItem: ${err}`);

      alert('投稿できませんでした');
      dispatchAppState(isLoadingFooter(false));
    }
  };
};
