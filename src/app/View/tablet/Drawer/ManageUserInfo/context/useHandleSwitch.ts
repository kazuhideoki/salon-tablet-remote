import React from 'react'
import { apiUserInfoSwitchGeneratePublicPage } from "../../../../../../pages/api/user_info/switch_generate_public_page";
import { setIsGeneratePublicPage } from '../../../../../Store/userInfo/actions';
import { UserInfoContext } from '../../../../../Store/userInfo/Context';

export const useHandleSwitch = () => {

  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);

  return async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    

    const result = await apiUserInfoSwitchGeneratePublicPage({
      is_generate_public_page: checked,
      user_id: userInfo.user_id,
    });
    dispatchUserInfo(setIsGeneratePublicPage(checked));
  }
};
