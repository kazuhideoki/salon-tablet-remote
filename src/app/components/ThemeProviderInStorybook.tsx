import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { useThemeArgs, ThemeContext } from '../stores/theme/ThemeProvider';
import { SelectTheme } from '../container/tablet/Drawer/ManageTheme/components/SelectTheme';
import { ManageThemePresenterProps } from '../container/tablet/Drawer/ManageTheme/ManageTheme';
import {
  generateDefaultParamsFromTheme,
  switchingTheme,
} from '../stores/theme/lib/paramsFromTheme';
import { googleFontsUrl } from '../../util/googleFontsUrl';
import { SelectedTheme } from '../../util/interface/Interface';

const selectThemeProps: ManageThemePresenterProps = {
  selected_theme: 'default',
  expanded: true,
  handleAccordion: () => {
    return () => {
      return;
    };
  },
  theme_color: '#000000',
  handleChangeThemeColor: async () => {
    return;
  },
  font1: 'Roboto',
  font2: '"Kosugi Maru"',
  fontHeading: '"M PLUS Rounded 1c"',
  footerIconSize: 'medium',
  handleChangeThemeFont1: async () => {
    return;
  },
  handleChangeThemeFont2: async () => {
    return;
  },
  handleChangeThemeFontHeading: async () => {
    return;
  },
  handleChangeFooterIconSize: async () => {
    return;
  },
  show_article_type: 'scroll',
  handleChange: () => {
    return;
  },
  handleChangeShowArticleType: async () => {
    return;
  },
  user: null,
};

const border = {
  backgroundColor: 'white',
  borderTop: '5px dotted darkgrey',
  borderBottom: '5px dotted darkgrey',
  height: 10,
  marginTop: 40,
  marginBottom: 40,
};

export const StorybookStore = React.createContext(
  {} as { selected_theme: SelectedTheme }
);

export const ThemeProvider: React.FC = (props) => {
  const [selected_theme, setSelected_theme] = React.useState(
    'white' as SelectedTheme
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected_theme(
      (event.target as HTMLInputElement).value as SelectedTheme
    );
  };

  const theme = switchingTheme(generateDefaultParamsFromTheme(selected_theme));

  const values = {
    selected_theme,
  };

  return (
    <>
      <link href={googleFontsUrl} rel="stylesheet"></link>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <StorybookStore.Provider value={values}>
          <ThemeContext.Provider value={useThemeArgs('medium')}>
            {
              <SelectTheme
                {...selectThemeProps}
                selected_theme={selected_theme}
                handleChange={handleChange}
              />
            }
            <div style={border}></div>
            {props.children}
          </ThemeContext.Provider>
        </StorybookStore.Provider>
      </MuiThemeProvider>
    </>
  );
};
