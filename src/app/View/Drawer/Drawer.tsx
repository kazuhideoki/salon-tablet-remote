import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { Drawer as MuiDrawer, useMediaQuery, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { ThemeContext, TThemeArgs } from "../../Store/ThemeContext";
import { Store } from "../../Store/Store";
import { NoteAddOutlined, VideoLabel, Settings, ExitToApp, Feedback, Wallpaper, Instagram } from "@material-ui/icons";
import { TextField, Button } from "@material-ui/core";
import { signout } from "next-auth/client";
import { useCheckPassword } from "../../ActionCreator/user/useCheckPassword";
import { TagsButton } from "../Footer/PaginationBar/TagsButton";
import { useGetArticles } from "../../ActionCreator/articles/useGetArticles";
import { drawerSettingJsx } from "./DrawerComponent/drawerSettingJsx";
import { drawerHeaderJsx } from "./DrawerComponent/drawerHeaderJsx";
import { drawerItemsJsx } from "./DrawerComponent/drawerItemsJsx";


export const useDrawerProps = () => {
  const theme = useTheme();
  const { dispatchAppState, appState } = React.useContext(Store);
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

  const isMobile = useMediaQuery("(max-width:480px)");

  const [pass, setPass] = React.useState('')

  const themes = React.useContext(ThemeContext);

  return {
    theme,
    appState,
    dispatchAppState,
    handleSubmitPassword,
    handleSwitchIsSetting,
    handleOnSingOut,
    handleDrawerClose,
    isMobile,
    pass,
    setPass,
    themes,
  };
}

export type TUseDrawerProps = ReturnType<typeof useDrawerProps> & {className: string}

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
      root: {
        display: "flex",
        position: "absolute",
      },
      appBar: {
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: (themes: TThemeArgs) => `calc(100% - ${themes.drawerWidth}px)`,
        marginLeft: (themes: TThemeArgs) => themes.drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
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
        width: (themes: TThemeArgs) => themes.drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: (themes: TThemeArgs) => themes.drawerWidth,
        overflow: 'visible',
      },
      drawerHeader: {
        overflow: 'visible',
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
      content: {

        flexGrow: 1,
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: (themes: TThemeArgs) => -themes.drawerWidth,
        overflow: 'visible',
      },
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: (themes: TThemeArgs) => 0,
      },
      contentShiftWidth: {
        marginLeft: 0,
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
        className={clsx(
          classes.menuButton,
          props.appState.isDrawerOpen && classes.hide
        )}
      >
        <MenuIcon />
      </IconButton>
      <MuiDrawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.appState.isDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>{drawerHeader}</div>
        <Divider />

        {props.appState.isSetting ? null : drawerItems}
        <Divider />

        {props.appState.isPublicPage ? null : drawerSetting}

        <Divider />
      </MuiDrawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.appState.isDrawerOpen,
        })}
      >
        {props.children}
      </main>
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
