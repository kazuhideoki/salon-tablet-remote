import React from 'react'
import { isLoadingMain } from '../../../../Store/appState/actions'
import { AppStateContext } from '../../../../Store/appState/Context'

export const useHandleLoadingMain = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)

  return (value: boolean) => {
    dispatchAppState(isLoadingMain(value))
  }
}