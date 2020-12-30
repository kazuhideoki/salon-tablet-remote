import React from 'react'
import { AppStateContext } from '../../../../../Store/appState/Context';
import { FooterItem } from "../../../../../Store/Types";
import { useDrawerProps } from '../../../Drawer/Drawer/view/Drawer';

export const useHandleOnUpdateFooterItem = () => {
         const { dispatchAppState } = React.useContext(AppStateContext);
         const { openModal } = useDrawerProps();

         return (footerItem: FooterItem) => {
           dispatchAppState({
             type: "OPEN_FOOTER_ITEM_EDITOR_FOR_EDIT",
             payload: footerItem,
           });
           openModal("edit_footer_item");
         };
       };