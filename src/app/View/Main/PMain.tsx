import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  makeStyles,
  createStyles,
  withStyles,
  Button,
} from "@material-ui/core";
import { UpdateButton } from "../viewComponents/buttons/UpdateButton";
import { DeleteButton } from "../viewComponents/buttons/DeleteButton";
import { Store } from "../../Store/Store";
import {
  useDeleteArticle,
} from "../../ActionCreator/articles/useDeleteArticle";
import { sqlToDate } from "../../ActionCreator/organizeSql/sqlToDate";
import { EditButtonsBox } from "../viewComponents/buttons/EditButtonsBox";
import { SelectedTags } from "./components/SelectedTags";
import { PlayArrowRounded } from "@material-ui/icons";
import { TArticle } from "../../Store/Types";
import { Skeleton } from "@material-ui/lab";
import { showDataType } from "./components/showDataType";
import { displayArticlesScrollJsx } from "./components/displayArticlesScrollJsx";
import { displayInstagramMediasJsx } from "./components/displayInstagramMediasJsx";
import { noArticlesJsx } from "./components/noArticlesJsx";

export const usePMainProps = () => {
  const { appState, dispatchAppState } = React.useContext(
    Store
  );
  const {
    articles,
    tags,
    instagramMedias,
    loading,
    isShowInstagram,
    isSetting,
  } = appState;
  const deleteArticle = useDeleteArticle();

  const onClickUpdate = (value: TArticle) => {
    dispatchAppState({
      type: "OPEN_ARTICLE_EDITOR_FOR_EDIT",
      payload: value,
    });
  };
  
  return {
    isSetting,
    articles,
    instagramMedias,
    tags,
    deleteArticle,
    dispatchAppState,
    isShowInstagram,
    onClickUpdate,
    loading: loading.main,
  };
};

export type TUseMainProps = ReturnType<typeof usePMainProps>;


// 主に位置情報に関するスタイルは親コンポーネントからpropsを通して渡される。
const useStyles = makeStyles((theme) => {
  const cardWidth = 350

  return createStyles({
    root: {
      overflow: "scroll",
      height: "100%",
    },
    gridItem: {
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    itemIsDraft: {
      border: "3px solid red",
    },
    cardActionArea: {
      position: "relative",
      width: cardWidth,
      height: "100%",
      flexGrow: 1,
    },
    card: {
      overflowY: "scroll",
      height: "100%",
    },
    editButtonsBox: {
      position: "absolute",
      top: 0,
      right: 0,

      zIndex: 10,
    },
    showDataType: {
      position: "absolute",
      top: 0,
      left: 0,

      zIndex: 10,
    },
    cardContent: {
      position: "relative",
      padding: 0,
    },
    thumbnailDiv: {
      position: "relative",
    },
    thumbnail: {
      display: "block",
      width: "100%",
      objectFit: "cover",
      height: "300px",
      marginRight: "auto",
      marginLeft: "auto",
    },
    title: {
      width: "100%",
      bottom: 0,
      padding: "40px 10px 0 10px",
      position: "absolute",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5074404761904762) 33%, rgba(255,255,255,1) 100%)",
    },
    playIcon: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
      color: "white",
      fontSize: "60px",
    },
    tagsAndDate: {
      display: "flex",
      margin: `${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(
        1
      )}px`,
    },
    tags: {
      flexGrow: 1,
    },
    date: {
      margin: theme.spacing(2),
    },

    excerpt: {
      fontSize: "1rem",
      margin: `${theme.spacing(1)}px`,
    },
    readMore: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
      left: theme.spacing(3),
    },
    
  });

})

export type TMainClasses = ReturnType<typeof useStyles>;

export const StyledCardContent = withStyles({
  root: {
    '&:last-child': {
      padding: 0,
    },
  },
})(CardContent)

export const PMainPresenter:React.FC<TUseMainProps> = (props) => {
  const classes = useStyles();

  const displayArticlesScroll = displayArticlesScrollJsx(props, classes, StyledCardContent);

  const displayInstagramMedias = displayInstagramMediasJsx(props, classes, StyledCardContent);
  
  const noArticles = noArticlesJsx(classes, StyledCardContent)

  return (
    <Grid
      id="p_main"
      container
      wrap="nowrap"
      className={classes.root}
      spacing={2}
    >
      {props.isShowInstagram === false
        ? props.articles.length
          ? displayArticlesScroll
          : noArticles
        : props.instagramMedias.data.length
        ? displayInstagramMedias
        : noArticles}
    </Grid>
  );

}

export const PMain = () => {
  const props = usePMainProps()

  return <PMainPresenter {...props} />
}

