import React from 'react'
import { useGetArticles } from '../../../../../../ActionCreator/articles/useGetArticles/useGetArticles';
import { AppStateContext } from '../../../../../../Store/appState/Context';
import { useModalProps } from '../../../Modal/view/Modal'
export const useHandleGetArticle = (selectingTags: number[]
) => {
  const { appState } = React.useContext(AppStateContext);
  const getArticles = useGetArticles()
  const { closeModal } = useModalProps()


  return () => {
    const isLoaded = getArticles(appState.isSetting, 1, selectingTags);
    if (isLoaded) {
      closeModal()
    }
  };
}