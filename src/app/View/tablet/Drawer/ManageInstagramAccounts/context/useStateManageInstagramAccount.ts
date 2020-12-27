import React from 'react'
import { instagramRedirectHost } from '../../../../../../lib/loadUrl';
import { Store } from '../../../../../Store/Store';
export const useStateManageInstagramAccount = () => {
  const { appState } = React.useContext(Store);
  const { instagramAccounts, loading } = appState;

  const instaAuth = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${instagramRedirectHost}/api/instagram_accounts/get_token&scope=user_profile,user_media&response_type=code`;

  return {
    instagramAccounts,
    loading,
    instaAuth,
  };
}