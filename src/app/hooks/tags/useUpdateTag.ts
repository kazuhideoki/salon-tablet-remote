import React from 'react';
import { useGetTags } from './useGetTags';
import { T_tags_update, apiTagsUpdata } from '../../../pages/api/tags/update';
import { AppStateContext } from '../../store/appState/Context';
import { isLoadingTags } from '../../store/appState/actions';

type TUpdateTag = { edittingTagId: number; tagName: string };

export const useUpdateTag = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const getTags = useGetTags();

  return async ({ edittingTagId, tagName }: TUpdateTag) => {
    dispatchAppState(isLoadingTags(true));

    const params: T_tags_update = {
      tag_id: edittingTagId,
      tag_name: tagName,
    };
    try {
      await apiTagsUpdata(params);
      getTags();
    } catch (err) {
      console.log(`useUpdateTag: ${err}`);

      alert('更新できませんでした');
      dispatchAppState(isLoadingTags(false));
    }
  };
};
