import React from 'react';
import { FooterPresenter } from '../app/View/tablet/Footer/Footer/view/Footer';
import { samplefooterItems } from "./lib/sampleFooterItems";
import { ThemeProvider } from './lib/ThemeProvider';

export default {
  title: "Footer/Footer",
  component: FooterPresenter,
};

const props = {
  isSetting: true,
  openModal: null,
  openFooterItemModal: null,
  footerItems: samplefooterItems,
  handleOnUpDateFooterIcon: null,
  handleOnDeleteFooterItem: null,
  isMobile: null,
  deleteFooterItem: null,
  loading: false,
};

export const Normal = () => {

  return (
    <ThemeProvider>
      <FooterPresenter {...props} />
    </ThemeProvider>
  );
}
export const Loading = () => {

  return (
    <ThemeProvider>
    <FooterPresenter {...props} loading={true}/>
    </ThemeProvider>
  )
}

export const NormalIsSettingFalse = () => {

  return (
    <ThemeProvider>
    <FooterPresenter {...props} isSetting={false} />
    </ThemeProvider>
  );
}

const footerItems = samplefooterItems
  .concat(samplefooterItems)
  .concat(samplefooterItems)
  .concat(samplefooterItems);

export const ManyIcon = () => {
  return (
    <ThemeProvider>
    <FooterPresenter {...props} footerItems={footerItems} />
    </ThemeProvider>
  );
};

export const ManyIconIsSettingFalse = () => {
  return (
    <ThemeProvider>
      <FooterPresenter {...props} footerItems={footerItems} isSetting={false} />
    </ThemeProvider>
  );
};