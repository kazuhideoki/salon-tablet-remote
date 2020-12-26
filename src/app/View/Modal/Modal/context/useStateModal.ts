import React from 'react'
import { Store } from '../../../../Store/Store';

export const useStateModal = () => {
  const { appState } = React.useContext(Store);
  const modalSize = appState.edittingPrams.modalSize;
  const { setModal, isModalOpen, currentModalContent } = appState;
  const selected_theme = appState.userInfo.selected_theme
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