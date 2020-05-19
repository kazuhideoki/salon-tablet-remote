import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { PModal } from "./PModal/PModal";
import { PMain } from "./PMain";
import { PFooter } from "./PFooter/PFooter";
import { SettingSwitch } from "./Setting/SettingSwitch";
import { Store } from "../Store/Store";
import { ThemeType } from "../Store/ThemeContext";
import { useStylesFactory } from "../Store/useStylesFactory";
import { useGetArticles } from "../ActionCreator/articles/useGetArticles";
import { StoreContextProviderProps } from "../Store/Store";
import { ThemeProvider } from "../Store/ThemeContext";
import { StoreContextProvider } from "../Store/Store";
import { EditorContextProvider } from "../Store/EditorContext";



// 3段のコンテナの整形に関してのみ記述, 
// 枠の設定、header,footerの最大値の設定
const styles = {
  // vh,vwでデバイスの向きに対応することができる。
  root: {
      overflow: "hidden",
      position: "fixed",
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh",
      padding: (themes: ThemeType) => `${themes.app.padding}vh ${themes.app.padding}vw`,
  },
  gridRoot: {
      height: '100%',
      position: "relative",
  },
  header: {
      marginBottom: (themes: ThemeType) => themes.pHeader.marginBottom + 'vh',
      width: (themes: ThemeType) => themes.pHeader.width + 'vw',
      height: (themes: ThemeType) => themes.pHeader.height + 'vh',
  },
  main: {
      width: (themes: ThemeType) => themes.pMain.width + 'vw',
      height: (themes: ThemeType) => themes.pMain.height + 'vh',
      position: 'relative',
  },
  footer: {
      marginTop: (themes: ThemeType) => themes.pFooter.marginTop + 'vh',
      width: (themes: ThemeType) => themes.pFooter.width + 'vw',
      height: (themes: ThemeType) => themes.pFooter.height + 'vh',
  },
  circularProgress: {
    position: "absolute",
    // top: 0,
    // buttom: 0,
    // left: 0,
    // right: 0,
    // margin: 'auto',
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  },
}

const AppView = ()=> {
  // useStylesFactoryでthemeContextから受け取った値をもとに、styleに定義したコンポーネントごとのスタイルを反映させたclassNameを出力
    const classes = useStylesFactory(styles)

    const { appState, dispatchAppState, loading, dispatchLoading } = React.useContext(Store);
    const isLoading = loading.mainArticles;
    const getArticles = useGetArticles();

    const props = {
      classes,
    };
    type Props = typeof props

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

    const AppPresenter = ({ classes }: Props) => {
      return (
        <div className={classes.root}>
          <Grid
            spacing={0}
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.gridRoot}
          >
            <Grid item className={classes.main}>
              {loading.mainArticles ? 
                <CircularProgress className={classes.circularProgress} size={100} thickness={10}/>
              : <PMain /> }
            </Grid>
            <Grid item className={classes.footer}>
              <PFooter />
              <SettingSwitch />
            </Grid>
            {/* {loading.modalEditor ?
              <CircularProgress className={classes.circularProgress} size={100} thickness={10}/>
              : <PModal />} */}
            <PModal />
          </Grid>
        </div>
      );
    };



    return AppPresenter(props)
}

export const App = (props:StoreContextProviderProps) => {

  return (
    // Storeの情報をContextから読み込んで出力
    <StoreContextProvider data={props.data}>
      <ThemeProvider>
        <EditorContextProvider>
          <AppView />
        </EditorContextProvider>
      </ThemeProvider>
    </StoreContextProvider>
  );
}

export default App