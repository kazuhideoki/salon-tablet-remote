import React from 'react';
import { T_footer_icon_size } from '../../../../../../Store/Interface';
import {
  apiUserInfoChangeFooterIconSize,
  T_user_info_change_footer_icon_size,
} from '../../../../../../../pages/api/user_info/change_footer_icon_size';
import { UserInfoContext } from '../../../../../../Store/userInfo/Context';
import { setFooterIconSize } from '../../../../../../Store/userInfo/actions';

export const useChangeFooterIconSize = () => {
  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;

  return async (footerIconSize: T_footer_icon_size) => {
    const params: T_user_info_change_footer_icon_size = {
      user_id,
      footer_icon_size: footerIconSize,
    };

    try {
      await apiUserInfoChangeFooterIconSize(params);
      dispatchUserInfo(setFooterIconSize(footerIconSize));
    } catch (err) {
      alert('変更できませんでした');
      throw `useChangeFooterIconSize: ${err}`;
    }
  };
};
