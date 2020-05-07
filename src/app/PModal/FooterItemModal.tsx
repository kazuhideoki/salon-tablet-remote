import React from 'react'
import { Store } from "../Store/Store";

export const FooterItemModal = () => {
  const { footerItems } = React.useContext(Store)
  return (
    <>
      {footerItems}
    </>
  )
}
