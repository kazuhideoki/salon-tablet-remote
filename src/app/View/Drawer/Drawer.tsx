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
import MenuIcon from "@material-ui/icons/Menu";

import { ThemeContext, TThemeArgs } from "../../Store/ThemeContext";
import { Store } from "../../Store/Store";
import { signout } from "next-auth/client";
import { useCheckPassword } from "../../ActionCreator/user/useCheckPassword";
import { useGetArticles } from "../../ActionCreator/articles/useGetArticles";
import { drawerSettingJsx } from "./DrawerComponent/drawerSettingJsx";
import { drawerHeaderJsx } from "./DrawerComponent/drawerHeaderJsx";
import { drawerItemsJsx } from "./DrawerComponent/drawerItemsJsx";
import { useIsMobile } from "../../../lib/useIsMobile";
import { useFooterProps } from "../Footer/Footer";
import { useDeleteFooterItem } from "../../ActionCreator/footerItems/useDeleteFooterItem";


export const useDrawerProps = () => {
  const theme = useTheme();
  const { dispatchAppState, appState } = React.useContext(Store);
  const { isSetting, isPublicPage, isDrawerOpen, footerItems} = appState
  const getArticles = useGetArticles()
  
  const checkPassword = useCheckPassword();
  const handleSubmitPassword = async (password: string) => {
    
    const result = await checkPassword(password);
    if (result === true) {
      getArticles(true, 1, appState.selectedArticlesTags, false)
    } else if (result === false) {
      alert("パスワードが間違っています。");
    }
  };
  const handleSwitchIsSetting = () => {
    getArticles(true, 1, appState.selectedArticlesTags, false);
  }

  const handleOnSingOut = () => {
    const signOuting = confirm('サインアウトしますか？')
    signOuting ? signout() : null
  }

  const handleDrawerClose = () => {
    getArticles(false, 1, appState.selectedArticlesTags, false)
    dispatchAppState({ type: "CLOSE_DRAWER" }); // getArticlesまえにdispatchされた値は,apiに送信されるときに反映されない。→get終わってから反映
  };
  const handleDrawerCloseKeepIsSetting = () => {
    dispatchAppState({ type: "CLOSE_DRAWER" }); 
  };

  const isMobile = useIsMobile()
  const [pass, setPass] = React.useState('')

  const themes = React.useContext(ThemeContext);

  const closeDrawerTapMain = (e) => {
    dispatchAppState({type: 'CLOSE_DRAWER'})
  }


  const { handleOnUpDateFooterIcon } = useFooterProps()
  const deleteItem = useDeleteFooterItem()

  return {
    theme,
    isSetting,
    isPublicPage,
    isDrawerOpen,
    footerItems,
    dispatchAppState,
    handleSubmitPassword,
    handleSwitchIsSetting,
    handleOnSingOut,
    handleDrawerClose,
    handleDrawerCloseKeepIsSetting,
    isMobile,
    pass,
    setPass,
    themes,
    closeDrawerTapMain,
    handleOnUpDateFooterIcon,
    deleteItem,
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
        color="inherit"
        aria-label="open drawer"
        onClick={() => props.dispatchAppState({ type: "OPEN_DRAWER" })}
        edge="start"
        className={clsx(classes.menuButton, props.isDrawerOpen && classes.hide)}
      >
        <MenuIcon />
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
            <Divider className={classes.underItem}/>
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
        })} ${props.isMobile === false && props.isDrawerOpen ? classes.contentShiftTablet : ''}`}
      >
        {props.children}
      </main>
      {props.isMobile && props.isDrawerOpen ? (
        <div
          className={classes.greyScreen}
          onClick={props.isDrawerOpen ? props.closeDrawerTapMain : null}
        ></div>
      ) : null}
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
