import React from 'react';
import { instagramRedirectHost } from '../../../../../../util/loadUrl';
import { AppStateContext } from '../../../../../store/appState/Context';
import { InstagramContext } from '../../../../../store/instagram/Context';
export const useStateManageInstagramAccount = () => {
  const { appState } = React.useContext(AppStateContext);
  const { instagramAccounts } = React.useContext(InstagramContext);
  const { loading } = appState;

  const instaAuth = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${instagramRedirectHost}/api/instagram_accounts/get_token&scope=user_profile,user_media&response_type=code`;

  return {
    instagramAccounts,
    loading,
    instaAuth,
  };
};
