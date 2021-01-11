import React from 'react';
import { AppStateContext } from '../../../../../../stores/appState/Context';
import { TagsContext } from '../../../../../../stores/tags/Context';
export const useStateSelectTags = () => {
  const { appState } = React.useContext(AppStateContext);
  const { tags } = React.useContext(TagsContext);

  const [selectingTags, setSelectingTags] = React.useState(
    appState.selectedArticlesTags
  );

  return {
    tags,
    selectingTags,
    setSelectingTags,
  };
};
