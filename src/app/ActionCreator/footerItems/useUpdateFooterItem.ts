import React from "react";
import { Store } from "../../Store/Store";

import { useGetFooterItems } from "./useGetFooterItems";
import { TCreateFooterItem, calcOrder, generateFooterItemEdittingParams } from "./useCreateFooterItem";
import { T_footer_items_update, apiFooterItemsUpdate } from "../../../pages/api/footer_items/update";

export type TUpdateFooterItem = TCreateFooterItem;

export const useUpdateFooterItem = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { footerItems} = appState
  const getFooterItems = useGetFooterItems();

  return async (param: TUpdateFooterItem) => {

    dispatchAppState({ type: "CLOSE_MODAL" });
    dispatchAppState({ type: "ON_IS_LOADING_FOOTER" });

    const params: T_footer_items_update = {
      id: appState.edittingPrams.footerItem.footer_item_id,
      params: {
        ...generateFooterItemEdittingParams(param, footerItems),
        is_published: param.is_published,
      },
    };

    const data = await apiFooterItemsUpdate(params);

    if (data.err === true) {
      alert("更新できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      dispatchAppState({ type: "CLOSE_MODAL" });

      getFooterItems();
    }
  };
};
