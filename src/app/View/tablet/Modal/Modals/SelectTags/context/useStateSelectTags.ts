import React from 'react'
import { Store } from '../../../../../../Store/Store';
export const useStateSelectTags = () => {
  const { appState } = React.useContext(Store);
  const { tags } = appState;

  const [selectingTags, setSelectingTags] = React.useState(
    appState.selectedArticlesTags
  );

  return {
    tags,
    selectingTags,
    setSelectingTags,
  };
}