import React from "react";
import {
  CssBaseline,
  MuiThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { themeMinimal } from "./themes/themeMinimal";
import { TUserInfo } from "./Types";
import { Store } from "./Store";

import { nonTheme } from "./themes/nonTheme";
import { commonTheme } from "./themes/commonTheme";
import { useIsMobile } from "../../lib/useIsMobile";

const screenWidth = 100
const screenHeight = 100


const portalPadding = 0

const portalWidth = screenWidth - portalPadding * 2
const portalHeight = screenHeight - portalPadding * 2

const pInfoBarMarginBottom = 1
const pInfoBarWidth = screenWidth - portalPadding * 2
const pInfoBarHeight = 7

const pFooterMarginTop = 1
const pFooterWidth = screenWidth - portalPadding * 2
const pFooterHeight = 26

const pMainMargin = 1
const pMainWidth = screenWidth - pMainMargin * 2
const pMainHeight = screenHeight - pInfoBarHeight - pInfoBarMarginBottom - pFooterHeight - pFooterMarginTop - portalPadding * 2


// ThemeContext.Providerを通して渡される値
export const themeArgs = (isMobile) => {
  
  return {
    app: {
      padding: portalPadding,
      width: portalWidth,
      height: portalHeight,
    },
    pInfoBar: {
      marginBottom: pInfoBarMarginBottom,
      width: pInfoBarWidth,
      height: pInfoBarHeight,
    },
    pMain: {
      width: pMainWidth,
      height: pMainHeight,
    },
    pFooter: {
      marginTop: pFooterMarginTop,
      width: pFooterWidth,
      height: pFooterHeight,
    },

    // drawerWidth: isMobile ? 60: 210,
    // drawerWidth: isMobile ? '60vw': 210,
    drawerWidth: 210,

    // fontSize
    icon: 85,
    iconSmall: 38,
  }
}

export type TThemeArgs = ReturnType<typeof themeArgs>

export const ThemeContext = React.createContext({} as TThemeArgs);


export const ThemeProvider:React.FC<TUserInfo> = (props) => {

    const { appState } = React.useContext(Store);
    const { selected_theme } = appState.userInfo;
    // const isMobile = useMediaQuery("(max-width:480px)");
    const isMobile = useIsMobile()

    let theme // テーマ付ける
    // user_infoのselected_themeをもとにテーマを適応
    switch (selected_theme) {
      case "nonTheme":
        theme = nonTheme
        break;
      case "minimal":
        theme = themeMinimal;
        break;

      default:
        break;
    }     

    return (
      // これでmaterial uiのthemeオブジェクトを下へ送る
      <MuiThemeProvider theme={theme}>
        {/* MuiCssBaseline、@globalが適応 */}
        <CssBaseline />
        {/* 独自設定した変数を下へ送る */}
        <ThemeContext.Provider value={themeArgs(isMobile)}>
          {props.children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    );
};

export default ThemeProvider;

