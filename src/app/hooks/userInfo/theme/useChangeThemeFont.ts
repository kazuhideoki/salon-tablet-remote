import React from 'react';
import {
  apiUserInfoThemeFont,
  ApiUserInfoThemeFont,
  WhichFont,
} from '../../../../pages/api/user_info/theme/font';
import { Font1, Font2 } from '../../../stores/theme/lib/fonts';
import { UserInfoContext } from '../../../stores/userInfo/Context';
import {
  setThemeFont1,
  setThemeFont2,
  setThemeFontHeading,
} from '../../../stores/userInfo/actions';

export const useChangeThemeFont = (): ((
  font: Font1[0] | Font2[0],
  whichFont: WhichFont
) => Promise<void>) => {
  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;

  return async (font: Font1[0] | Font2[0], whichFont: WhichFont) => {
    const params: ApiUserInfoThemeFont = {
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
