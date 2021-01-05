import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import {
  useThemeArgs,
  ThemeContext,
} from '../../app/Store/theme/ThemeProvider';
import { SelectTheme } from '../../app/container/tablet/Drawer/ManageTheme/components/SelectTheme';
import { TUseManageThemeProps } from '../../app/container/tablet/Drawer/ManageTheme/view/ManageTheme';
import {
  generateDefaultParamsFromTheme,
  switchingTheme,
} from '../../app/Store/theme/lib/paramsFromTheme';
import { T_selected_theme } from '../../app/Store/Interface';
import { googleFontsUrl } from '../../util/googleFontsUrl';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const selectThemeProps: TUseManageThemeProps = {
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
};

const border = {
  backgroundColor: 'white',
  borderTop: '5px dotted darkgrey',
  borderBottom: '5px dotted darkgrey',
  height: 10,
  marginTop: 40,
  marginBottom: 40,
};

type TStorybookStore = {
  selected_theme: T_selected_theme;
};

export const StorybookStore = React.createContext({} as TStorybookStore);

export const ThemeProvider: React.FC = (props) => {
  const [selected_theme, setSelected_theme] = React.useState(
    'white' as T_selected_theme
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected_theme(
      (event.target as HTMLInputElement).value as T_selected_theme
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
              /* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore */
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
