import React from 'react'
import { AppStateContext } from '../../../../Store/appState/Context';
import { TArticle } from "../../../../Store/Types";

export const useOnClickUpdate = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)
  return (value: TArticle) => {
    dispatchAppState({
      type: "OPEN_ARTICLE_EDITOR_FOR_EDIT",
      payload: value,
    });
  }
}