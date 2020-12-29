import React from 'react'
import { setModal } from '../../../../../Store/appState/actions'
import { AppStateContext } from '../../../../../Store/appState/Context'
import { TSetModal } from '../../../../../Store/Types'
export const useOpenModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)

  return (value: TSetModal) => {
    dispatchAppState(setModal(value));
  }
}