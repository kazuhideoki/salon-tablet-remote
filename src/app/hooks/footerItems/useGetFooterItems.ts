import React from 'react';
import { apiFooterItemsGet } from '../../../pages/api/footer_items/get';
import { FooterItemsContext } from '../../stores/footerItems/Context';
import { set } from '../../stores/footerItems/actions';
import { UserInfoContext } from '../../stores/userInfo/Context';
import { AppStateContext } from '../../stores/appState/Context';
import { isLoadingFooter } from '../../stores/appState/actions';

export const useGetFooterItems = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchFooterItems } = React.useContext(FooterItemsContext);

  return async () => {
    dispatchAppState(isLoadingFooter(true));

    try {
      const data = await apiFooterItemsGet(userInfo.user_id);
      dispatchAppState(isLoadingFooter(false));
      dispatchFooterItems(set(data.rawData));
    } catch (err) {
      console.log(`useGetFooterItems ${err}`);

      alert('取得できませんでした');
      dispatchAppState(isLoadingFooter(false));
    }
  };
};
