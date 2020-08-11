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
import { SelectedTags } from "./SelectedTags";
import { PlayArrowRounded } from "@material-ui/icons";

export const usePMainProps = () => {
  const { appState, dispatchAppState } = React.useContext(
    Store
  );
  const { articles, tags, instagramMedias } = appState;
  const {isShowInstagram, isSetting} = appState;
  const deleteArticle = useDeleteArticle();

  return {
    isSetting,
    articles,
    instagramMedias,
    tags,
    deleteArticle,
    dispatchAppState,
    isShowInstagram,
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
    cardContent: {
      position: "relative",
      padding: 0,
    },
    thumbnailBox: {
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
    editButtonsBox: {
      position: "absolute",
      top: 0,
      right: 0,
      borderRadius: theme.spacing(3),
      backgroundColor: "rgba(255,255,255,0.8)",

      // margin: "0 0 0 auto",
      zIndex: 100,
    },
  });

})

export type TMainClasses = ReturnType<typeof useStyles>;

export const PMainPresenter:React.FC<TUseMainProps> = (props) => {
  const classes = useStyles();

  const StyledCardContent = withStyles({
    root: {
      '&:last-child': {
        padding: 0,
      },
    },
  })(CardContent)


  const displayArticles = props.articles.map((value, key: number) => {
      return (
        <Grid
          item
          key={key}
          // 投稿済みか下書きかで見た目を変える
          className={`${classes.gridItem}
            ${!value.is_published ? classes.itemIsDraft : ""}
          `}
        >
          <CardActionArea
            className={classes.cardActionArea}
            onClick={() =>
              props.dispatchAppState({
                type: "OPEN_ARTICLE_MODAL",
                payload: key,
              })
            }
          >
            <Card className={classes.card}>
              <StyledCardContent className={classes.cardContent}>
                {props.isSetting ? (
                  <EditButtonsBox className={classes.editButtonsBox}>
                    <UpdateButton
                      onClick={() =>
                        props.dispatchAppState({
                          type: "OPEN_ARTICLE_EDITOR_FOR_EDIT",
                          payload: value,
                        })
                      }
                    />
                    <DeleteButton
                      onClick={() => props.deleteArticle(value.article_id)}
                    />
                  </EditButtonsBox>
                ) : null}
                <div className={classes.thumbnailBox}>
                  {value.article_img.length ? (
                    <img
                      className={`p-main-thumbnail ${classes.thumbnail}`}
                      src={value.article_img}
                    />
                  ) : (
                    <div
                      className={`p-main-thumbnail ${classes.thumbnail}`}
                    ></div>
                  )}
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.title}
                  >
                    {value.title}
                  </Typography>
                </div>
                <div className={classes.tagsAndDate}>
                  <SelectedTags
                    className={classes.tags}
                    article={value}
                    tags={props.tags}
                  />
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    align="right"
                    // className={}
                  >
                    {sqlToDate(value.created_at)}
                  </Typography>
                </div>
                <div className={`p-main-article-excerpt ${classes.excerpt}`}>
                  <Typography gutterBottom variant="body1">
                    {value.article_excerpt}
                    {value.article_excerpt.length > 100 ? "..." : ""}
                  </Typography>
                </div>
              </StyledCardContent>
              <Button
                // エラーが出る、表示がバグる原因かもしれないのでcomponent指定してみた。
                component="div"
                variant="contained"
                color="primary"
                size="small"
                className={classes.readMore}
              >
                Read More
              </Button>
            </Card>
          </CardActionArea>
        </Grid>
      );
    });

    // 記事がもしなかった場合の表示
  const noArticles = (
    <Grid item >
      <Card
        className={classes.card}
      >
        投稿がありません
      </Card>
    </Grid>
  );

  const displayInstagramMedias = props.instagramMedias.data.map((value, key) => {
    return (
      <Grid
        item
        key={key}
        // articlesの場合投稿済みか下書きかで見た目を変える
        className={classes.gridItem}
      >
        <CardActionArea
          className={classes.cardActionArea}
          onClick={() =>
            props.dispatchAppState({
              type: "OPEN_INSTAGRAM_MEDIA_MODAL",
              payload: key,
            })
          }
        >
          <Card className={classes.card}>
            <StyledCardContent className={classes.cardContent}>
              <div className={classes.thumbnailBox}>
                <img
                  className={`p-main-thumbnail ${classes.thumbnail}`}
                  src={
                    value.media_type === "VIDEO"
                      ? value.thumbnail_url
                      : value.media_url
                  }
                />
                {value.media_type === "VIDEO" ? (
                  <PlayArrowRounded className={classes.playIcon} />
                ) : null}
              </div>
              {/* <div className={classes.tagsAndDate}> */}
              <Typography
                gutterBottom
                variant="subtitle1"
                align="right"
                className={classes.date}
              >
                {sqlToDate(value.timestamp)}
              </Typography>
              {/* </div> */}
              <div className={`p-main-article-excerpt ${classes.excerpt}`}>
                <Typography gutterBottom variant="body1">
                  {value.caption.slice(0, 100)}
                  {value.caption.length > 100 ? "..." : ""}
                </Typography>
              </div>
            </StyledCardContent>
            <Button
              // エラーが出る、表示がバグる原因かもしれないのでcomponent指定してみた。
              component="div"
              variant="contained"
              color="primary"
              size="small"
              className={classes.readMore}
            >
              Read More
            </Button>
          </Card>
        </CardActionArea>
      </Grid>
    );
  })

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
          ? displayArticles
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

