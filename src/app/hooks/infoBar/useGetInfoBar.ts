import React from 'react';
import { apiInfoBarGet } from '../../../pages/api/info_bar/get';
import { InfoBarContext } from '../../stores/infoBar/Context';
import { set } from '../../stores/infoBar/actions';
import { UserInfoContext } from '../../stores/userInfo/Context';
import { AppStateContext } from '../../stores/appState/Context';
import { isLoadingFooter } from '../../stores/appState/actions';

export const useGetInfoBar = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchInfoBar } = React.useContext(InfoBarContext);

  return async () => {
    try {
      const data = await apiInfoBarGet(userInfo.user_id);
      dispatchInfoBar(set(data.rawData));
    } catch (err) {
      console.log(`useGetInfoBar: ${err}`);
      alert('取得できませんでした');
      dispatchAppState(isLoadingFooter(false));
    }
  };
};
