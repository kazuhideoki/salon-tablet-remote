import React from 'react'
import { Store } from '../../../../../../Store/Store';
import { TagsContext } from '../../../../../../Store/tags/Context';
export const useStateSelectTags = () => {
  const { appState } = React.useContext(Store);
  const { tags } = React.useContext(TagsContext);

  const [selectingTags, setSelectingTags] = React.useState(
    appState.selectedArticlesTags
  );

  return {
    tags,
    selectingTags,
    setSelectingTags,
  };
}