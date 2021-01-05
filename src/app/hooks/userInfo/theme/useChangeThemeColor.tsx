import React from 'react';
import {
  apiUserInfoThemeColor,
  T_user_info_theme_color,
} from '../../../../pages/api/user_info/theme/color';
import { TColor } from '../../../container/tablet/Drawer/ManageTheme/ManageTheme';
import { UserInfoContext } from '../../../store/userInfo/Context';
import { setThemeColor } from '../../../store/userInfo/actions';

export const useChangeThemeColor = () => {
  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;

  return async (color: TColor) => {
    const params: T_user_info_theme_color = {
      user_id,
      theme_color: color.hex,
    };

    try {
      await apiUserInfoThemeColor(params);
      dispatchUserInfo(setThemeColor(color.hex));
    } catch (err) {
      alert('変更できませんでした');
      throw `useChangeThemeColor: ${err}`;
    }
  };
};
