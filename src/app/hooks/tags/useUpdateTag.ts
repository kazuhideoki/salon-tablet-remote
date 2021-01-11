import React from 'react';
import { useGetTags } from './useGetTags';
import { ApiTagsUpdata, apiTagsUpdata } from '../../../pages/api/tags/update';
import { AppStateContext } from '../../stores/appState/Context';
import { isLoadingTags } from '../../stores/appState/actions';

type Props = { edittingTagId: number; tagName: string };

export const useUpdateTag = (): ((props: Props) => Promise<void>) => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const getTags = useGetTags();

  return async ({ edittingTagId, tagName }: Props) => {
    dispatchAppState(isLoadingTags(true));

    const params: ApiTagsUpdata = {
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
