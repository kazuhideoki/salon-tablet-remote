import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { Drawer as MuiDrawer } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { ThemeArgs } from '../../../../stores/theme/ThemeProvider';
import { DrawerSetting } from './components/DrawerSetting';
import { DrawerHeader } from './components/DrawerHeader';
import { DrawerItems } from './components/DrawerItems';
import { useIsMobile } from '../../../../../util/useIsMobile';
import { useFooterProps } from '../../Footer/Footer/useFooterProps';
import { Settings } from '@material-ui/icons';
import { AuthCircular } from '../../../../components/AuthCircular';
import { useHandleSwitchIsSetting } from './context/useHandleSwitchIsSetting';
import { useHandleSingOut } from './context/useHandleSignOut';
import { useHandleCloseDrawer } from './context/useHandleCloseDrawer';
import { useHandleOpneDrawer } from './context/useHandleOpenDrawer';
import { useStateDrawer } from './context/useStateDrawer';
import { useOpenModal } from './context/useOpenModal';
import { useOpenArticleEditor } from './context/useOpenArticleEditor';
import { useOpenFooterItemEditor } from './context/useOpenFooterItemEditor';
import { useSwitchOrder } from '../../../../hooks/footerItems/useSwitchOrder';

export const useDrawerProps = () => {
  const {
    dispatchAppState,
    isSetting,
    isPublicPage,
    isDrawerOpen,
    footerItems,
    pass,
    setPass,
    themes,
  } = useStateDrawer();

  const { isClicked, handleSignOut } = useHandleSingOut();
  const handleSwitchIsSetting = useHandleSwitchIsSetting();
  const handleOpenDrawer = useHandleOpneDrawer();
  const handleCloseDrawerAndGet = useHandleCloseDrawer(true);
  const handleCloseDrawer = useHandleCloseDrawer(false);
  const openModal = useOpenModal();
  const openArticleEditor = useOpenArticleEditor();
  const openFooterItemEditor = useOpenFooterItemEditor();
  const switchOrder = useSwitchOrder();

  const theme = useTheme();
  const isMobile = useIsMobile();
  const {
    handleOnUpDateFooterIcon,
    openFooterItemModal,
    deleteFooterItem,
  } = useFooterProps();

  return {
    theme,
    dispatchAppState,
    isSetting,
    isPublicPage,
    isDrawerOpen,
    footerItems,
    handleOpenDrawer,
    handleSwitchIsSetting,
    handleSignOut,
    handleCloseDrawerAndGet,
    isMobile,
    pass,
    setPass,
    themes,
    handleCloseDrawer,
    handleOnUpDateFooterIcon,
    openFooterItemModal,
    deleteFooterItem,
    isClicked,
    openModal,
    openArticleEditor,
    openFooterItemEditor,
    switchOrder,
  };
};

export type DrawerPresenterProps = ReturnType<typeof useDrawerProps> & {
  className?: string;
};
