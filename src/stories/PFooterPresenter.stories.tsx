import React from 'react';
import { PFooterPresenter } from '../app/View/PFooter/PFooter';
import { samplefooterItems } from "./footerItems";
export default {
  title: 'PFooterPresenter',
  component: PFooterPresenter,
};

const props = {
  appState: {
    isSetting: true,
  },
  openModal: null,
  dispatchAppState: null,
  footerItems: samplefooterItems,
  handleOnUpDateFooterIcon: null,
  handleOnDeleteFooterItem: null,
  isMobile: null,
};

export const Normal = () => {

  return (
    //@ts-ignore
    <PFooterPresenter {...props}/>
  )
}