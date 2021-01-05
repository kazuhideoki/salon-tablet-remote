import React from 'react';
import { T_tag_id } from '../../store/Interface';
import { useGetTags } from './useGetTags';
import { T_tags_delete, apiTagsDelete } from '../../../pages/api/tags/delete';
import { UserInfoContext } from '../../store/userInfo/Context';
import { AppStateContext } from '../../store/appState/Context';
import { isLoadingTags } from '../../store/appState/actions';

export const useDeleteTag = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;
  const getTags = useGetTags();

  return async (tag_id: T_tag_id): Promise<void> => {
    const deleting = confirm('本当に削除してよろしいですか？');

    if (deleting === false) {
      return;
    }

    dispatchAppState(isLoadingTags(true));

    const params: T_tags_delete = { tag_id: tag_id, user_id: user_id };

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
