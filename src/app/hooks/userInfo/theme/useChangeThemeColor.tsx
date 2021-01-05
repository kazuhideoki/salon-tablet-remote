import React from 'react';
import {
  apiUserInfoThemeColor,
  ApiUserInfoThemeColor,
} from '../../../../pages/api/user_info/theme/color';
import { Color } from '../../../container/tablet/Drawer/ManageTheme/ManageTheme';
import { UserInfoContext } from '../../../store/userInfo/Context';
import { setThemeColor } from '../../../store/userInfo/actions';

export const useChangeThemeColor = () => {
  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;

  return async (color: Color) => {
    const params: ApiUserInfoThemeColor = {
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
