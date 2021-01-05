import React from 'react';
import { TFooterItemEdittingParams } from '../../../../../hooks/footerItems/useCreateFooterItem';
import { setModalSize } from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';
import { FooterItemsContext } from '../../../../../store/footerItems/Context';
import { T_modal_size } from '../../../../../store/Interface';
export const useHandleChange = (
  edittingFooterItemParams: TFooterItemEdittingParams
) => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { footerItems } = React.useContext(FooterItemsContext);

  return (event: React.ChangeEvent<HTMLInputElement>) => {
    // 変更後のmodalSizeも一緒にedittingParams.footerItemsに格納
    const params: TFooterItemEdittingParams = {
      ...edittingFooterItemParams,
      modalSizeRadio: event.target.value as T_modal_size,
    };
    dispatchAppState(
      setModalSize({ footerItemEdittingParams: params, footerItems })
    );
  };
};
