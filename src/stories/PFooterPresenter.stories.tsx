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

export const NormalIsSettingFalse = () => {

  return (
    //@ts-ignore
    <PFooterPresenter {...props} appState={{ isSetting: false }} />
  );
}

const footerItems = samplefooterItems
  .concat(samplefooterItems)
  .concat(samplefooterItems)
  .concat(samplefooterItems);

export const ManyIcon = () => {
  return (
    //@ts-ignore
    <PFooterPresenter {...props} footerItems={footerItems} />
  );
};

export const ManyIconIsSettingFalse = () => {
  return (
    //@ts-ignore
    <PFooterPresenter {...props} footerItems={footerItems} appState={{ isSetting: false }} />
  );
};