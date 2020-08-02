import React from "react";
import { Store } from "../../Store/Store";
import { makeStyles, createStyles, Typography } from "@material-ui/core";

const useInstagramMediaModalProps = () => {
  const { appState } = React.useContext(Store);

  return {
    appState,
  };
};

export type TContentModalProps = ReturnType<typeof useInstagramMediaModalProps>;

const useStyles = makeStyles((theme) => createStyles({}));

export const InstagramMediaModalPresenter: React.FC<TContentModalProps> = (props) => {
  return (
    // 画像も
    <>
      
      <Typography variant="body1">
        {props.appState.currentModalContent.contnet}
      </Typography>
    </>
  );
};

export const InstagramMediaModal = () => {
  const props = useInstagramMediaModalProps();

  return <InstagramMediaModalPresenter {...props} />;
};