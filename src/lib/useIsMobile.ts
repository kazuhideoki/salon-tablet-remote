import React from 'react'
import { useMediaQuery } from "@material-ui/core";
import { Store } from '../app/Store/Store';

export const useIsMobile = () => {
  const { appState } = React.useContext(Store)
  const { selectedDevice } = appState

  if (selectedDevice === 'mobile') {
    return true
  }
  if (selectedDevice === 'tablet') {
    return false
  }

  if (
    useMediaQuery("(max-width:480px)") ||
    useMediaQuery("(max-height:480px)")
  ) {
    return true
  } else {
    return false
  }
    ;
}