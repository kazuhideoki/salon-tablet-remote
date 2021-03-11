import React from 'react';
import {
  DialogContent,
  makeStyles,
  createStyles,
  useTheme,
} from '@material-ui/core';
import { CloseButton } from '../../../../components/editButtonBox/CloseButton';
import dynamic from 'next/dynamic';
const ContentModal = dynamic(
  () => import('../Modals/ContentModal/ContentModal'),
  {
    ssr: false,
  }
);
const FooterItemModal = dynamic(
  () => import('../Modals/FooterItemModal/FooterItemModal'),
  {
    ssr: false,
  }
);
import ArticleEditor from '../../Drawer/ArticleEditor/ArticleEditor';
import FooterItemEditor from '../../Drawer/FooterItemEditor/FooterItemEditor';
import { FeedbackForm } from '../../Drawer/FeedbackForm/FeedbackForm';
import { ManageTheme } from '../../Drawer/ManageTheme/ManageTheme';
import { SelectTags } from '../Modals/SelectTags/SelectTags';
import { ManageTags } from '../../Drawer/ManageTags/ManageTags';
import { SettingUserInfo } from '../../Drawer/ManageUserInfo/ManageUserInfo';
import { DeleteAccountForm } from '../../Drawer/DeleteAccountForm/DeleteAccountForm';
import { useModalStyle, medium } from './context/useModalStyle';
import { StyledDialog } from './components/StyledDialog';
import { ManageInstagramAccounts } from '../../Drawer/ManageInstagramAccounts/ManageInstagmaAccounts';
import { SelectInstagramAccounts } from '../Modals/SelectInstagramAccounts/SelectInstagramAccounts';
import { InstagramMediaModal } from '../Modals/InstagramMediaModal.ts/InstagramMediaModal';
import InfoBarEditor from '../../Drawer/InfoBarEditor/InfoBarEditor';
import { GoogleSearch } from '../Modals/GoogleSearch/GoogleSearch';
import { PageNotEmailVerified } from '../../../../components/pages/PageNotEmailVerified';
import { switchingTransition } from './context/switchingTransition';
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
