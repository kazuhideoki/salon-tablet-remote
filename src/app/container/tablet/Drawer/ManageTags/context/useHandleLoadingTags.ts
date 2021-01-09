import React from 'react';
import { isLoadingTags } from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';

export const useHandleLoadingTags = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: boolean) => {
    dispatchAppState(isLoadingTags(value));
  };
};
