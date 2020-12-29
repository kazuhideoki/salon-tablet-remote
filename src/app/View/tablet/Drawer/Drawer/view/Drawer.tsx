import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { Drawer as MuiDrawer } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { ThemeContext, TThemeArgs } from "../../../../../Store/ThemeContext";
import { drawerSettingJsx } from "../components/drawerSettingJsx";
import { drawerHeaderJsx } from "../components/drawerHeaderJsx";
import { drawerItemsJsx } from "../components/drawerItemsJsx";
import { useIsMobile } from "../../../../../../lib/useIsMobile";
import { useFooterProps } from "../../../Footer/Footer/view/Footer";
import { Settings } from "@material-ui/icons";
import { AuthCircular } from '../../../../../../lib/AuthCircular';
import { useHandleSwitchIsSetting } from "../context/useHandleSwitchIsSetting";
import { useHandleOnSingOut } from "../context/useHandleOnSingOut";
import { useHandleDrawerClose } from "../context/useHandleDrawerClose";
import { useHandleDrawerCloseKeepIsSetting } from "../context/useHandleDrawerCloseKeepIsSetting";
import { useCloseDrawerTapMain } from "../context/useCloseDrawerTapMain";
import { useHandleDrawerOpen } from "../context/useHandleDrawerOpen";
import { useStateDrawer } from "../context/useStateDrawer";
import { useOpenModal } from "../context/useOpenModal";

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
  } = useStateDrawer()

  const theme = useTheme();
  const isMobile = useIsMobile()
  const { handleOnUpDateFooterIcon, openFooterItemModal } = useFooterProps()
    
    
  const { isClicked, handleOnSignOut } = useHandleOnSingOut();
  const handleSwitchIsSetting = useHandleSwitchIsSetting()
  const handleDrawerOpen = useHandleDrawerOpen()
  const handleDrawerClose = useHandleDrawerClose()
  const handleDrawerCloseKeepIsSetting = useHandleDrawerCloseKeepIsSetting()
  const closeDrawerTapMain = useCloseDrawerTapMain()
  const { deleteFooterItem } = useFooterProps()
  const openModal = useOpenModal()
  
  return {
    theme,
    dispatchAppState,
    isSetting,
    isPublicPage,
    isDrawerOpen,
    footerItems,
    handleDrawerOpen,
    handleSwitchIsSetting,
    handleOnSignOut,
    handleDrawerClose,
    handleDrawerCloseKeepIsSetting,
    isMobile,
    pass,
    setPass,
    themes,
    closeDrawerTapMain,
    handleOnUpDateFooterIcon,
    openFooterItemModal,
    deleteFooterItem,
    isClicked,
    openModal,
  };
}

export type TUseDrawerProps = ReturnType<typeof useDrawerProps> & {className?: string}

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
      root: {
        display: "flex",
        position: "absolute",
      },
      menuButton: {
        zIndex: theme.zIndex.drawer,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        position: "fixed",
        top: 0,
        left: 0,
      },
      hide: {
        display: "none",
      },
      drawer: {
        // zIndex: theme.zIndex.drawer,
        width: (themes: TThemeArgs) => themes.drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: (themes: TThemeArgs) => themes.drawerWidth,
        overflowX: "visible",
        overflowY: "scroll",
      },
      drawerHeader: {
        overflow: "visible",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
      underItem: {
        marginBottom: 'auto',
      },
      content: {
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: (themes: TThemeArgs) => -themes.drawerWidth,
        overflow: "visible",
      },
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        
      },
      // 関数は優先度が高くなってしまうので別に切り分け。tabletようのmargin調整
      contentShiftTablet: {
        marginLeft: (themes: TThemeArgs) => 0,
      },
      greyScreen: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 500,
      },
    });}
  )

export const DrawerPresenter:React.FC<TUseDrawerProps> = (props) => {
  
  const classes = useStyles(props.themes);

  const drawerHeader = drawerHeaderJsx(props)
  const drawerItems = drawerItemsJsx(props)
  const drawerSetting = drawerSettingJsx(props);
  

  return (
    <div className={`${classes.root} ${props.className}`}>
      <CssBaseline />
      <IconButton
        // color="inherit"
        aria-label="open drawer"
        onClick={() => props.handleDrawerOpen()}
        edge="start"
        className={clsx(classes.menuButton, props.isDrawerOpen && classes.hide)}
      >
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
        }}
      >
        <div className={classes.drawerHeader}>{drawerHeader}</div>
        <Divider />

        {/* {props.isMobile && !props.isSetting ? ( */}
        {!props.isSetting ? (
          <>
            {drawerItems}
            <Divider className={classes.underItem} />
          </>
        ) : null}

        {props.isPublicPage ? null : drawerSetting}

        <Divider />

        {/* 編集モードではアイテムは下にずらす */}
        {/* {props.isMobile && props.isSetting ? ( */}
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
            : ""
        }`}
      >
        {props.children}
      </main>
      {props.isMobile && props.isDrawerOpen ? (
        <div
          className={classes.greyScreen}
          onClick={props.isDrawerOpen ? props.closeDrawerTapMain : null}
        ></div>
      ) : null}
      {props.isClicked ? <AuthCircular message="サインアウト中" /> : null}
    </div>
  );
}

export const Drawer = (props) => {
  const useProps = useDrawerProps();

  return (
    <DrawerPresenter {...useProps} className={props.className}>
      {props.children}
    </DrawerPresenter>
  );
}
