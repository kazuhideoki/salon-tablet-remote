import React from 'react'
import { AppStateContext } from '../../../../../Store/appState/Context';
import { UserInfoContext } from '../../../../../Store/userInfo/Context';

export const useStateModal = () => {
  const { appState } = React.useContext(AppStateContext);
  const modalSize = appState.edittingPrams.modalSize;
  const { setModal, isModalOpen, currentModalContent } = appState;
  const { userInfo } = React.useContext(UserInfoContext);
  const selected_theme = userInfo.selected_theme
  const edittingPrams = appState.edittingPrams

  return {
    modalSize,
    setModal,
    isModalOpen,
    currentModalContent,
    selected_theme,
    edittingPrams,
  };
}