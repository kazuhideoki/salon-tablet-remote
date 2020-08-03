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

const useStyles = makeStyles((theme) => createStyles({
  root: {
    padding: theme.spacing(2)
  },
  media: {
    textAlign: "center",
    maxWidth: "90%",// modalだから スクリーサイズに対して？
  },
}));

export const InstagramMediaModalPresenter: React.FC<TContentModalProps> = (props) => {
  const classes = useStyles()

  let media = <></>
  switch (props.instagramMedia.media_type) {
    case "IMAGE":
      media = (
        <div>
          <img src={props.instagramMedia.media_url} />;
        </div>
      );
      break;
    case "VIDEO":
      media = (
        <div>
          <video
            autoPlay
            muted
            playsInline
            src={props.instagramMedia.media_url}
          ></video>
        </div>
      );
      break;
    case "CAROUSEL_ALBUM":
      media = (
        <div>
          <img src={props.instagramMedia.media_url} />;
        </div>
      );
      break;

    default:
      break;
  }

  return (
    // 画像も
    <div className={classes.root}>
      {media}
      <Typography variant="subtitle1" align="right">
        {props.instagramMedia.timestamp}
      </Typography>
      <Typography variant="body1">
        {props.instagramMedia.caption}
      </Typography>
    </div>
  );
};

export const InstagramMediaModal = () => {
  const props = useInstagramMediaModalProps();

  return <InstagramMediaModalPresenter {...props} />;
};