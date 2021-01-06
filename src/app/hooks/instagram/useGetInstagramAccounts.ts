import React from 'react';
import { apiInstagramAccountsGet } from '../../../pages/api/instagram_accounts/get';
import { InstagramContext } from '../../store/instagram/Context';
import { setAccounts } from '../../store/instagram/actions';
import { UserInfoContext } from '../../store/userInfo/Context';
import { AppStateContext } from '../../store/appState/Context';
import { isLoadingInstagramAccounts } from '../../store/appState/actions';

export const useGetInstagramAccounts = (): (() => Promise<void>) => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchInstagram } = React.useContext(InstagramContext);

  return async () => {
    dispatchAppState(isLoadingInstagramAccounts(true));

    try {
      const data = await apiInstagramAccountsGet(userInfo.user_id);
      dispatchAppState(isLoadingInstagramAccounts(false));
      dispatchInstagram(setAccounts(data.rawData));
    } catch (err) {
      alert('取得できませんでした');
      dispatchAppState(isLoadingInstagramAccounts(false));
    }
  };
};
