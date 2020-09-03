import React from 'react'
import { useMediaQuery } from "@material-ui/core";
import { Store } from '../app/Store/Store';

export const useIsMobile = () => {
  const { appState } = React.useContext(Store)
  const { selectedDevice } = appState
  const smallWidth = useMediaQuery("(max-width:480px)")
  const smallHeight = useMediaQuery("(max-height:480px)")

  if (selectedDevice === 'mobile') {
    return true
  }
  if (selectedDevice === 'tablet') {
    return false
  }

  if (smallWidth || smallHeight) {
    return true
  } else {
    return false
  }

}