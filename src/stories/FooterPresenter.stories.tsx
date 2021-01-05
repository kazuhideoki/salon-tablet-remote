import React from 'react';
import {
  FooterPresenter,
  TFooterPresenter,
} from '../app/container/tablet/Footer/Footer/Footer';
import { samplefooterItems } from './lib/sampleFooterItems';
import { ThemeProvider } from './lib/ThemeProvider';

export default {
  title: 'Footer/Footer',
  component: FooterPresenter,
};

const props: TFooterPresenter = {
  isSetting: true,
  openFooterItemModal: () => {
    return;
  },
  footerItems: samplefooterItems,
  handleOnUpDateFooterIcon: () => {
    return;
  },
  isMobile: false,
  deleteFooterItem: async () => {
    return;
  },
  loading: false,
  handleLoadingFooter: () => {
    return;
  },
  switchOrder: async () => {
    return;
  },
};

export const Normal = () => {
  return (
    <ThemeProvider>
      <FooterPresenter {...props} />
    </ThemeProvider>
  );
};
export const Loading = () => {
  return (
    <ThemeProvider>
      <FooterPresenter {...props} loading={true} />
    </ThemeProvider>
  );
};

export const NormalIsSettingFalse = () => {
  return (
    <ThemeProvider>
      <FooterPresenter {...props} isSetting={false} />
    </ThemeProvider>
  );
};

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
