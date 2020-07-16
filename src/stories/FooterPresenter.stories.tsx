import React from 'react';
import { FooterPresenter } from '../app/View/Footer/Footer';
import { samplefooterItems } from "./footerItems";
export default {
  title: 'FooterPresenter',
  component: FooterPresenter,
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
    <FooterPresenter {...props}/>
  )
}

export const NormalIsSettingFalse = () => {

  return (
    //@ts-ignore
    <FooterPresenter {...props} appState={{ isSetting: false }} />
  );
}

const footerItems = samplefooterItems
  .concat(samplefooterItems)
  .concat(samplefooterItems)
  .concat(samplefooterItems);

export const ManyIcon = () => {
  return (
    //@ts-ignore
    <FooterPresenter {...props} footerItems={footerItems} />
  );
};

export const ManyIconIsSettingFalse = () => {
  return (
    //@ts-ignore
    <FooterPresenter {...props} footerItems={footerItems} appState={{ isSetting: false }} />
  );
};