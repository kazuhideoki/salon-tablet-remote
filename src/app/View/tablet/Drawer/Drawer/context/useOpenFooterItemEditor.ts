import React from 'react'
import { createFooterItem, setModal } from '../../../../../Store/appState/actions'
import { AppStateContext } from '../../../../../Store/appState/Context'
export const useOpenFooterItemEditor = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)

  return () => {
    dispatchAppState(createFooterItem());
    dispatchAppState(setModal("edit_footer_item"));
  }
}
