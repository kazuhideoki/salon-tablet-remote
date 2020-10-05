import React from "react";
import {
  CssBaseline,
  MuiThemeProvider,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { themeMinimal } from "./themes/themeMinimal";
import { TUserInfo, T_theme_font, T_theme_color, T_selected_theme, T_footer_icon_size } from "./Types";
import { Store } from "./Store";

import { nonTheme } from "./themes/nonTheme";
import { useIsMobile } from "../../lib/useIsMobile";
import { themeWhite } from "./themes/themeWhite";

const screenWidth = 100
const screenHeight = 100


const portalPadding = 0

const portalWidth = screenWidth - portalPadding * 2
const portalHeight = screenHeight - portalPadding * 2

// const pInfoBarMarginBottom = 1
const pInfoBarWidth = screenWidth - portalPadding * 2
// const pInfoBarHeight = 7

// const pFooterMarginTop = 1
const pFooterWidth = screenWidth - portalPadding * 2
// const pFooterHeight = 26
// const pFooterHeight = 26

const pMainMargin = 1
const pMainWidth = screenWidth - pMainMargin * 2
// const pMainHeight = screenHeight - pInfoBarHeight - pInfoBarMarginBottom - pFooterHeight - pFooterMarginTop - portalPadding * 2


// ThemeContext.Providerを通して渡される値
export const useThemeArgs = (footer_icon_size: T_footer_icon_size) => {

  const isTabletPortrait = useMediaQuery("(max-width:800px)");

  const theme = useTheme()
  
  const args = {
    app: {
      padding: portalPadding,
      width: portalWidth,
      height: portalHeight,
    },
    pInfoBar: {
      width: pInfoBarWidth,
      height: "50px",
    },
    pMain: {
      width: pMainWidth,
      height: function(margin){ 
        return `100vh - ${args.pFooter.height} - ${args.pagination.height} - ${
          args.pInfoBar.height
        } - ${margin * 2}px`;},
    },

    pagination: {
      width: pFooterWidth,
      // ※アイコンのサイズなどを変えると変わる可能性ある、ぴったりなので
      height: isTabletPortrait? '140px' : "74px",
    },
    pFooter: {
      width: pFooterWidth,
      height: footer_icon_size === 'medium' ? "145px" : '120px',
    },
    margin: theme.spacing(1),

    drawerWidth: 210,

    // fontSize
    // icon: 85,
    icon: footer_icon_size === 'medium' ? 85 : 60,
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
    const { selected_theme, theme_color, theme_font1, theme_font2, footer_icon_size } = appState.userInfo;
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
      case "white":
        theme = themeWhite(params)
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
        <ThemeContext.Provider value={useThemeArgs(footer_icon_size)}>
          {props.children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    );
};

export default ThemeProvider;



