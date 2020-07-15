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
import MailIcon from "@material-ui/icons/Mail";
import { ThemeContext } from "../Store/ThemeContext";
import { Store } from "../Store/Store";
import { EditorContext } from "../Store/EditorContext";
import { NoteAddOutlined, VideoLabel, Settings, ExitToApp, Feedback, Wallpaper } from "@material-ui/icons";
import { TextField, Button } from "@material-ui/core";
//@ts-ignore
import { signin, signout, useSession, getSession } from "next-auth/client";
import { useCheckPassword } from "../ActionCreator/user/useCheckPassword";
import { cipher } from "../../module/bcrypt";
import { TagsButton } from "./PFooter/Pagination/TagsButton";


// export const useDrawerProps = ({open, setOpen}) => {
export const useDrawerProps = () => {
  const theme = useTheme();
  const { dispatchAppState, appState, dispatchLoading } = React.useContext(Store);
  const {
    setEditorText,
    setTitleText,
    setOnTap,
    setLinkUrl,
    setAppLinkUrl,
    setIsEdittingContent,
    dispatchSelectedIcon,
    setSelectedTags,
    setCreatedAt,
    setUpdatedAt,
  } = React.useContext(EditorContext);

  const handleOpenArticleEditor = () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "edit_article" });
    setIsEdittingContent(false);
    setTitleText("");
    setEditorText("");
    setSelectedTags([])
    setCreatedAt(null)
    setUpdatedAt(null)
  };

  const handleOpenFooterItemEditor = () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "edit_footer_item" });
    setIsEdittingContent(false);
    setTitleText("");
    setEditorText("");
    setOnTap("modal");
    setLinkUrl("");
    setAppLinkUrl("");
    dispatchSelectedIcon({ type: "SET_ICON", payload: null });
    setCreatedAt(null)
    setUpdatedAt(null)
  };

  const handleOpenTagsManage = () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "edit_tags" })
  }
  
  const checkPassword = useCheckPassword();
  const handleSubmitPassword = async (password: string) => {
    // console.log(cipher(password))
    
    const result = await checkPassword(password);
    if (result === true) {
      dispatchAppState({ type: "ON_IS_SETTING" });
      // dispatchAppState({ type: "CLOSE_MODAL" });
      dispatchLoading({type: "ON_IS_LOADING_MAIN_ARTICLES"})
    } else if (result === false) {
      alert("パスワードが間違っています。");
    }
  };
  const handleSwitchIsSetting = () => {
    dispatchAppState({ type: "ON_IS_SETTING" })
    dispatchLoading({type: "ON_IS_LOADING_MAIN_ARTICLES"})
  }

  const handleOpenFeedback = () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "feedback_form" });
  }

  const handleOnSingOut = () => {
    const signOuting = confirm('サインアウトしますか？')
    signOuting ? signout() : null
  }

  const handleDrawerOpen = () => {
    // setOpen(true);
    dispatchAppState({type: "OPEN_DRAWER"})
    dispatchAppState({ type: "CLOSE_MODAL" });
  };

  const handleDrawerClose = () => {
    // setOpen(false);
    dispatchAppState({ type: "CLOSE_DRAWER" });
    // Drawerが閉じきってからisSettingをfalseに
    setTimeout(() => {
      dispatchAppState({ type: "OFF_IS_SETTING" });
    }, 800);
  };

  const isMobile = useMediaQuery("(max-width:480px)");

  return {
    theme,
    appState,
    dispatchAppState,
    handleOpenArticleEditor,
    handleOpenFooterItemEditor,
    handleOpenTagsManage,
    handleSubmitPassword,
    handleSwitchIsSetting,
    handleOpenFeedback,
    handleOnSingOut,
    handleDrawerOpen,
    handleDrawerClose,
    isMobile,
  };
}

export type TUseDrawerProps = ReturnType<typeof useDrawerProps>

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

export const DrawerPresenter:React.FC<TUseDrawerProps> = (props) => {
  const classes = useStyles();



  const BeforeIsSettingDrawerMenu = () => {
    const [pass, setPass] = React.useState('')
    return (
      <>
        <TextField
          id="setting-password-input"
          label="パスワード"
          type="password"
          autoComplete="current-password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyPress={e => {
            if (e.key == 'Enter') {
              e.preventDefault()
              props.handleSubmitPassword(pass)
            }
          }}
        />
        <Button onClick={() => props.handleSubmitPassword(pass)}>
          <Typography variant="body1">
            編集モードに切り替える
          </Typography>
        </Button>
      </>
    );
  }

  const BeforeIsSettingDrawerMenuMobile = () => {
    return (
      <Button onClick={() => props.handleSwitchIsSetting()}>
        <Typography variant="body1">
          編集モードに切り替える
        </Typography>
      </Button>
    );
  }

  const IsSettingDrawerMenu: React.FC = () => {
    return (
      <>
      <List>
        <ListItem button onClick={() => props.handleOpenArticleEditor()}>
          <ListItemIcon>
            <NoteAddOutlined />
          </ListItemIcon>
          <ListItemText primary="記事作成" />
        </ListItem>
        <ListItem button onClick={() => props.handleOpenFooterItemEditor()}>
          <ListItemIcon>
            <VideoLabel />
          </ListItemIcon>
          <ListItemText primary="アイテム作成" />
        </ListItem>
          <ListItem button onClick={() => props.handleOpenTagsManage()}>
          <ListItemIcon>
            <TagsButton />
          </ListItemIcon>
          <ListItemText primary="タグ管理" secondary="製作中"/>
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
          <ListItemText primary="テーマ変更" secondary="製作中" />
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
          <ListItemText primary="アカウント" />
        </ListItem>
        <ListItem button onClick={() => props.handleOpenFeedback()}>
          <ListItemIcon>
            <Feedback />
          </ListItemIcon>
          <ListItemText primary="フィードバック" />
        </ListItem>
        <ListItem button onClick={() => props.handleOnSingOut()}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="サインアウト" />
        </ListItem>
      </List>
    </>
    );
  };

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
        <Typography variant="body1">観覧モードに切り替える</Typography>

        {props.theme.direction === "ltr" ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </Button>
    );
  } 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={props.handleDrawerOpen}
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
          <DrawerHeader/>
        </div>
        <Divider />

        {!props.appState.isSetting && !props.isMobile ? (
          <BeforeIsSettingDrawerMenu />
        ) : null}
        {!props.appState.isSetting && props.isMobile ? (
          <BeforeIsSettingDrawerMenuMobile />
        ) : null}
        {props.appState.isSetting ? <IsSettingDrawerMenu /> : null}

        <Divider />
      </MuiDrawer>
      <main
        className={`${clsx(classes.content, {
          [classes.contentShift]: props.appState.isDrawerOpen,
        })}`}
      >
        {props.children}
      </main>
    </div>
  );
}

export const Drawer: React.FC = (props) => {
  const useProps = useDrawerProps();

  return (
    <DrawerPresenter {...useProps}>
      {props.children}
    </DrawerPresenter>
  );
}
