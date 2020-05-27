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
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { ThemeContext } from "../Store/ThemeContext";
import { Store } from "../Store/Store";
import { EditorContext } from "../Store/EditorContext";
import { NoteAddOutlined, VideoLabel, Settings } from "@material-ui/icons";
import { TextField, Button } from "@material-ui/core";

export const useDrawerProps = () => {
  const theme = useTheme();
  const { dispatchAppState, appState } = React.useContext(Store);
  const {
    setEditorText,
    setTitleText,
    setFooterItemEditorText,
    setIconName,
    setOnTap,
    setLinkUrl,
    setIsEdittingArticle,
    dispatchSelectedIcon,
    setIsEdittingFooterItem,
  } = React.useContext(EditorContext);

  const handleOpenArticleEditor = () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "edit_article" });
    setIsEdittingArticle(false);
    setTitleText("");
    setEditorText("");
  };

  const handleOpenFooterItemEditor = () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "edit_footer_item" });
    setIsEdittingFooterItem(false);
    setIconName("");
    setFooterItemEditorText("");
    setOnTap("modal");
    setLinkUrl("");
    dispatchSelectedIcon({ type: "SET_ICON", payload: null });
  };

  const enterPassword = () => {
    dispatchAppState({ type: "ON_IS_SETTING" });
    dispatchAppState({ type: "CLOSE_MODAL" });
  };

  return {
    theme,
    appState,
    dispatchAppState,
    handleOpenArticleEditor,
    handleOpenFooterItemEditor,
    enterPassword,
  };
}
type useDrawerProps = ReturnType<typeof useDrawerProps>
type DrawerProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
type PresenterProps = useDrawerProps & DrawerProps

const useStyles = makeStyles((theme: Theme) => {
    const themes = React.useContext(ThemeContext);
    return createStyles({
      root: {
        display: "flex",
        position: "absolute",
      },
      menuButton: {
        // marginRight: theme.spacing(2),
        zIndex: 50,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        position: "absolute",
        top: 0,
        left: 0,
      },
      hide: {
        display: "none",
      },
      drawer: {
        width: themes.drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: themes.drawerWidth,
      },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
      content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -themes.drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    })}
  )

export const DrawerPresenter:React.FC<PresenterProps> = (props) => {
  const classes = useStyles();

  const handleDrawerOpen = () => {
    props.setOpen(true);
    props.dispatchAppState({ type: "CLOSE_MODAL" });
  };

  const handleDrawerClose = () => {
    props.setOpen(false);
    // Drawerが閉じきってからisSettingをfalseに
    setTimeout(() => {
      props.dispatchAppState({ type: "OFF_IS_SETTING" });
    }, 800);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, props.open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <MuiDrawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {props.theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {props.appState.isSetting ? (
          <List>
            <ListItem button onClick={() => props.handleOpenArticleEditor()}>
              <ListItemIcon>
                <NoteAddOutlined />
              </ListItemIcon>
              <ListItemText primary="新規投稿" />
            </ListItem>
            <ListItem button onClick={() => props.handleOpenFooterItemEditor()}>
              <ListItemIcon>
                <VideoLabel />
              </ListItemIcon>
              <ListItemText primary="アイコン作成" />
            </ListItem>
            <ListItem
              button
              onClick={() =>
                props.dispatchAppState({
                  type: "OPEN_MODAL",
                  payload: "setting_user_info",
                })
              }
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="設定" />
            </ListItem>
          </List>
        ) : (
          // パスワード用のTextFieldは今後実装
          <>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <Button onClick={() => props.enterPassword()}>入力</Button>
          </>
        )}

        <Divider />
      </MuiDrawer>
      {/* {props.children} */}
      <main
        className={`${clsx(classes.content, {
          [classes.contentShift]: props.open,
        })}`}
      >
        {props.children}
      </main>
    </div>
  );
}

export const Drawer: React.FC<DrawerProps> = (props) => {
  const useProps = useDrawerProps()

  return (
    <DrawerPresenter {...useProps} open={props.open} setOpen={props.setOpen}>
      {props.children}
    </DrawerPresenter>
  );
}
