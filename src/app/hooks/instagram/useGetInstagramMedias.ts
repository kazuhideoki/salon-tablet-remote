import React from 'react';
import { apiInstagramMediasGet } from '../../../pages/api/instagram_medias/get';
import {
  apiInstagramAccountsReconnectNeeded,
  ApiInstagramAccountsReconnectNeeded,
} from '../../../pages/api/instagram_accounts/reconnect_needed';
import { InstagramContext } from '../../stores/instagram/Context';
import { setMedias, setReconnect } from '../../stores/instagram/actions';
import { UserInfoContext } from '../../stores/userInfo/Context';
import { AppStateContext } from '../../stores/appState/Context';
import {
  closeModal,
  isLoadingMain,
  isShowInstagram,
  setSelectedInstagramAccounts,
} from '../../stores/appState/actions';

type Props = {
  instagram_id: number;
  username: string;
  paging: {
    after: string;
    before: string;
  };
};

export const useGetInstagramMedias = (): ((params: Props) => Promise<void>) => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const user_id = userInfo.user_id;
  const { dispatchInstagram } = React.useContext(InstagramContext);

  // ページ送りでないときは空のオブジェクト
  return async (params: Props) => {
    dispatchAppState(isLoadingMain(true));
    dispatchAppState(closeModal());

    try {
      const data = await apiInstagramMediasGet({
        instagram_id: params.instagram_id,
        paging: params.paging,
      });
      dispatchInstagram(setMedias(data.rawData));
      dispatchAppState(
        setSelectedInstagramAccounts({
          id: params.instagram_id,
          username: params.username,
        })
      );
      dispatchAppState(isShowInstagram(true));
      dispatchAppState(isLoadingMain(false));
    } catch (err) {
      console.log(`useGetInstagramMedias: ${err}`);
      alert('取得できませんでした');

      if (err.data.error.message.type === 'OAuthException') {
        console.log('message.typeは OAuthException');
        alert('インスタグラムアカウントの再連携が必要です');
        const params2: ApiInstagramAccountsReconnectNeeded = {
          instagram_id: params.instagram_id,
          user_id: user_id,
          is_reconnect_needed: true,
        };
        try {
          await apiInstagramAccountsReconnectNeeded(params2);
          dispatchInstagram(setReconnect(params.instagram_id));
        } catch (err) {
          console.log(`useGetInstagramMedias catch: ${err}`);
        }
      }

      dispatchAppState(isLoadingMain(false));
    }
  };
};
