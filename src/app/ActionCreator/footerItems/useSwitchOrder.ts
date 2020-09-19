import React from "react";
import { useGetFooterItems } from "./useGetFooterItems";
import {
  T_footer_items_switch_order,
  apiFooterItemsSwitchOrder,
} from "../../../pages/api/footer_items/switch_order";
import { Store } from "../../Store/Store";
import { T_footer_item_id, T_order, T_order_sidebar, FooterItem } from "../../Store/Types";

export type TUseSwitchOrders = {
  smaller: FooterItem
  larger: FooterItem
};

export const useSwitchOrder = () => {
  const getFooterItems = useGetFooterItems();
  const { dispatchAppState }= React.useContext(Store)

  return async ({smaller, larger}:TUseSwitchOrders) => {
    dispatchAppState({ type: "ON_IS_LOADING_FOOTER" });

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

    console.log("useSwitchOrderのparamsは " + params);

    const data = await apiFooterItemsSwitchOrder(params);

    if (data.err === true) {
      alert("アイテムを入れ替えることができませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      getFooterItems();
    }
  };
};
