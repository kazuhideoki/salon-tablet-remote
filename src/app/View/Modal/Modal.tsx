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

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

const useModalProps = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const setModal = appState.setModal;
  const isModalOpen = appState.isModalOpen;
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
    // skipTransiton,
    // setSkipTransiton,
    setModal,
    isModalOpen,
    openModal,
    closeModal,
    duration,
  };
};

type Props = ReturnType<typeof useModalProps>

const useStyles = makeStyles((theme) =>
  createStyles({
    dialogContent: {
        padding: "0!important",
        
    },
}))

export const ModalPresenter:React.FC<Props> = (props) => {
    const classes = useStyles();

        // ModalContentは内容モーダルウィンドウの中身の設定
        let ModalContent = () => <></>;

        // modalStyleにモーダルの表示形式の設定。サイズやoverflowなどのプロパティを設定する。
        let modalStyle = null;
        const size70 = {
          width: "70vw",
          height: "70vh",
          padding: 0,
          overflow: "hidden",
        };
        const size90 = {
            width: "90vw",
            height: "90vh",
            padding: 0,
            overflow: "hidden",
        };
        const size100 = {
            width: "100vw",
            height: "100vh",
            padding: 0,
        };

        switch (props.setModal) {
          case "content_modal":
            modalStyle = size90;
            ModalContent = () => <ContentModal />;
            break;
          case "select_tags":
            modalStyle = size70;
            ModalContent = () => <SelectTags />;
            break;
          case "edit_article":
            modalStyle = size90;
            ModalContent = () => <ArticleEditor />;
            break;
          case "edit_footer_item":
            modalStyle = size90;
            ModalContent = () => <FooterItemEditor />;
            break;
          case "edit_tags":
            modalStyle = size90;
            ModalContent = () => <ManageTags />;
            break;
          case "setting_theme":
            modalStyle = size70;
            ModalContent = () => <SettingTheme />;
            break;
          case "setting_user_info":
            modalStyle = size90;
            ModalContent = () => <SettingUserInfo />;
            break;
          case "feedback_form":
            modalStyle = size90;
            ModalContent = () => <FeedbackForm />;
            break;
          case "delete_account_form":
            modalStyle = size90;
            ModalContent = () => <DeleteAccountForm />;
            break;

          default:
            console.log("エラーだよ、Modal→ '" + props.setModal + "'");
        }

        // modalStyleの指定がなければデフォルト値をあてる
        let paperStyle: any = modalStyle || {
            width: 500,
            height: 500,
            padding: 30,
        };
        paperStyle.maxWidth = "100%";
        paperStyle.maxHeight = "100%";
        paperStyle.margin = 0;

        // 中のcssを変えないといけなかったのでwithStylesで
        const StyledDialog = withStyles({
            paper: paperStyle,
        })(Dialog);
        const StyledPaper = withStyles({
            root: paperStyle,
        })(Paper);
        
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