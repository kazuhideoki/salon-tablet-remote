import React from 'react'
import { setModal } from '../../../../../Store/appState/actions'
import { AppStateContext } from '../../../../../Store/appState/Context'
export const useOpenFooterItemEditor = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)

  return () => {
    dispatchAppState({ type: "OPEN_FOOTER_ITEM_EDITOR" });
    dispatchAppState(setModal("edit_footer_item"));
  }
}
