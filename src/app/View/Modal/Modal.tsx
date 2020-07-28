import React from "react";
import { Store, T_modal_size } from "../../Store/Store";
import { Slide, DialogContent, makeStyles, createStyles, useTheme } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import { CloseButton } from "../viewComponents/buttons/CloseButton";
import dynamic from "next/dynamic";
const ContentModal = dynamic(() => import("../Main/ContentModal"), {
  ssr: false,
});
import ArticleEditor from "../Drawer/ArticleEditor/ArticleEditor";
import FooterItemEditor from "../Drawer/ItemEditor/FooterItemEditor";
import { FeedbackForm } from "../Drawer/FeedbackForm";
import { SettingTheme } from "../Drawer/SettingTheme";
import { SelectTags } from "../Footer/SelectTags";
import { ManageTags } from "../Drawer/ManageTags";
import { SettingUserInfo } from "../Drawer/Account/SettingUserInfo";
import { DeleteAccountForm } from "../Drawer/Account/DeleteAccountForm";
import { useModalSize, large, medium } from "../viewComponents/useModalSize";
import { StyledDialog } from "./StyledDialog";
import { ManageInstagmaAccounts } from "../Drawer/ManageInstagmaAccounts";
import { SelectInstagramAccounts } from "../Footer/SelectInstagramAccounts";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

const useModalProps = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const modalSize = appState.edittingPrams.modalSize
  const setModalSize = (value: T_modal_size) => {
    dispatchAppState({ type: "SET_MODAL_SIZE", payload: value})
  }
  const { setModal, isModalOpen, currentModalContent, edittingPrams} = appState;
  const openModal = (name: string) => {
    dispatchAppState({ type: "OPEN_MODAL", payload: name });
  };
  const closeModal = () => {
    dispatchAppState({ type: "CLOSE_MODAL" });
  };

  const theme = useTheme()
  const duration = theme.transitions.duration

  return {
    appState,
    modalSize,
    setModalSize,
    setModal,
    isModalOpen,
    openModal,
    currentModalContent,
    closeModal,
    duration,
  };
};

type Props = ReturnType<typeof useModalProps>

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: 0,
    },
    dialogContent: {
        padding: "0!important",
        
    },
}))

export const ModalPresenter:React.FC<Props> = (props) => {
    const classes = useStyles();

        // ModalContentは内容モーダルウィンドウの中身の設定
        let ModalContent = () => <></>;

        // modalStyleにモーダルの表示形式の設定。サイズやoverflowなどのプロパティを設定する。デフォルトはlarge
        let modalStyle = useModalSize('large')
        
        switch (props.setModal) {
          case "content_modal":
            modalStyle = useModalSize(props.currentModalContent.modalSize)
            ModalContent = () => <ContentModal />;
            break;
          case "select_tags":
            modalStyle = medium
            ModalContent = () => <SelectTags />;
            break;
          case "select_instagram":
            modalStyle = medium
            ModalContent = () => <SelectInstagramAccounts />;
            break;
          case "edit_article":
            ModalContent = () => <ArticleEditor />;
            break;
          case "edit_footer_item":
            modalStyle = useModalSize(props.appState.edittingPrams.modalSize)
            ModalContent = () => <FooterItemEditor />;
            break;
          case "edit_tags":
            ModalContent = () => <ManageTags />;
            break;
          case "manage_instagram":
            ModalContent = () => <ManageInstagmaAccounts />;
            break;
          case "setting_theme":
            ModalContent = () => <SettingTheme />;
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

          default:
            console.log("エラーだよ、Modal→ '" + props.setModal + "'");
        }
        
        // modalを閉じるまでタグなどを追加しても再レンダーのmodalのアニメーションを表示させないようにする
        // setTimeoutで時間差でskipTransitonを変える必要あり
        const [skipTransiton, setSkipTransiton] = React.useState(false);
        React.useEffect(() => {
          setTimeout(() => {
            if (props.appState.isModalOpen) {
              setSkipTransiton(true)
            } else {
              setSkipTransiton(false);
            }
          }, props.duration.enteringScreen);
        },[props.appState.isModalOpen])

        console.log('modalSizeは ' + props.modalSize);
        

        return (
          // 受け取ったmodalStyle元にサイズ変更して描画
          <StyledDialog
            modalSize={props.modalSize}
            setModal={props.setModal}
            isEditting={props.appState.edittingPrams.isEditting}
            modalStyle={modalStyle}
            className={classes.root}
            open={props.isModalOpen}
            TransitionComponent={Transition}
            // 再レンダーのときtransitonアニメーションさせたくないときは、値を0に
            transitionDuration={skipTransiton ? 0 : { enter: props.duration.enteringScreen, exit: props.duration.leavingScreen }}
            onClose={props.closeModal}
            maxWidth="xl"
          >
            <CloseButton onClick={props.closeModal} />
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