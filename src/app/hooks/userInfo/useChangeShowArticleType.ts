import React from 'react';
import { ShowArticleType } from '../../../util/interface/Interface';
import {
  apiUserInfoChangeShowArticleType,
  ApiUserInfoChangeShowArticleType,
} from '../../../pages/api/user_info/change_show_article_type';
import { UserInfoContext } from '../../stores/userInfo/Context';
import { setShowArticleType } from '../../stores/userInfo/actions';

export const useChangeShowArticleType = (): ((
  showArticleType: ShowArticleType
) => Promise<void>) => {
  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;

  return async (showArticleType: ShowArticleType) => {
    const params: ApiUserInfoChangeShowArticleType = {
      user_id,
      showArticleType,
    };
    try {
      await apiUserInfoChangeShowArticleType(params);
      dispatchUserInfo(setShowArticleType(showArticleType));
    } catch (err) {
      alert('変更できませんでした');
    }
  };
};
