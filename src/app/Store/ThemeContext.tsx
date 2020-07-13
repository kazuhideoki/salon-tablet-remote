import React from "react";
import {
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { themeMinimal } from "./themes/themeMinimal";
import { TUserInfo, Store } from "./Store";
import { nonTheme } from "./themes/nonTheme";

const screenWidth = 100
const screenHeight = 100


const portalPadding = 0

const portalWidth = screenWidth - portalPadding * 2
const portalHeight = screenHeight - portalPadding * 2

const pHeaderMarginBottom = 1
const pHeaderWidth = screenWidth - portalPadding * 2
const pHeaderHeight = 7

const pFooterMarginTop = 1
const pFooterWidth = screenWidth - portalPadding * 2
const pFooterHeight = 23

const pMainMargin = 1
const pMainWidth = screenWidth - pMainMargin * 2
const pMainHeight = screenHeight - pHeaderHeight - pHeaderMarginBottom - pFooterHeight - pFooterMarginTop - portalPadding * 2


// ThemeContext.Providerを通して渡される値
const themeArgs = {
  app: {
    padding: portalPadding,
    width: portalWidth,
    height: portalHeight,
  },
  pHeader: {
    marginBottom: pHeaderMarginBottom,
    width: pHeaderWidth,
    height: pHeaderHeight,
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

  drawerWidth: 210,

  // fontSize
  icon: 85,
  iconSmall: 38,
}

export type TThemeArgs = typeof themeArgs;

export const ThemeContext = React.createContext({} as TThemeArgs);


export const ThemeProvider:React.FC<TUserInfo> = (props) => {

    const { userInfo } = React.useContext(Store)
    const { selected_theme } = userInfo

    let theme // 型付ける
    // user_infoのselected_themeをもとにテーマを適応
    switch (selected_theme) {
      case "nonTheme":
        theme = nonTheme;
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
        <ThemeContext.Provider value={themeArgs}>
          {props.children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    );
};

export default ThemeProvider;

