import React from "react";
import { Store } from "../../Store/Store";
import { Dialog, Slide, withStyles, DialogContent, makeStyles, createStyles, Paper, useTheme } from "@material-ui/core";
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
import { SelectTags } from "../Main/SelectTags";
import { ManageTags } from "../Drawer/ManageTags";
import { SettingUserInfo } from "../Drawer/Account/SettingUserInfo";
import { DeleteAccountForm } from "../Drawer/Account/DeleteAccountForm";
import { EditorContext } from "../../Store/EditorContext";
import { useModalSize, large, medium } from "../viewComponents/useModalSize";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

const useModalProps = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  // const { modalSize } = React.useContext(EditorContext)
  // const edittingParams = appState.edittingPrams

  const { setModal, isModalOpen, currentModalContent, edittingPrams} = appState;
  // modalSizeは選択時に即モーダルウィンドウのサイズを変えるのでここで値を持つ
  const [modalSize, setModalSize] = React.useState(edittingPrams.isEditting ? edittingPrams.footerItem.modal_size : "large")
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

        // modalStyleにモーダルの表示形式の設定。サイズやoverflowなどのプロパティを設定する。
        let modalStyle;
        
        switch (props.setModal) {
          case "content_modal":
            modalStyle = useModalSize(props.currentModalContent.modalSize)
            ModalContent = () => <ContentModal />;
            break;
          case "select_tags":
            modalStyle = medium
            ModalContent = () => <SelectTags />;
            break;
          case "edit_article":
            ModalContent = () => <ArticleEditor />;
            break;
          case "edit_footer_item":
            modalStyle = useModalSize(props.modalSize)
            ModalContent = () => <FooterItemEditor modalSize={props.modalSize} setModalSize={props.setModalSize}/>;
            break;
          case "edit_tags":
            ModalContent = () => <ManageTags />;
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

        // modalStyleの指定がなければ'large'をあてる
        let paperStyle: any =  modalStyle || large

        // 中のcssを変えないといけなかったのでwithStylesで
        const StyledDialog = withStyles({
            paper: paperStyle,
        })(Dialog);
        
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

        return (
          <StyledDialog
            className={classes.root}
            open={props.isModalOpen}
            TransitionComponent={Transition}
            // 再レンダーのときtransitonアニメーションさせたくないときは、値を0に
            transitionDuration={skipTransiton ? 0 : { enter: props.duration.enteringScreen, exit: props.duration.leavingScreen }}
            // transitionDuration={0}
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


export const Modal = React.memo(() => {
  const props = useModalProps()

  return <ModalPresenter {...props}/>
})