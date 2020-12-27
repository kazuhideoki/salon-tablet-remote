import React from 'react'
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { useThemeArgs, ThemeContext } from "../../app/Store/ThemeContext";
import { SelectTheme } from '../../app/View/tablet/Drawer/ManageTheme/components/SelectTheme';
import { useManageTheme } from '../../app/View/tablet/Drawer/ManageTheme/view/ManageTheme';
import { generateDefaultParamsFromTheme, switchingTheme } from '../../app/Store/themes/paramsFromTheme';
import { T_selected_theme } from '../../app/Store/Types';
import Head from 'next/head';
import { googleFontsUrl } from '../../lib/googleFontsUrl';

const selectThemeProps = {
    selected_theme: null,
    expanded: null,
    // setExpanded: null
    handleAccordion: null,
    theme_color: null,
    handleChangeThemeColor: null,
    font1: null,
    font2: null,
    fontHeading: null,
    footerIconSize: null,
    handleChangeThemeFont1: null,
    handleChangeThemeFont2: null,
    handleChangeThemeFontHeading: null,
    handleChangeFooterIconSize: null,
    show_article_type: null,
    handleChange: null,
    handleChangeShowArticleType: null,
  };

const border = {backgroundColor: 'white', borderTop: '5px dotted darkgrey', borderBottom: '5px dotted darkgrey', height: 10, marginTop: 40, marginBottom: 40}

type TStorybookStore = {
  selected_theme: T_selected_theme
}

export const StorybookStore = React.createContext({} as TStorybookStore);


export const ThemeProvider: React.FC = (props) => {

  const [selected_theme, setSelected_theme] = React.useState('white' as T_selected_theme)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected_theme((event.target as HTMLInputElement).value as T_selected_theme);
  };

  const theme = switchingTheme(generateDefaultParamsFromTheme(selected_theme))

  const values = {
    selected_theme
  }


  return (
    <>
    <link href={googleFontsUrl} rel="stylesheet"></link>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <StorybookStore.Provider value={values}>
        <ThemeContext.Provider value={useThemeArgs('medium')}>
          <SelectTheme {...selectThemeProps}  selected_theme={selected_theme} handleChange={handleChange} user={true}/>
          <div style={border} ></div>
          {props.children}
        </ThemeContext.Provider>

      </StorybookStore.Provider>
    </MuiThemeProvider>
    </>
  );
};
