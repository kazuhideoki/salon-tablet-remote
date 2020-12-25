import React from 'react'
import { TFooterItemEdittingParams } from '../../../../ActionCreator/footerItems/useCreateFooterItem';
import { Store } from '../../../../Store/Store';
import { T_modal_size } from '../../../../Store/Types';
export const useHandleChange = (
         edittingFooterItemParams: TFooterItemEdittingParams
       ) => {
         const { dispatchAppState } = React.useContext(Store);

         return (event: React.ChangeEvent<HTMLInputElement>) => {
           // 変更後のmodalSizeも一緒にedittingParams.footerItemsに格納
           const params: TFooterItemEdittingParams = {
             ...edittingFooterItemParams,
             modalSizeRadio: event.target.value as T_modal_size,
           };
           dispatchAppState({ type: "SET_MODAL_SIZE", payload: params });
         };
       };