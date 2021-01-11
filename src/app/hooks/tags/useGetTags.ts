import React from 'react';
import { apiTagsGet } from '../../../pages/api/tags/get';
import { TagsContext } from '../../stores/tags/Context';
import { set } from '../../stores/tags/actions';
import { UserInfoContext } from '../../stores/userInfo/Context';
import { AppStateContext } from '../../stores/appState/Context';
import { isLoadingTags } from '../../stores/appState/actions';

export const useGetTags = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchTags } = React.useContext(TagsContext);

  return async () => {
    dispatchAppState(isLoadingTags(true));

    try {
      const data = await apiTagsGet(userInfo.user_id);
      dispatchAppState(isLoadingTags(false));
      dispatchTags(set(data.rawData));
    } catch (err) {
      console.log(`useGetTags: ${err}`);

      alert('取得できませんでした');
      dispatchAppState(isLoadingTags(false));
    }
  };
};
