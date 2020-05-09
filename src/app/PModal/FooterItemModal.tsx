import React from 'react'
import { Store } from "../Store/Store";

export const FooterItemModal = () => {
  const { appState } = React.useContext(Store)

  return (
    <>
      {appState.footerItemContent}
    </>
  )
}
