import React from "react";
import { Store } from "../Store/Store";

import { Dialog, Slide, withStyles, DialogContent } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';

import { useStylesFactory } from "../Store/useStylesFactory";
import { CloseButton } from "./CloseButton";
import { ColorChart } from "./ColorChart";
import { Setting } from "../Setting/Setting";
import { EditArticle } from "../Setting/EditArticle";
import { EditFooter } from "../Setting/EditFooter";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    dialogContent: {
        padding: "0!important",
        
    },
}

export const PModal = () => {
    const classes = useStylesFactory(styles);

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
        // modalは内容、modalStyle内容に応じてDialogのstyleを変える
        let ModalContent = () => <></>;
        let modalStyle = null;
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
            case "colorChart":
                modalStyle = size90; 
                ModalContent = () => <ColorChart />;
                break;
            case "setting":
                ModalContent = () => <Setting openModal={openModal} />;
                break;
            case "edit_article":
                modalStyle = size100;
                ModalContent = () => <EditArticle />;
                break;
            case "edit_footer":
                modalStyle = size90;
                ModalContent = () => <EditFooter />;
                break;

            default:
                console.log("エラーだよ、PModal→ '" + setModal +"'");
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