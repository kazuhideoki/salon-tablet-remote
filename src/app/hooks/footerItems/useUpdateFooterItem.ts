import React from 'react';

import { useGetFooterItems } from './useGetFooterItems';
import {
  TCreateFooterItem,
  generateFooterItemEdittingParams,
} from './useCreateFooterItem';
import {
  T_footer_items_update,
  apiFooterItemsUpdate,
} from '../../../pages/api/footer_items/update';
import { FooterItemsContext } from '../../Store/footerItems/Context';
import { AppStateContext } from '../../Store/appState/Context';
import { closeModal, isLoadingFooter } from '../../Store/appState/actions';

export type TUpdateFooterItem = TCreateFooterItem;

export const useUpdateFooterItem = () => {
  const { appState, dispatchAppState } = React.useContext(AppStateContext);
  const { footerItems } = React.useContext(FooterItemsContext);
  const getFooterItems = useGetFooterItems();

  return async (param: TUpdateFooterItem) => {
    dispatchAppState(closeModal());
    dispatchAppState(isLoadingFooter(true));

    const params: T_footer_items_update = {
      id: appState.edittingPrams.footerItem.footer_item_id,
      params: {
        ...generateFooterItemEdittingParams(param, footerItems),
        is_published: param.is_published,
      },
    };

    try {
      await apiFooterItemsUpdate(params);
      dispatchAppState(closeModal());
      getFooterItems();
    } catch (err) {
      console.log(`useUpdateFooterItem: ${err}`);

      alert('更新できませんでした');
      dispatchAppState(isLoadingFooter(false));
    }
  };
};
