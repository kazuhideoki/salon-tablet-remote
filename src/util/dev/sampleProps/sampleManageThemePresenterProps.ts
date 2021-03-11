import { ManageThemePresenterProps } from '../../../app/container/tablet/Drawer/ManageTheme/useManageTheme';

export const sampleManageThemePresenterProps: ManageThemePresenterProps = {
  selected_theme: 'default',
  expanded: false,
  handleAccordion: () => () => {
    return;
  },
  theme_color: '#123456',
  handleChangeThemeColor: async () => {
    return;
  },
  font1: '"M PLUS Rounded 1c"',
  font2: '未設定',
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
  handleChange: async () => {
    return;
  },
  handleChangeShowArticleType: async () => {
    return;
  },
  user: null,
};
