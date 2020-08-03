import React from "react";
import { Store } from "../../Store/Store";
import { makeStyles, createStyles, Typography } from "@material-ui/core";

const useInstagramMediaModalProps = () => {
  const { appState } = React.useContext(Store);
  const instagramMedia = appState.currentModalContent.instagramMedia

  return {
    instagramMedia,
  };
};

export type TContentModalProps = ReturnType<typeof useInstagramMediaModalProps>;

const useStyles = makeStyles((theme) => createStyles({}));

export const InstagramMediaModalPresenter: React.FC<TContentModalProps> = (props) => {
  return (
    // 画像も
    <>
      <img src={props.instagramMedia.media_url}/>

      <Typography variant="subtitle1" align="right">
        {props.instagramMedia.timestamp}
      </Typography>
      <Typography variant="body1">
        {props.instagramMedia.caption}
      </Typography>
    </>
  );
};

export const InstagramMediaModal = () => {
  const props = useInstagramMediaModalProps();

  return <InstagramMediaModalPresenter {...props} />;
};