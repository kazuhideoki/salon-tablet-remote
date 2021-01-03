import React from 'react';
import { T_selected_theme } from '../../../../../../Store/Interface';
import { apiUserInfoChangeTheme } from '../../../../../../../pages/api/user_info/theme/change_theme';
import { generateDefaultParamsFromTheme } from '../../../../../../Store/theme/lib/paramsFromTheme';
import { UserInfoContext } from '../../../../../../Store/userInfo/Context';
import { setTheme } from '../../../../../../Store/userInfo/actions';

export const useChangeTheme = () => {
  const { dispatchUserInfo, userInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;

  return async (selectedTheme: T_selected_theme) => {
    const themeParams = generateDefaultParamsFromTheme(selectedTheme);

    const params = {
      user_id,
      themeParams: themeParams,
    };

    try {
      await apiUserInfoChangeTheme(params);
      dispatchUserInfo(setTheme(themeParams));
    } catch (err) {
      console.log(`useChangeTheme: ${err}`);

      alert('変更できませんでした');
    }
  };
};
