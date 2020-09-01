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
import { ThemeContext } from "../../Store/ThemeContext";
import { Store } from "../../Store/Store";
import { NoteAddOutlined, VideoLabel, Settings, ExitToApp, Feedback, Wallpaper, Instagram } from "@material-ui/icons";
import { TextField, Button } from "@material-ui/core";
//@ts-ignore
import { signout } from "next-auth/client";
import { useCheckPassword } from "../../ActionCreator/user/useCheckPassword";
import { cipher } from "../../../module/bcrypt";
import { TagsButton } from "../Footer/PaginationBar/TagsButton";
import { useGetArticles } from "../../ActionCreator/articles/useGetArticles";


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
  };
}

export type TUseDrawerProps = ReturnType<typeof useDrawerProps> & {className: string}

const useStyles = makeStyles((theme: Theme) => {


    const tabletDrawerWidth = 210
    const mobileDrawerWidth = 60

    const themes = React.useContext(ThemeContext);

    return createStyles({
      root: {
        display: "flex",
        position: "absolute",
      },
      menuButton: {
        // marginRight: theme.spacing(2),
        zIndex: theme.zIndex.drawer,
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
        width: (styleProps: any) =>
          styleProps.isMobile === true ? mobileDrawerWidth : tabletDrawerWidth,
        // width: themes.drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: (styleProps) =>
          styleProps.isMobile === true ? mobileDrawerWidth : tabletDrawerWidth,
        // width: themes.drawerWidth,
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
        width: '100%',
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        // makeStylesの中で関数を使うとcssの優先度が高くなってしまうのでclassNameを分けてうまく切り替えができない。
        // 最初からclassNameの中で分岐しておく
        marginLeft: (styleProps) =>
          styleProps.isDrawerOpen ? 0 :
          styleProps.isMobile === true
            ? -mobileDrawerWidth
            : -tabletDrawerWidth,
        // marginLeft: -themes.drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
      contentShiftWidth: {
        marginLeft: 0,
      },
    });}
  )

export const DrawerPresenter:React.FC<TUseDrawerProps> = (props) => {
  const styleProps = {
    isMobile: props.isMobile,
    isDrawerOpen: props.appState.isDrawerOpen
  }
  const classes = useStyles(styleProps);


  let drawerSetting: JSX.Element
  if (props.appState.isSetting) {
    drawerSetting = (
      <>
        <List>
          <ListItem
            button
            onClick={() =>
              props.dispatchAppState({ type: "OPEN_ARTICLE_EDITOR" })
            }
          >
            <ListItemIcon>
              <NoteAddOutlined />
            </ListItemIcon>
            {props.isMobile ? null : <ListItemText primary="記事作成" />}
          </ListItem>
          <ListItem
            button
            onClick={() =>
              props.dispatchAppState({ type: "OPEN_FOOTER_ITEM_EDITOR" })
            }
          >
            <ListItemIcon>
              <VideoLabel />
            </ListItemIcon>
            {props.isMobile ? null : <ListItemText primary="アイテム作成" />}
          </ListItem>
          <ListItem
            button
            onClick={() =>
              props.dispatchAppState({
                type: "OPEN_MODAL",
                payload: "edit_tags",
              })
            }
          >
            <ListItemIcon>
              <TagsButton />
            </ListItemIcon>
            {props.isMobile ? null : <ListItemText primary="タグ管理" />}
          </ListItem>
          <ListItem
            button
            onClick={() =>
              props.dispatchAppState({
                type: "OPEN_MODAL",
                payload: "manage_instagram",
              })
            }
          >
            <ListItemIcon>
              <Instagram />
            </ListItemIcon>
            {props.isMobile ? null : (
              <ListItemText primary="Instagram 連携" secondary="製作中" />
            )}
          </ListItem>
          <ListItem
            button
            onClick={() =>
              props.dispatchAppState({
                type: "OPEN_MODAL",
                payload: "setting_theme",
              })
            }
          >
            <ListItemIcon>
              <Wallpaper />
            </ListItemIcon>
            {props.isMobile ? null : (
              <ListItemText primary="テーマ変更" secondary="製作中" />
            )}
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
            {props.isMobile ? null : <ListItemText primary="アカウント" />}
          </ListItem>
          <ListItem
            button
            onClick={() =>
              props.dispatchAppState({
                type: "OPEN_MODAL",
                payload: "feedback_form",
              })
            }
          >
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            {props.isMobile ? null : <ListItemText primary="フィードバック" />}
          </ListItem>
          <ListItem button onClick={() => props.handleOnSingOut()}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            {props.isMobile ? null : <ListItemText primary="サインアウト" />}
          </ListItem>
        </List>
      </>
    );
  } else {
    if (props.isMobile) {
      drawerSetting = (
        <List>
          <ListItem button onClick={() => props.handleSwitchIsSetting()}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
          </ListItem>
        </List>
      );
    } else {
      drawerSetting = (
        <>
          <TextField
            id="setting-password-input"
            label="パスワード"
            type="password"
            autoComplete="current-password"
            value={props.pass}
            onChange={(e) => props.setPass(e.target.value)}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                props.handleSubmitPassword(props.pass);
              }
            }}
          />
          <Button onClick={() => props.handleSubmitPassword(props.pass)} startIcon={<Settings/>}>
            <Typography variant="body1">編集モードに切り替え</Typography>
          </Button>
        </>
      );
    }
  }

  let DrawerHeader
  // Open 開いてパスワード入力画面
  if (!props.appState.isSetting) {
    DrawerHeader = () => (
      <IconButton onClick={props.handleDrawerClose}>
        {props.theme.direction === "ltr" ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </IconButton>
    );
  } 
  // Open isSetting 開いて編集モード
  else if (props.appState.isSetting) {
    DrawerHeader = () => (
      <Button variant="text" onClick={props.handleDrawerClose}>
        {props.isMobile ? null : (
          <Typography variant="body1">観覧モードに切り替え</Typography>
        )}

        {/* <Button startIcon={<Settings/>}> */}

        {props.theme.direction === "ltr" ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </Button>
    );
  } 

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
        <div className={classes.drawerHeader}>
          <DrawerHeader />
        </div>
        <Divider />

        {props.appState.isPublicPage ? null : drawerSetting}

        <Divider />
      </MuiDrawer>
      <main
        // className={`${clsx(classes.content, {
        //   [classes.contentShift]: props.appState.isDrawerOpen,
        // })} ${props.appState.isDrawerOpen ? classes.contentShiftWidth : null}`}
        className={`${classes.content} ${props.appState.isDrawerOpen ? classes.contentShift : null}`}
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
