import React from "react";
import { Store } from "../../Store/Store";
import { Dialog, Slide, withStyles, DialogContent, makeStyles, createStyles } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import { CloseButton } from "../buttons/CloseButton";
import dynamic from "next/dynamic";
const ContentModal = dynamic(() => import("./ContentModal"), {
  ssr: false,
});
import { SettingUserInfo } from "../Setting/SettingUserInfo";
import ArticleEditor from "../Setting/ArticleEditor";
import FooterItemEditor from "../Setting/FooterItemEditor";
import { DeleteAccountForm } from "../Setting/DeleteAccountForm";
import { FeedbackForm } from "../Setting/FeedbackForm";
import { SettingTheme } from "../Setting/SettingTheme";
import { AllTags } from "../Setting/AllTags";
import { SelectTags } from "./SelectTags";
import { ManageTags } from "../Setting/ManageTags";
const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) =>
  createStyles({
    dialogContent: {
        padding: "0!important",
        
    },
}))

export const PModal = () => {
    const classes = useStyles();

    const { appState, dispatchAppState } = React.useContext(Store)
    const setModal = appState.setModal;
    const isModalOpen = appState.isModalOpen
    const openModal = (name: string) => {
        dispatchAppState({ type: "OPEN_MODAL", payload: name });
    }
    const closeModal = () => {
      dispatchAppState({ type: "CLOSE_MODAL" });
    };

    const props = {
        classes,
        setModal,
        isModalOpen,
        openModal,
        closeModal,
    };
    type Props = typeof props


    const PModalPresenter = ({
        classes,
        setModal,
        isModalOpen,
        openModal,
        closeModal,
    }: Props) => {
        // ModalContentは内容モーダルウィンドウの中身の設定
        let ModalContent = () => <></>;
        // modalStyleにモーダルのサイズやoverflowなどのプロパティを設定する。
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

        switch (setModal) {
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
            console.log("エラーだよ、PModal→ '" + setModal + "'");
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

        const StyledDialog = withStyles({
            paper: paperStyle,
        })(Dialog);

        return (
            <StyledDialog
                open={isModalOpen}
                TransitionComponent={Transition}
                onClose={closeModal}
                maxWidth="xl"
            >
                <CloseButton onClick={closeModal} />
                <DialogContent className={classes.dialogContent}>
                    <ModalContent />
                </DialogContent>
            </StyledDialog>
        );
    };



    return PModalPresenter(props);

}