import React from 'react'
import { updateFooterItem } from '../../../../../Store/appState/actions';
import { AppStateContext } from '../../../../../Store/appState/Context';
import { FooterItem } from "../../../../../Store/Types";
import { useDrawerProps } from '../../../Drawer/Drawer/view/Drawer';

export const useHandleOnUpdateFooterItem = () => {
         const { dispatchAppState } = React.useContext(AppStateContext);
         const { openModal } = useDrawerProps();

         return (footerItem: FooterItem) => {
           dispatchAppState(updateFooterItem(footerItem));
           openModal("edit_footer_item");
         };
       };