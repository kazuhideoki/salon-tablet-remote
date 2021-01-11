import React from 'react';

import { ApiTagsCreate, apiTagsCreate } from '../../../pages/api/tags/create';
import { useGetTags } from './useGetTags';
import { UserInfoContext } from '../../stores/userInfo/Context';
import { AppStateContext } from '../../stores/appState/Context';
import { isLoadingTags } from '../../stores/appState/actions';

export const useCreateTag = (): ((tagName: string) => Promise<void>) => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const getTags = useGetTags();

  return async (tagName: string) => {
    dispatchAppState(isLoadingTags(true));

    const params: ApiTagsCreate = {
      user_id: userInfo.user_id,
      tag_name: tagName,
    };

    try {
      await apiTagsCreate(params);

      getTags();
    } catch (err) {
      console.log(`useCreateTag: ${err}`);
      alert('タグを作成できませんでした');
      dispatchAppState(isLoadingTags(false));
    }
  };
};
