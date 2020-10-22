import React from 'react'
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { themeMinimal } from "../../app/Store/themes/themeMinimal";
import { useThemeArgs, ThemeContext, switchingTheme } from "../../app/Store/ThemeContext";
import { minimal } from './themeMinimal';
import { SelectTheme } from '../../app/View/Drawer/ManageTheme/SelectTheme';
import { useManageTheme } from '../../app/View/Drawer/ManageTheme/ManageTheme';
import { generateDefaultParamsFromTheme } from '../../app/Store/themes/paramsFromTheme';
import { T_selected_theme } from '../../app/Store/Types';

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

export const Provider: React.FC = (props) => {

  const [selected_theme, setSelected_theme] = React.useState('nonTheme' as T_selected_theme)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected_theme((event.target as HTMLInputElement).value as T_selected_theme);
  };

  const theme = switchingTheme(generateDefaultParamsFromTheme(selected_theme))


  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeContext.Provider value={useThemeArgs('medium')}>
        <SelectTheme {...selectThemeProps}  selected_theme={selected_theme} handleChange={handleChange}/>
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
