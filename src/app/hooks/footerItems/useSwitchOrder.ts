import React from 'react';
import { useGetFooterItems } from './useGetFooterItems';
import {
  T_footer_items_switch_order,
  apiFooterItemsSwitchOrder,
} from '../../../pages/api/footer_items/switch_order';
import { FooterItem } from '../../../util/interface/Interface';
import { AppStateContext } from '../../store/appState/Context';
import { isLoadingFooter } from '../../store/appState/actions';

export type TUseSwitchOrders = {
  smaller: FooterItem;
  larger: FooterItem;
};

export const useSwitchOrder = () => {
  const getFooterItems = useGetFooterItems();
  const { dispatchAppState } = React.useContext(AppStateContext);

  return async ({ smaller, larger }: TUseSwitchOrders) => {
    dispatchAppState(isLoadingFooter(true));

    const params: T_footer_items_switch_order = {
      smaller: {
        footer_item_id: smaller.footer_item_id,
        order: smaller.order,
        order_sidebar: smaller.order_sidebar,
      },
      larger: {
        footer_item_id: larger.footer_item_id,
        order: larger.order,
        order_sidebar: larger.order_sidebar,
      },
    };

    try {
      await apiFooterItemsSwitchOrder(params);
      getFooterItems();
    } catch (err) {
      console.log(`useSwitchOrder: ${err}`);

      alert('アイテムを入れ替えることができませんでした');
      dispatchAppState(isLoadingFooter(false));
    }
  };
};
