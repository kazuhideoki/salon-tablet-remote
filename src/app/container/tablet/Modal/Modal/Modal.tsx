import React from 'react';
import { DialogContent, makeStyles, createStyles } from '@material-ui/core';
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
import { ModalPresenterProps, useModalProps } from './useModalProps';

const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      padding: 0,
    },
    dialogContent: {
      padding: '0!important',
    },
  });
});

export const ModalPresenter: React.FC<ModalPresenterProps> = (props) => {
  const classes = useStyles();

  // ModalContentは内容モーダルウィンドウの中身の設定
  let modalContent: React.ReactNode = () => <></>;

  // modalStyleにモーダルの表示形式の設定。サイズやoverflowなどのプロパティを設定する。デフォルトはlarge
  let modalStyle = useModalStyle('large');

  const fullScreenModalStyle = useModalStyle('fullScreen');
  const upperSideModalStyle = useModalStyle('upperSide');
  const propsModalStyle = useModalStyle(props.modalSize);
  const mediumModalStyle = useModalStyle('medium');
  const currentModalStyle = useModalStyle(props.currentModalContent.modalSize);

  switch (props.setModal) {
    case 'content_modal':
      modalContent = <ContentModal />;
      break;
    case 'footer_item_modal':
      modalStyle = currentModalStyle;
      modalContent = <FooterItemModal />;
      break;
    case 'google_search':
      modalStyle = upperSideModalStyle;
      modalContent = <GoogleSearch />;
      break;
    case 'instagram_media_modal':
      modalStyle = currentModalStyle;
      modalContent = <InstagramMediaModal />;
      break;
    case 'select_tags':
      modalStyle = medium;
      modalContent = <SelectTags />;
      break;
    case 'select_instagram':
      modalStyle = medium;
      modalContent = <SelectInstagramAccounts />;
      break;
    case 'edit_info_bar':
      modalContent = <InfoBarEditor />;
      break;
    case 'edit_article':
      modalContent = <ArticleEditor />;
      break;
    case 'edit_footer_item':
      modalStyle = propsModalStyle;
      modalContent = <FooterItemEditor />;
      break;
    case 'edit_tags':
      modalStyle = mediumModalStyle;
      modalContent = <ManageTags />;
      break;
    case 'manage_instagram':
      modalContent = <ManageInstagramAccounts />;
      break;
    case 'setting_theme':
      modalStyle = mediumModalStyle;
      modalContent = <ManageTheme />;
      break;
    case 'setting_user_info':
      modalContent = <SettingUserInfo />;
      break;
    case 'feedback_form':
      modalContent = <FeedbackForm />;
      break;
    case 'delete_account_form':
      modalContent = <DeleteAccountForm />;
      break;
    case 'popup_not_email_verified':
      modalStyle = mediumModalStyle;
      modalContent = <PageNotEmailVerified />;
      break;

    default:
      console.log("エラー、Modal→ '" + props.setModal + "'");
  }

  const Transition = switchingTransition(props.selected_theme);

  // modalを閉じるまでタグなどを追加しても再レンダーのmodalのアニメーションを表示させないようにする
  // setTimeoutで時間差でskipTransitionを変える必要あり
  const [skipTransition, setSkipTransition] = React.useState(false);
  React.useEffect(
    function offTransition() {
      setTimeout(() => {
        if (props.isModalOpen) {
          setSkipTransition(true);
        } else {
          setSkipTransition(false);
        }
      }, props.duration.enteringScreen);
    },
    [props.isModalOpen]
  );

  return (
    // 受け取ったmodalStyle元にサイズ変更して描画
    <StyledDialog
      modalSize={props.modalSize}
      setModal={props.setModal}
      isEditting={props.edittingPrams.isEditting}
      modalStyle={modalStyle}
      modalStyleMobile={
        props.setModal === 'google_search'
          ? upperSideModalStyle
          : fullScreenModalStyle
      }
      className={classes.root}
      open={props.isModalOpen}
      TransitionComponent={Transition}
      // 再レンダーのときtransitionアニメーションさせたくないときは、値を0に
      transitionDuration={
        skipTransition
          ? 0
          : {
              enter: props.duration.enteringScreen,
              exit: props.duration.leavingScreen,
            }
      }
      onClose={props.closeModal}
      maxWidth="xl"
      isMobile={props.isMobile}>
      {props.setModal === 'google_search' ? null : (
        <CloseButton onClick={props.closeModal} />
      )}
      <DialogContent className={classes.dialogContent}>
        {modalContent}
      </DialogContent>
    </StyledDialog>
  );
};

export const Modal = (): JSX.Element => {
  const props = useModalProps();

  return <ModalPresenter {...props} />;
};
