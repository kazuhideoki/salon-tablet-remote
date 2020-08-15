import React from 'react';
import { FooterMobilePresenter } from '../app/View/mobile/FooterMobile';
import { samplefooterItems } from './lib/sampleFooterItems';
export default {
  title: "mobile/FooterMobile",
  component: FooterMobilePresenter,
};

const props = {
  appState: null,
  openModal: null,
  dispatchAppState: null,
  footerItems: samplefooterItems,
  handleOnUpDateFooterIcon: null,
  handleOnDeleteFooterItem: null,
  handleOpenFooterItemEditor: null,
  switchOrder: null,
};

export const Normal = () => {

  return (
    //@ts-ignore
    <FooterMobilePresenter {...props}/>
  )
}