import React from 'react';
import { SelectedTheme } from '../../../../util/interface/Interface';
import { apiUserInfoChangeTheme } from '../../../../pages/api/user_info/theme/change_theme';
import { generateDefaultParamsFromTheme } from '../../../stores/theme/lib/paramsFromTheme';
import { UserInfoContext } from '../../../stores/userInfo/Context';
import { setTheme } from '../../../stores/userInfo/actions';

export const useChangeTheme = (): ((
  selectedTheme: SelectedTheme
) => Promise<void>) => {
  const { dispatchUserInfo, userInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;

  return async (selectedTheme: SelectedTheme) => {
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
