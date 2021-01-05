import React from 'react';
import { apiInfoBarGet } from '../../../pages/api/info_bar/get';
import { InfoBarContext } from '../../store/infoBar/Context';
import { set } from '../../store/infoBar/actions';
import { UserInfoContext } from '../../store/userInfo/Context';
import { AppStateContext } from '../../store/appState/Context';
import { isLoadingFooter } from '../../store/appState/actions';

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
