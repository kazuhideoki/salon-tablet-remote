import React from "react";
import { useGetFooterItems } from "./useGetFooterItems";
import {
  T_footer_items_switch_order,
  apiFooterItemsSwitchOrder,
} from "../../../pages/api/footer_items/switch_order";
import { FooterItem } from "../../Store/Types";
import { AppStateContext } from "../../Store/appState/Context";
import { isLoadingFooter } from "../../Store/appState/actions";

export type TUseSwitchOrders = {
  smaller: FooterItem
  larger: FooterItem
};

export const useSwitchOrder = () => {
  const getFooterItems = useGetFooterItems();
  const { dispatchAppState }= React.useContext(AppStateContext)

  return async ({smaller, larger}:TUseSwitchOrders) => {
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
      }
    };

    const data = await apiFooterItemsSwitchOrder(params);

    if (data.err === true) {
      alert("アイテムを入れ替えることができませんでした");
      dispatchAppState(isLoadingFooter(false));
    } else {
      getFooterItems();
    }
  };
};
