import React from "react";
import { DialogContent, makeStyles, createStyles, useTheme } from "@material-ui/core";
import { CloseButton } from "../../../../pureComponents/buttons/CloseButton";
import dynamic from "next/dynamic";
const ContentModal = dynamic(() => import("../../Modals/ContentModal/view/ContentModal"), {
  ssr: false,
});
const FooterItemModal = dynamic(() => import("../../Modals/FooterItemModal/view/FooterItemModal"), {
  ssr: false,
});
import ArticleEditor from "../../../Drawer/ArticleEditor/view/ArticleEditor";
import FooterItemEditor from "../../../Drawer/FooterItemEditor/view/FooterItemEditor";
import { FeedbackForm } from "../../../Drawer/FeedbackForm/view/FeedbackForm";
import { ManageTheme } from "../../../Drawer/ManageTheme/view/ManageTheme";
import { SelectTags } from "../../Modals/SelectTags";
import { ManageTags } from "../../../Drawer/ManageTags/view/ManageTags";
import { SettingUserInfo } from "../../../Drawer/ManageUserInfo/view/ManageUserInfo";
import { DeleteAccountForm } from "../../../Drawer/DeleteAccountForm/view/DeleteAccountForm";
import { useModalSize, medium } from "../context/useModalSize";
import { StyledDialog } from "../components/StyledDialog";
import { ManageInstagramAccounts } from "../../../Drawer/ManageInstagramAccounts/view/ManageInstagmaAccounts";
import { SelectInstagramAccounts } from "../../Modals/SelectInstagramAccounts";
import { InstagramMediaModal } from "../../Modals/InstagramMediaModal.ts/view/InstagramMediaModal";
import InfoBarEditor from "../../../Drawer/InfoBar/view/InfoBarEditor";
import { GoogleSearch } from "../../Modals/GoogleSearch/view/GoogleSearch";
import { PageNotEmailVerified } from "../../../../../pageComponent/PageNotEmailVerified";
import { switchingTransition } from "../context/switchingTransition";
import { useCloseModal } from "../context/useCloseModal";
import { useOpenModal } from "../context/useOpenModal";
import { useStateModal } from "../context/useStateModal";

const useModalProps = () => {
  const {
    modalSize,
    setModal,
    isModalOpen,
    currentModalContent,
    selected_theme,
    edittingPrams,
  } = useStateModal()

  const openModal = useOpenModal()

  const closeModal = useCloseModal()

  const theme = useTheme()
  const duration = theme.transitions.duration

  return {
    modalSize,
    setModal,
    isModalOpen,
    openModal,
    currentModalContent,
    closeModal,
    duration,
    selected_theme,
    edittingPrams,
  };
};

type Props = ReturnType<typeof useModalProps>

const useStyles = makeStyles((theme) => {
  return createStyles({
    root: {
      padding: 0,
    },
    dialogContent: {
      padding: "0!important",
    },
  });})

export const ModalPresenter:React.FC<Props> = (props) => {
    const classes = useStyles();

        // ModalContentは内容モーダルウィンドウの中身の設定
        let ModalContent = () => <></>;

        // modalStyleにモーダルの表示形式の設定。サイズやoverflowなどのプロパティを設定する。デフォルトはlarge
        let modalStyle = useModalSize('large')
        let modalStyleMobile = props.setModal === 'google_search' ? useModalSize("upperSide") : useModalSize("fullScreen");
        
        switch (props.setModal) {
          case "content_modal":
            ModalContent = () => <ContentModal />;
            break;
          case "footer_item_modal":
            modalStyle = useModalSize(props.currentModalContent.modalSize)
            ModalContent = () => <FooterItemModal />;
            break;
          case "google_search":
            modalStyle = useModalSize("upperSide");
            ModalContent = () => <GoogleSearch/>
            break;
          case "instagram_media_modal":
            modalStyle = useModalSize(props.currentModalContent.modalSize)
            ModalContent = () => <InstagramMediaModal />;
            break;
          case "select_tags":
            modalStyle = medium
            ModalContent = () => <SelectTags />;
            break;
          case "select_instagram":
            modalStyle = medium
            ModalContent = () => <SelectInstagramAccounts />;
            break;
          case "edit_info_bar":
            ModalContent = () => <InfoBarEditor />;
            break;
          case "edit_article":
            ModalContent = () => <ArticleEditor />;
            break;
          case "edit_footer_item":
            modalStyle = useModalSize(props.modalSize)
            ModalContent = () => <FooterItemEditor />;
            break;
          case "edit_tags":
            modalStyle = useModalSize("medium");
            ModalContent = () => <ManageTags />;
            break;
          case "manage_instagram":
            ModalContent = () => <ManageInstagramAccounts />;
            break;
          case "setting_theme":
            modalStyle = useModalSize('medium');
            ModalContent = () => <ManageTheme />;
            break;
          case "setting_user_info":
            ModalContent = () => <SettingUserInfo />;
            break;
          case "feedback_form":
            ModalContent = () => <FeedbackForm />;
            break;
          case "delete_account_form":
            ModalContent = () => <DeleteAccountForm />;
            break;
          case "popup_not_email_verified":
            modalStyle = useModalSize('medium');
            ModalContent = () => <PageNotEmailVerified />;
            break;

          default:
            console.log("エラー、Modal→ '" + props.setModal + "'");
        }
        
        const Transition = switchingTransition(props.selected_theme)
        
        // modalを閉じるまでタグなどを追加しても再レンダーのmodalのアニメーションを表示させないようにする
        // setTimeoutで時間差でskipTransitionを変える必要あり
        const [skipTransition, setSkipTransition] = React.useState(false);
        React.useEffect(function offTransition() {
          setTimeout(() => {
            if (props.isModalOpen) {
              setSkipTransition(true)
            } else {
              setSkipTransition(false);
            }
          }, props.duration.enteringScreen);
        },[props.isModalOpen])        

        return (
          // 受け取ったmodalStyle元にサイズ変更して描画
          <StyledDialog
            modalSize={props.modalSize}
            setModal={props.setModal}
            isEditting={props.edittingPrams.isEditting}
            modalStyle={modalStyle}
            modalStyleMobile={modalStyleMobile}
            className={classes.root}
            open={props.isModalOpen}
            TransitionComponent={Transition}
            // 再レンダーのときtransitionアニメーションさせたくないときは、値を0に
            transitionDuration={skipTransition ? 0 : { enter: props.duration.enteringScreen, exit: props.duration.leavingScreen }}
            onClose={props.closeModal}
            maxWidth="xl"
          >
            {props.setModal === 'google_search' ? null : <CloseButton onClick={props.closeModal} /> }
            <DialogContent className={classes.dialogContent}>
              <ModalContent />
            </DialogContent>
          </StyledDialog>
        );
    }


export const Modal = () => {
  const props = useModalProps()

  return <ModalPresenter {...props}/>
}