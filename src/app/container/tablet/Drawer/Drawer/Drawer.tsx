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
import { useFooterProps } from '../../Footer/Footer/Footer';
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
import { DrawerPresenterProps, useDrawerProps } from './useDrawerPops';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: 'flex',
      position: 'absolute',
    },
    menuButton: {
      zIndex: theme.zIndex.drawer,
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
      position: 'fixed',
      top: 0,
      left: 0,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      // zIndex: theme.zIndex.drawer,
      width: (themes: ThemeArgs) => themes.drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: (themes: ThemeArgs) => themes.drawerWidth,
      overflowX: 'visible',
      overflowY: 'scroll',
    },
    drawerHeader: {
      overflow: 'visible',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    underItem: {
      marginBottom: 'auto',
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: (themes: ThemeArgs) => -themes.drawerWidth,
      overflow: 'visible',
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    // 関数は優先度が高くなってしまうので別に切り分け。tabletようのmargin調整
    contentShiftTablet: {
      marginLeft: (themes: ThemeArgs) => 0,
    },
    greyScreen: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 500,
    },
  });
});

export const DrawerPresenter: React.FC<DrawerPresenterProps> = (props) => {
  const classes = useStyles(props.themes);

  const drawerHeader = <DrawerHeader {...props} />;
  const drawerItems = <DrawerItems {...props} />;
  const drawerSetting = <DrawerSetting {...props} />;

  return (
    <div className={`${classes.root} ${props.className}`}>
      <CssBaseline />
      <IconButton
        // color="inherit"
        aria-label="open drawer"
        onClick={() => props.handleOpenDrawer()}
        edge="start"
        className={clsx(
          classes.menuButton,
          props.isDrawerOpen && classes.hide
        )}>
        {/* <MenuIcon /> */}
        <Settings />
      </IconButton>
      <MuiDrawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.isDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>{drawerHeader}</div>
        <Divider />

        {!props.isSetting ? (
          <>
            {drawerItems}
            <Divider className={classes.underItem} />
          </>
        ) : null}

        {props.isPublicPage ? null : drawerSetting}

        <Divider />

        {/* 編集モードではアイテムは下にずらす */}
        {props.isSetting ? (
          <>
            {drawerItems}
            <Divider />
          </>
        ) : null}
      </MuiDrawer>
      <main
        className={`${clsx(classes.content, {
          [classes.contentShift]: props.isDrawerOpen,
        })} ${
          props.isMobile === false && props.isDrawerOpen
            ? classes.contentShiftTablet
            : ''
        }`}>
        {props.children}
      </main>
      {props.isMobile && props.isDrawerOpen ? (
        <div
          className={classes.greyScreen}
          onClick={props.handleCloseDrawer}></div>
      ) : null}
      {props.isClicked ? <AuthCircular message="サインアウト中" /> : null}
    </div>
  );
};

export const Drawer: React.FC<{ className?: string }> = (props) => {
  const useProps = useDrawerProps();

  return (
    <DrawerPresenter {...useProps} className={props.className}>
      {props.children}
    </DrawerPresenter>
  );
};
