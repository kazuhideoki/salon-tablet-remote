import React from "react";
import {
  CssBaseline,
  MuiThemeProvider,
  useTheme,
} from "@material-ui/core";
import { themeMinimal } from "./themes/themeMinimal";
import { TUserInfo, T_theme_font, T_theme_color, T_selected_theme } from "./Types";
import { Store } from "./Store";

import { nonTheme } from "./themes/nonTheme";
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
// const pFooterHeight = 26
const pFooterHeight = 26

const pMainMargin = 1
const pMainWidth = screenWidth - pMainMargin * 2
const pMainHeight = screenHeight - pInfoBarHeight - pInfoBarMarginBottom - pFooterHeight - pFooterMarginTop - portalPadding * 2


// ThemeContext.Providerを通して渡される値
export const useThemeArgs = (isMobile) => {

  const theme = useTheme()
  
  const args = {
    app: {
      padding: portalPadding,
      width: portalWidth,
      height: portalHeight,
    },
    // pInfoBar: {
    //   marginBottom: pInfoBarMarginBottom,
    //   width: pInfoBarWidth,
    //   height: pInfoBarHeight,
    // },
    pInfoBar: {
      // marginBottom: pInfoBarMarginBottom,
      width: pInfoBarWidth,
      height: "50px",
    },
    pMain: {
      width: pMainWidth,
      // height: pMainHeight,
      // height: (margin) =>
      //   `calc(100% - ${parent.pFooter.height} - ${
      //     themes.pInfoBar.height
      //   } - ${theme.spacing(1) * 2}px)`,
      height: function(margin){ 
        return `100vh - ${args.pFooter.height} - ${
          args.pInfoBar.height
        } - ${margin * 2}px`},
    },
    // pFooter: {
    //   marginTop: pFooterMarginTop,
    //   width: pFooterWidth,
    //   height: pFooterHeight,
    // },
    pFooter: {
      // marginTop: pFooterMarginTop,
      width: pFooterWidth,
      height: "280px",
    },
    margin: theme.spacing(1),

    // drawerWidth: isMobile ? 60: 210,
    // drawerWidth: isMobile ? '60vw': 210,
    drawerWidth: 210,

    // fontSize
    // icon: 85,
    icon: 85,
    iconSmall: 38,
  };

  return args
}

export type TThemeArgs = ReturnType<typeof useThemeArgs>

export const ThemeContext = React.createContext({} as TThemeArgs);

export type TThemeParams = {
  selected_theme: T_selected_theme
  theme_color: T_theme_color;
  theme_font1: T_theme_font;
  theme_font2: T_theme_font;
};

export const ThemeProvider:React.FC<TUserInfo> = (props) => {

    const { appState } = React.useContext(Store);
    const { selected_theme, theme_color, theme_font1, theme_font2 } = appState.userInfo;
    const params: TThemeParams = {
      selected_theme,
      theme_color,
      theme_font1,
      theme_font2,
    };
    const isMobile = useIsMobile()

    let theme // テーマ付ける
    // user_infoのselected_themeをもとにテーマを適応
    switch (selected_theme) {
      case "nonTheme":
        theme = nonTheme(params)
        break;
      case "minimal":
        theme = themeMinimal(params)
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
        <ThemeContext.Provider value={useThemeArgs(isMobile)}>
          {props.children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    );
};

export default ThemeProvider;

