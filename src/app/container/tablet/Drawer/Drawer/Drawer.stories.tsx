import React from 'react';
import { DrawerPresenter, DrawerPresenterProps } from './Drawer';
import { useTheme } from '@material-ui/core';
import { samplefooterItems } from '../../../../../util/dev/sampleFooterItems';
import { useThemeArgs } from '../../../../stores/theme/ThemeProvider';
export default {
  title: 'Drawer/Drawer',
  component: DrawerPresenter,
};

const useProps = (): DrawerPresenterProps => {
  const theme = useTheme();
  return {
    theme: theme,
    handleDrawerOpen: () => {
      return;
    },
    openFooterItemModal: () => {
      return;
    },
    deleteFooterItem: async () => {
      return;
    },
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
    themes: useThemeArgs('medium'),
    closeDrawer: () => {
      return;
    },
    handleOnUpDateFooterIcon: () => {
      return;
    },
    isClicked: false,
    openModal: () => {
      return;
    },
    openArticleEditor: () => {
      return;
    },
    openFooterItemEditor: () => {
      return;
    },
    switchOrder: async () => {
      return;
    },
  };
};

export const Close = (): JSX.Element => {
  const theme = useTheme();
  const themes = useThemeArgs('medium');

  return <DrawerPresenter {...useProps()} theme={theme} themes={themes} />;
};
export const Open = (): JSX.Element => {
  const theme = useTheme();
  const themes = useThemeArgs('medium');

  return (
    <DrawerPresenter
      {...useProps()}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
    />
  );
};
export const OpenMobile = (): JSX.Element => {
  const theme = useTheme();
  const themes = useThemeArgs('medium');

  return (
    <DrawerPresenter
      {...useProps()}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
      isMobile={true}
    />
  );
};
export const OpenIsSetting = (): JSX.Element => {
  const theme = useTheme();
  const themes = useThemeArgs('medium');

  return (
    <DrawerPresenter
      {...useProps()}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
      isSetting={true}
    />
  );
};
export const OpenIsSettingMobile = (): JSX.Element => {
  const theme = useTheme();
  const themes = useThemeArgs('medium');

  return (
    <DrawerPresenter
      {...useProps()}
      theme={theme}
      themes={themes}
      isDrawerOpen={true}
      isSetting={true}
      isMobile={true}
    />
  );
};
