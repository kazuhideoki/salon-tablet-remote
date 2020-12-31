import React from 'react'
import { setModal, updateFooterItem } from '../../../../../Store/appState/actions';
import { AppStateContext } from '../../../../../Store/appState/Context';
import { FooterItem } from "../../../../../Store/Types";

export const useHandleOnUpdateFooterItem = () => {
         const { dispatchAppState } = React.useContext(AppStateContext);

         return (footerItem: FooterItem) => {
           dispatchAppState(updateFooterItem(footerItem));
           dispatchAppState(setModal("edit_footer_item"));
         };
       };