import React from 'react';
import { FooterItemEdittingParams } from '../../../../../hooks/footerItems/useCreateFooterItem';
import { setModalSize } from '../../../../../stores/appState/actions';
import { AppStateContext } from '../../../../../stores/appState/Context';
import { FooterItemsContext } from '../../../../../stores/footerItems/Context';
import { ModalSize } from '../../../../../../util/interface/Interface';
export const useHandleChange = (
  edittingFooterItemParams: FooterItemEdittingParams
) => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { footerItems } = React.useContext(FooterItemsContext);

  return (event: React.ChangeEvent<HTMLInputElement>) => {
    // 変更後のmodalSizeも一緒にedittingParams.footerItemsに格納
    const params: FooterItemEdittingParams = {
      ...edittingFooterItemParams,
      modalSizeRadio: event.target.value as ModalSize,
    };
    dispatchAppState(
      setModalSize({ footerItemEdittingParams: params, footerItems })
    );
  };
};
