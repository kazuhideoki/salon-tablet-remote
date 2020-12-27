import React from 'react'
import { Store } from '../../../../Store/Store';
import { TArticle } from "../../../../Store/Types";

export const useOnClickUpdate = () => {
  const { dispatchAppState } = React.useContext(Store)
  return (value: TArticle) => {
    dispatchAppState({
      type: "OPEN_ARTICLE_EDITOR_FOR_EDIT",
      payload: value,
    });
  }
}