import React from "react";
import clsx from "clsx";
import { Grid, CircularProgress, makeStyles, createStyles, Theme } from "@material-ui/core";
import { PModal } from "./PModal/PModal";
import { PMain } from "./PMain";
import { PFooter } from "./PFooter/PFooter";
import { SettingSwitch } from "./Setting/SettingSwitch";
import { Store } from "../Store/Store";
import { ThemeType, ThemeContext } from "../Store/ThemeContext";
import { useStylesFactory } from "../Store/useStylesFactory";
import { useGetArticles } from "../ActionCreator/articles/useGetArticles";
import { StoreContextProviderProps } from "../Store/Store";
import { ThemeProvider } from "../Store/ThemeContext";
import { StoreContextProvider } from "../Store/Store";
import { EditorContextProvider } from "../Store/EditorContext";
import { PDrawer } from "./PDrawer";
import { PersistentDrawerLeft } from "./PersistentDrawerLeft";

// 3段のコンテナの整形に関してのみ記述, 
// 枠の設定、header,footerの最大値の設定

const useStyles = makeStyles((theme: Theme) => {
    const themes = React.useContext(ThemeContext);
    return createStyles({
      root: {
        overflow: "hidden",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        padding: `${themes.app.padding}vh ${themes.app.padding}vw`,
      },
      gridRoot: {
        height: "100%",
        position: "relative",
      },
      main: {
        marginTop: `${themes.pHeader.marginBottom}vh`,
        width: themes.pMain.width + "vw",
        height: themes.pMain.height + "vh",
        position: "relative",
      },
      mainOpened: {
        width: `calc(${themes.pMain.width}vw - ${themes.drawerWidth}px)`,
      },
      footer: {
        marginTop: themes.pFooter.marginTop + "vh",
        width: themes.pFooter.width + "vw",
        height: themes.pFooter.height + "vh",
      },
      footerOpened: {
        width: `calc(${themes.pFooter.width}vw - ${themes.drawerWidth}px)`,
      },
      circularProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
      //  drawerの開閉のアニメーション
      content: {
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      //  drawerの開閉のアニメーション
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    });
});

const AppView = ()=> {
  // useStylesFactoryでthemeContextから受け取った値をもとに、styleに定義したコンポーネントごとのスタイルを反映させたclassNameを出力
    const classes = useStyles();

    const { appState, dispatchAppState, loading, dispatchLoading } = React.useContext(Store);
    const isLoading = loading.mainArticles;
    const getArticles = useGetArticles();

    // 初回ロード時に二回ロードしてしまうので、応急処置的に初回読み込みをしないようにした。
    const [isFirstLoad, setIsFirstLoad] = React.useState(true);
    // 設定モード[isSetting]を切り替えるたびに記事を読み込み直す
    React.useEffect(() => {
      if (!isFirstLoad) {  
        // 二回目以降で発火 
        dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
        getArticles(1);
      }
      setIsFirstLoad(false);
    },[appState.isSetting])
    // PDrawer用
    const [open, setOpen] = React.useState(false);

    return (
      <div className={classes.root}>
        <PersistentDrawerLeft open={open} setOpen={setOpen}>
          <Grid
            spacing={0}
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.gridRoot}
          >
            <Grid
              item
              className={`${clsx(classes.content, {
                //   [classes.contentShift]: props.open,
                // })} ${props.open ? classes.drawerOpened : null}
                [classes.contentShift]: open,
              })} ${classes.main} ${open ? classes.mainOpened : null}`}
            >
              {/* <Grid item className={`${classes.main}`}> */}
              {loading.mainArticles ? (
                <CircularProgress
                  className={classes.circularProgress}
                  size={100}
                  thickness={10}
                />
              ) : (
                <PMain />
              )}
            </Grid>
            <Grid
              item
              className={`${clsx(classes.content, {
                //   [classes.contentShift]: props.open,
                // })} ${props.open ? classes.drawerOpened : null}
                [classes.contentShift]: open,
              })} ${classes.footer} ${open ? classes.footerOpened : null}`}
            >
              {/* <Grid item className={`${classes.footer}`}> */}
              <PFooter />
              {/* <SettingSwitch /> */}
            </Grid>
            <PModal />
          </Grid>
        </PersistentDrawerLeft>
      </div>
    );

}

export const App = (props:StoreContextProviderProps) => {

  return (
    // Storeの情報をContextから読み込んで出力
    <StoreContextProvider data={props.data}>
      <ThemeProvider>
        <EditorContextProvider>
          {/* <PersistentDrawerLeft> */}
            <AppView />
          {/* </PersistentDrawerLeft> */}
        </EditorContextProvider>
      </ThemeProvider>
    </StoreContextProvider>
  );
}

export default App