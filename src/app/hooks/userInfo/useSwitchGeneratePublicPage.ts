import React from 'react';
import { apiUserInfoSwitchGeneratePublicPage } from '../../../pages/api/user_info/switch_generate_public_page';
import { setIsGeneratePublicPage } from '../../stores/userInfo/actions';
import { UserInfoContext } from '../../stores/userInfo/Context';

export const useSwitchGeneratePublicPage = (): ((
  is_generate_public_page: boolean
) => Promise<void>) => {
  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);

  return async (is_generate_public_page: boolean) => {
    try {
      await apiUserInfoSwitchGeneratePublicPage({
        is_generate_public_page,
        user_id: userInfo.user_id,
      });
      dispatchUserInfo(setIsGeneratePublicPage(is_generate_public_page));
    } catch (err) {
      throw `useSwitchGeneratePublicPage: ${err}`;
    }
  };
};
