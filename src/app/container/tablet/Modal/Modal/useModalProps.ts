import { useTheme } from '@material-ui/core';
import { useCloseModal } from './context/useCloseModal';
import { useStateModal } from './context/useStateModal';
import { useIsMobile } from '../../../../../util/useIsMobile';

export const useModalProps = () => {
  const {
    modalSize,
    setModal,
    isModalOpen,
    currentModalContent,
    selected_theme,
    edittingPrams,
  } = useStateModal();

  const closeModal = useCloseModal();

  const isMobile = useIsMobile();

  const theme = useTheme();
  const duration = theme.transitions.duration;

  return {
    modalSize,
    setModal,
    isModalOpen,
    currentModalContent,
    closeModal,
    duration,
    selected_theme,
    edittingPrams,
    isMobile,
  };
};

export type ModalPresenterProps = ReturnType<typeof useModalProps>;
