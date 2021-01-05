import React from "react";
import { isLoadingTags } from "../../../../../Store/appState/actions";
import { AppStateContext } from "../../../../../Store/appState/Context";

export const useHandleLoadingTags = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (value: boolean) => {
    dispatchAppState(isLoadingTags(value));
  };
};
