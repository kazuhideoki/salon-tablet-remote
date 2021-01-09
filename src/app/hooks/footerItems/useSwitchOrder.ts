import React from 'react';
import { useGetFooterItems } from './useGetFooterItems';
import {
  ApiFooterItemsSwitchOrder,
  apiFooterItemsSwitchOrder,
} from '../../../pages/api/footer_items/switch_order';
import { FooterItem } from '../../../util/interface/Interface';
import { AppStateContext } from '../../stores/appState/Context';
import { isLoadingFooter } from '../../stores/appState/actions';

type Props = {
  smaller: FooterItem;
  larger: FooterItem;
};

export const useSwitchOrder = () => {
  const getFooterItems = useGetFooterItems();
  const { dispatchAppState } = React.useContext(AppStateContext);

  return async ({ smaller, larger }: Props) => {
    dispatchAppState(isLoadingFooter(true));

    const params: ApiFooterItemsSwitchOrder = {
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
