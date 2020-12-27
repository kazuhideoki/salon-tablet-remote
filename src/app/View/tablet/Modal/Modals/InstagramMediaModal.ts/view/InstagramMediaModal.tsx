import React from "react";
import { makeStyles, createStyles, Typography } from "@material-ui/core";
import { sqlToDate } from "../../../../../../ActionCreator/organizeSql/sqlToDate";
import { useStateInstagramMediaModal } from "../context/useStateInstagramMediaModal";

const useInstagramMediaModalProps = () => {
  const { instagramMedia } = useStateInstagramMediaModal()

  return {
    instagramMedia,
  };
};

export type TContentModalProps = ReturnType<typeof useInstagramMediaModalProps>;

const useStyles = makeStyles((theme) => createStyles({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    maxWidth: "100%",// modalだから スクリーサイズに対して？
    maxHeight: "100%",// modalだから スクリーサイズに対して？
  },
  content: {
    margin: theme.spacing(3),
  },
}));

export const InstagramMediaModalPresenter: React.FC<TContentModalProps> = (props) => {
  const classes = useStyles()

  let media = <></>
  switch (props.instagramMedia.media_type) {
    case "IMAGE":
      media = (
          <img src={props.instagramMedia.media_url} className={classes.media}/>
      );
      break;
    case "VIDEO":
      media = (
        <video
          autoPlay
          muted
          playsInline
          src={props.instagramMedia.media_url}
          className={classes.media}
        />
      );
      break;
    case "CAROUSEL_ALBUM":
      media = (
        <img src={props.instagramMedia.media_url} className={classes.media} />
      );
      break;

    default:
      break;
  }

  return (
    // 画像も
    <div className={classes.root}>
      {media}
    <div className={classes.content}>
      <Typography variant="body1" >
        {props.instagramMedia.caption}
      </Typography>
      <Typography variant="subtitle1" align="left">
        {sqlToDate(props.instagramMedia.timestamp)}
      </Typography>

    </div>
    </div>
  );
};

export const InstagramMediaModal = () => {
  const props = useInstagramMediaModalProps();

  return <InstagramMediaModalPresenter {...props} />;
};