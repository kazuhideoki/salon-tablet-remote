import React from "react";

import { useGetFooterItems } from "./useGetFooterItems";
import { TCreateFooterItem, generateFooterItemEdittingParams } from "./useCreateFooterItem";
import { T_footer_items_update, apiFooterItemsUpdate } from "../../../pages/api/footer_items/update";
import { FooterItemsContext } from "../../Store/footerItems/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { useModalProps } from "../../View/tablet/Modal/Modal/view/Modal";
import { useFooterProps } from "../../View/tablet/Footer/Footer/view/Footer";

export type TUpdateFooterItem = TCreateFooterItem;

export const useUpdateFooterItem = () => {
  const { appState } = React.useContext(AppStateContext);
  const { footerItems } = React.useContext(FooterItemsContext);
  const { closeModal } = useModalProps();
  const { handleLoadingFooter } = useFooterProps()
  const getFooterItems = useGetFooterItems();

  return async (param: TUpdateFooterItem) => {

    closeModal()
    handleLoadingFooter(true)

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
      handleLoadingFooter(false)
    } else {
      closeModal()

      getFooterItems();
    }
  };
};
