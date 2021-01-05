import React from 'react';
import {
  DrawerPresenter,
  TUseDrawerProps,
} from '../app/container/tablet/Drawer/Drawer/view/Drawer';
import { useTheme } from '@material-ui/core';
import { samplefooterItems } from './lib/sampleFooterItems';
import { useThemeArgs } from '../app/Store/theme/ThemeProvider';
export default {
  title: 'Drawer/Drawer',
  component: DrawerPresenter,
};

const props: TUseDrawerProps = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  theme: null,
  isSetting: false,
  isPublicPage: false,
  isDrawerOpen: false,
  dispatchAppState: () => {
    return;
  },
  handleOnSignOut: () => {
    return;
  },
  handleDrawerClose: () => {
    return;
  },
  isMobile: false,
  footerItems: samplefooterItems,
  handleSwitchIsSetting: () => {
    return;
  },
  pass: '',
  setPass: () => {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  themes: null,
  closeDrawer: () => {
    return;
  },
  handleOnUpDateFooterIcon: () => {
    return;
  },
  isClicked: false,
};

export const Close = () => {
  function test() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
  }
  test();

  const theme = useTheme();
  const themes = useThemeArgs('medium');

  return <DrawerPresenter {...props} theme={theme} themes={themes} />;
};
export const Open = () => {
  const theme = useTheme();
  const themes = useThemeArgs('medium');

  return (
    <DrawerPresenter
      {...props}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
    />
  );
};
export const OpenMobile = () => {
  const theme = useTheme();
  const themes = useThemeArgs('medium');

  return (
    <DrawerPresenter
      {...props}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
      isMobile={true}
    />
  );
};
export const OpenIsSetting = () => {
  const theme = useTheme();
  const themes = useThemeArgs('medium');

  return (
    <DrawerPresenter
      {...props}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
      isSetting={true}
    />
  );
};
export const OpenIsSettingMobile = () => {
  const theme = useTheme();
  const themes = useThemeArgs('medium');

  return (
    <DrawerPresenter
      {...props}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
      isSetting={true}
      isMobile={true}
    />
  );
};
