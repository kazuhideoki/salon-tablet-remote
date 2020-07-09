import React from "react";
import { createMuiTheme, CssBaseline } from "@material-ui/core";

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
const themes = {
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
    iconSmall : 38,

    
} as const

export type ThemeType = typeof themes;

export const ThemeContext = React.createContext(themes as ThemeType);

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          // WebkitFontSmoothing: 'auto',
          fontFamily: ['"ヒラギノ角ゴ ProN"', "futura-pt",].join(','),
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }: any) => {

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeContext.Provider value={themes}>
        {children}
        </ThemeContext.Provider>
      </ThemeProvider>
    )
};

export default ThemeProvider;

