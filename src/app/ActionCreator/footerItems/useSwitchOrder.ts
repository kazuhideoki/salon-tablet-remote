import React from "react";
import { useGetFooterItems } from "./useGetFooterItems";
import {
  T_footer_items_switch_order,
  apiFooterItemsSwitchOrder,
} from "../../../pages/api/footer_items/switch_order";
import { Store } from "../../Store/Store";

export const useSwitchOrder = () => {
  const getFooterItems = useGetFooterItems();
  const { dispatchAppState }= React.useContext(Store)

  return async (params: T_footer_items_switch_order) => {

    dispatchAppState({ type: "ON_IS_LOADING_FOOTER" });

    console.log("useSwitchOrderのparamsは " + params);

    const data = await apiFooterItemsSwitchOrder(params)

    if (data.err === true) {
      alert("アイテムを入れ替えることができませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      getFooterItems();
    }
  };
};
