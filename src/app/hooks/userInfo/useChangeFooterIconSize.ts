import React from 'react';
import { FooterIconSize } from '../../../util/interface/Interface';
import {
  apiUserInfoChangeFooterIconSize,
  ApiUserInfoChangeFooterIconSize,
} from '../../../pages/api/user_info/change_footer_icon_size';
import { UserInfoContext } from '../../stores/userInfo/Context';
import { setFooterIconSize } from '../../stores/userInfo/actions';

export const useChangeFooterIconSize = (): ((
  footerIconSize: FooterIconSize
) => Promise<void>) => {
  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;

  return async (footerIconSize: FooterIconSize) => {
    const params: ApiUserInfoChangeFooterIconSize = {
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
