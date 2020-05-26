import React from 'react';
import { PFooterPresenter, usePFooterProps } from "../app/View/PFooter/PFooter";
import { footerItems } from './footerItems';
export default {
title: 'PFooterPresenter',
component: PFooterPresenter,
};
//@ts-ignore
export const Normal = () => {
  const {
    openModal,
    dispatchAppState,
    handleOnUpDateFooterIcon,
    handleOnDeleteFooterItem,
  } = usePFooterProps()
  const props = usePFooterProps()
  const appState = {
    isSetting: true,
    setModal: "edit_footer_item",
    ContentModal: "<h1>雑誌！？</h1>",
    isModalOpen: false,
    isArticleModalOpen: false,
  };

  //@ts-ignore
  return <PFooterPresenter {...props} footerItems={footerItems} appState={appState}/>;
}