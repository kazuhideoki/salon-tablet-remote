import React from "react";
import { useGetFooterItems } from "./useGetFooterItems";
import {
  T_footer_items_switch_order,
  apiFooterItemsSwitchOrder,
} from "../../../pages/api/footer_items/switch_order";

export const useSwitchOrder = () => {
  const getFooterItems = useGetFooterItems();

  return async (params: T_footer_items_switch_order) => {
    console.log("useSwitchOrderのparamsは " + params);

    const data = await apiFooterItemsSwitchOrder(params)

    if (data.err === true) {
      alert("アイテムを入れ替えることができませんでした");
    } else {
      getFooterItems();
    }
  };
};
