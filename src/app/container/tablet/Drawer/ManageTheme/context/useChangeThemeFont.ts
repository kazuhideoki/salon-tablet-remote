import React from 'react';
import {
  apiUserInfoThemeFont,
  T_user_info_theme_font,
  TWhichFont,
} from '../../../../../../pages/api/user_info/theme/font';
import { TFont1, TFont2 } from '../../../../../Store/theme/lib/fonts';
import { UserInfoContext } from '../../../../../Store/userInfo/Context';
import {
  setThemeFont1,
  setThemeFont2,
  setThemeFontHeading,
} from '../../../../../Store/userInfo/actions';

export const useChangeThemeFont = () => {
  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;

  return async (font: TFont1[0] | TFont2[0], whichFont: TWhichFont) => {
    const params: T_user_info_theme_font = {
      user_id,
      theme_font: font,
      whichFont,
    };

    try {
      await apiUserInfoThemeFont(params);

      if (whichFont === 'theme_font2') {
        dispatchUserInfo(setThemeFont2(font));
      } else if (whichFont === 'theme_font1') {
        dispatchUserInfo(setThemeFont1(font));
      } else if (whichFont === 'theme_font_heading') {
        dispatchUserInfo(setThemeFontHeading(font));
      }
    } catch (err) {
      alert('変更できませんでした');
      throw `useChangeThemeFont: ${err}`;
    }
  };
};
