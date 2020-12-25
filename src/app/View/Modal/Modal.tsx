import React from "react";
import { Store } from "../../Store/Store";
import { Slide, DialogContent, makeStyles, createStyles, useTheme, Fade } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import { CloseButton } from "../../pureComponents/buttons/CloseButton";
import dynamic from "next/dynamic";
const ContentModal = dynamic(() => import("../Main/ContentModal"), {
  ssr: false,
});
const FooterItemModal = dynamic(() => import("../Footer/FooterItemModal"), {
  ssr: false,
});
import ArticleEditor from "../Drawer/ArticleEditor/view/ArticleEditor";
import FooterItemEditor from "../Drawer/FooterItemEditor/view/FooterItemEditor";
import { FeedbackForm } from "../Drawer/FeedbackForm";
import { ManageTheme } from "../Drawer/ManageTheme/ManageTheme";
import { SelectTags } from "../Footer/SelectTags";
import { ManageTags } from "../Drawer/ManageTags";
import { SettingUserInfo } from "../Drawer/Account/view/ManageUserInfo";
import { DeleteAccountForm } from "../Drawer/Account/view/DeleteAccountForm";
import { useModalSize, medium } from "./useModalSize";
import { StyledDialog } from "./StyledDialog";
import { ManageInstagramAccounts } from "../Drawer/ManageInstagmaAccounts";
import { SelectInstagramAccounts } from "../Footer/SelectInstagramAccounts";
import { TSetModal, T_selected_theme } from "../../Store/Types";
import { InstagramMediaModal } from "../Main/InstagramMediaModal";
import InfoBarEditor from "../Drawer/InfoBar/view/InfoBarEditor";
import { GoogleSearch } from "../Footer/GoogleSearch";
import { PageNotEmailVerified } from "../../../pageComponent/PageNotEmailVerified";

export const switchingTransition = (selected_theme: T_selected_theme) => {
  switch (selected_theme) {
    case 'white':
        return React.forwardRef<unknown, TransitionProps>(
          function Transition(props, ref) {
            //@ts-ignore
            return <Fade direction="up" ref={ref} {...props} />;
          }
        );
      
      break;
  
    default:
      return React.forwardRef<unknown, TransitionProps>(
        function Transition(props, ref) {
          //@ts-ignore
          return <Slide direction="up" ref={ref} {...props} />;
        }
      );
      break;
  } 
}

const useModalProps = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const modalSize = appState.edittingPrams.modalSize
  const { setModal, isModalOpen, currentModalContent } = appState;
  const openModal = (name: TSetModal) => {
    dispatchAppState({ type: "OPEN_MODAL", payload: name });
  };
  const closeModal = () => {
    let closing = true
    if (
      setModal === "edit_article" ||
      setModal === "edit_footer_item" ||
      setModal === "edit_info_bar"
    ) {
      closing = confirm("編集中ですが保存せずにウィンドウを閉じますか？");
    }

    if (closing) {
      dispatchAppState({ type: "CLOSE_MODAL" });
    }
  };

  const theme = useTheme()
  const duration = theme.transitions.duration

  return {
    appState,
    modalSize,
    setModal,
    isModalOpen,
    openModal,
    currentModalContent,
    closeModal,
    duration,
    selected_theme: appState.userInfo.selected_theme
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
            modalStyle = useModalSize(props.appState.edittingPrams.modalSize)
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
            if (props.appState.isModalOpen) {
              setSkipTransition(true)
            } else {
              setSkipTransition(false);
            }
          }, props.duration.enteringScreen);
        },[props.appState.isModalOpen])        

        return (
          // 受け取ったmodalStyle元にサイズ変更して描画
          <StyledDialog
            modalSize={props.modalSize}
            setModal={props.setModal}
            isEditting={props.appState.edittingPrams.isEditting}
            modalStyle={modalStyle}
            modalStyleMobile={modalStyleMobile}
            className={classes.root}
            open={props.isModalOpen}
            TransitionComponent={Transition}
            // 再レンダーのときtransitonアニメーションさせたくないときは、値を0に
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