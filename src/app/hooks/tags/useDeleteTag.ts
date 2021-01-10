import React from 'react';
import { useGetTags } from './useGetTags';
import { ApiTagsCreate, apiTagsDelete } from '../../../pages/api/tags/delete';
import { UserInfoContext } from '../../stores/userInfo/Context';
import { AppStateContext } from '../../stores/appState/Context';
import { isLoadingTags } from '../../stores/appState/actions';

export const useDeleteTag = (): ((tag_id: number) => Promise<void>) => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;
  const getTags = useGetTags();

  return async (tag_id: number): Promise<void> => {
    const deleting = confirm('本当に削除してよろしいですか？');

    if (deleting === false) {
      return;
    }

    dispatchAppState(isLoadingTags(true));

    const params: ApiTagsCreate = { tag_id: tag_id, user_id: user_id };

    try {
      await apiTagsDelete(params);
      getTags();
    } catch (err) {
      console.log(`useDeleteTag ${err}`);
      alert('削除できませんでした');
      dispatchAppState(isLoadingTags(false));
    }
  };
};
