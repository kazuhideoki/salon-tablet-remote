import React from 'react';
import { FooterPresenter } from '../app/View/Footer/Footer';
import { samplefooterItems } from "./footerItems";
import ThemeProvider, { ThemeContext } from '../app/Store/ThemeContext';
import { MuiThemeProvider } from '@material-ui/core';
import { themeMinimal } from '../app/Store/themes/themeMinimal';
import { themeArgs } from "../app/Store/ThemeContext";
import { Provider } from './lib/ThemeProvider';

export default {
  title: "Footer/Footer",
  component: FooterPresenter,
};

const props = {
  isSetting: true,
  openModal: null,
  dispatchAppState: null,
  footerItems: samplefooterItems,
  handleOnUpDateFooterIcon: null,
  handleOnDeleteFooterItem: null,
  isMobile: null,
  deleteFooterItem: null,
  loading: false,
};

export const Normal = () => {

  return (
    <Provider>
      <FooterPresenter {...props} />
    </Provider>
  );
}
export const Loading = () => {

  return (
    <Provider>
    <FooterPresenter {...props} loading={true}/>
    </Provider>
  )
}

export const NormalIsSettingFalse = () => {

  return (
    <Provider>
    <FooterPresenter {...props} isSetting={false} />
    </Provider>
  );
}

const footerItems = samplefooterItems
  .concat(samplefooterItems)
  .concat(samplefooterItems)
  .concat(samplefooterItems);

export const ManyIcon = () => {
  return (
    <Provider>
    <FooterPresenter {...props} footerItems={footerItems} />
    </Provider>
  );
};

export const ManyIconIsSettingFalse = () => {
  return (
    <Provider>
      <FooterPresenter {...props} footerItems={footerItems} isSetting={false} />
    </Provider>
  );
};